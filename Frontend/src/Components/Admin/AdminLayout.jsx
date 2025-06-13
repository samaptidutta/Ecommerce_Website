import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
        {/* Mobile Header */}
        <div className="flex items-center justify-between md:hidden p-4 bg-gray-800 text-white">
            <button onClick={toggleSidebar}>
            <FaBars size={24} />
            </button>
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </div>

        {/* Sidebar */}
        <aside
            className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 fixed md:sticky top-0 left-0 w-64 h-screen  bg-gray-800 text-white p-4 transform transition-transform duration-300 md:block z-40`}
        >
            <AdminSidebar/>
        </aside>

        {/* Overlay for Mobile */}
        {isSidebarOpen && (
            <div
            className="fixed inset-0 bg-black opacity-40 md:hidden z-30"
            onClick={toggleSidebar}
            />
        )}
    {/* main content */}
        <div className='flex-grow p-6 overflow-auto'>
            <Outlet/>
        </div>        
        </div>
    );
};

export default AdminLayout;
