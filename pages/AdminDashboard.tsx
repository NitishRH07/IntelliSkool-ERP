import React, { useState } from 'react';
import { UserRole } from '../types';
import DashboardLayout from '../components/layout/DashboardLayout';
import { ADMIN_MENU } from '../constants';
import UserManagement from '../components/admin/UserManagement';
import AddStudent from '../components/admin/AddStudent';
import AddTeacher from '../components/admin/AddTeacher';
import PlaceholderContent from '../components/ui/PlaceholderContent';
import AITestComponent from '../components/ai/AITestComponent';

interface AdminDashboardProps {
    setUserRole: (role: UserRole | null) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setUserRole }) => {
    const [activeView, setActiveView] = useState('dashboard');

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard':
                return (
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Students</h2>
                                <p className="text-3xl font-bold text-primary">1,248</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Teachers</h2>
                                <p className="text-3xl font-bold text-primary">86</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">Attendance Rate</h2>
                                <p className="text-3xl font-bold text-primary">94.2%</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
                            <ul className="space-y-3">
                                <li className="flex items-center">
                                    <div className="bg-green-100 p-2 rounded-full mr-3">
                                        <i className="fas fa-user-plus text-green-600"></i>
                                    </div>
                                    <div>
                                        <p className="font-medium">New student registered</p>
                                        <p className="text-sm text-gray-500">2 minutes ago</p>
                                    </div>
                                </li>
                                <li className="flex items-center">
                                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                                        <i className="fas fa-book text-blue-600"></i>
                                    </div>
                                    <div>
                                        <p className="font-medium">New course added</p>
                                        <p className="text-sm text-gray-500">1 hour ago</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            case 'userManagement':
                return <UserManagement />;
            case 'addStudent':
                return <AddStudent />;
            case 'addTeacher':
                return <AddTeacher />;
            case 'aiTest':
                return <AITestComponent />;
            default:
                return <PlaceholderContent />;
        }
    };

    const handleLogout = () => {
        setUserRole(null);
    };

    return (
        <DashboardLayout 
            userRole={UserRole.ADMIN}
            menuItems={ADMIN_MENU}
            activeView={activeView}
            setActiveView={setActiveView}
            onLogout={handleLogout}
        >
            {renderContent()}
        </DashboardLayout>
    );
};

export default AdminDashboard;