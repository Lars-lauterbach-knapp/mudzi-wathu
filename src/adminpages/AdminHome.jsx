import React from 'react';
import {useAuth} from "../providers/AuthProvider.jsx";

function AdminHome() {
    const { user } = useAuth();
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Loading user data...</h2>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="h-full pt-1 pl-4 pr-4">
                <div className="bg-white shadow-2xl rounded-lg p-6 w-full">

                    {/* Heading sits above the grid */}
                    <h2 className="text-2xl font-semibold text-black mb-6">
                        Welcome { user.username }
                    </h2>
                </div>
            </div>
        </>
    );
}

export default AdminHome;