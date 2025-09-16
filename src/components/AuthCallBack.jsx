// pages/AuthCallback.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function AuthCallback() {
    const { checkAuthStatus } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthCallback = async () => {
            await checkAuthStatus();
            navigate('/dashboard');
        };

        handleAuthCallback();
    }, [checkAuthStatus, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Completing authentication...</h2>
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            </div>
        </div>
    );
}

export default AuthCallback;