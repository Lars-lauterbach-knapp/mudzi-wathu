import React, { useState, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch("http://localhost:8081/auth/user", {
                method: "GET",
                credentials: "include", // Include cookies for session
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData); // Store user details (id, email, username, authProvider, hasProfile)
            } else {
                setUser(null); // Clear user if not authenticated
            }
        } catch (error) {
            console.error("Error checking auth status:", error);
            setUser(null);
        } finally {
            setLoading(false); // Always stop loading
        }
    };

    const logout = async () => {
        try {
            await fetch("http://localhost:8081/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            setUser(null);
            window.location.href = "http://localhost:3000";
        } catch (error) {
            console.error("Logout error:", error);
            setUser(null);
            window.location.href = "http://localhost:3000";
        }
    };

    // Check auth status on mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const value = {
        user,
        logout,
        loading,
        checkAuthStatus,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;