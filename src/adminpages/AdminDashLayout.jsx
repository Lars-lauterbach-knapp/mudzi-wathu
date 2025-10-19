// DashboardLayout.jsx
import React, {useState} from 'react';
import {Outlet} from "react-router";
import AdminSidebar from "./AdminSidebar.jsx";

function AdminDashLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
            {/* Mobile sidebar toggle button */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - positioned below navbar */}
                <div className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}>
                    <AdminSidebar toggleSidebar={toggleSidebar} />
                </div>

                {/* Mobile overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 z-30 bg-black bg-opacity-50 sm:hidden"
                        onClick={toggleSidebar}
                    ></div>
                )}

                {/* Main content area */}
                <div className="flex-1 overflow-y-auto sm:ml-64 h-screen">
                    <div className="mt-16"> {/* mt-16 to account for navbar height */}
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashLayout;