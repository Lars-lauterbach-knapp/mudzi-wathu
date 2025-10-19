// src/providers/AuthProvider.jsx
import React, { useState, useEffect, createContext, useContext } from "react";

// Create Auth Context
const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

const decodeJWT = (token) => {
    try {
        // JWT token has 3 parts: header.payload.signature
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
};



const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Base URL for your NestJS backend
    const API_BASE_URL = 'http://localhost:3000';

    // Check if user is authenticated
    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            // Decode token to get user info
            const decodedToken = decodeJWT(token);
            if (decodedToken) {
                setUser({
                    token,
                    username: decodedToken.username,
                    email: decodedToken.email,
                    id: decodedToken.sub,
                    role: decodedToken.role
                });
            } else {
                setUser({ token });
            }
        } catch (error) {
            console.error("Error checking auth status:", error);
            setUser(null);
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setLoading(true);

            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (result.success) {
                const { access_token, user } = result.data;
                console.log('User role from backend:', user.role);

                // Store token in localStorage
                localStorage.setItem('token', access_token);
                setToken(access_token);

                // Decode token to get username and other info
                const decodedToken = decodeJWT(access_token);
                const userWithToken = {
                    ...user,
                    token: access_token,
                    username: decodedToken?.username || user.username
                };

                setUser({ userWithToken });

                // Redirect based on role after login
                if (userWithToken.role === 'Admin') {
                    window.location.href = '/admindashboard';
                } else {
                    window.location.href = '/dashboard';
                }

                return { success: true, message: result.message, user: userWithToken };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: 'Login error: ' + error};
        } finally {
            setLoading(false);
        }
    };

    // Register function
    const register = async (userData) => {
        try {
            setLoading(true);

            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (result.success) {
                return { success: true, message: result.message };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error("Registration error:", error);
            return { success: false, message: 'Network error. Please try again.' };
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        window.location.href = "/";
    };


    // Check auth status on mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        checkAuthStatus,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'Admin' || user?.role === 'admin', // Handle both cases
        isUser: user?.role === 'User' || user?.role === 'user' || user?.role === 'admin',
        userRole: user?.role
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;