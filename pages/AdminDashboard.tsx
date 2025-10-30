import React, { useState } from 'react';
import { UserRole } from '../types';
import DashboardLayout from '../components/layout/DashboardLayout';
import { ADMIN_MENU } from '../constants';
import UserManagement from '../components/admin/UserManagement';
import AddStudent from '../components/admin/AddStudent';
import AddTeacher from '../components/admin/AddTeacher';
import CoursesManagement from '../components/admin/CoursesManagement';
import CommunicationManagement from '../components/admin/CommunicationManagement';
import SettingsManagement from '../components/admin/SettingsManagement';
import AITestComponent from '../components/ai/AITestComponent';
// AI Tools
import AITimetableGenerator from '../components/ai/AITimetableGenerator';
import AIDropoutPredictor from '../components/analytics/AIDropoutPredictor';
import AISmartReportGenerator from '../components/ai/AISmartReportGenerator';
import AIAdmissionPredictor from '../components/admin/AIAdmissionPredictor';
import AIPerformanceInsights from '../components/admin/AIPerformanceInsights';
import AIFeeDefaulterPredictor from '../components/admin/AIFeeDefaulterPredictor';
import AICommunicationBot from '../components/admin/AICommunicationBot';
import AIStaffLoadBalancer from '../components/admin/AIStaffLoadBalancer';
import AIResultAnalyzer from '../components/admin/AIResultAnalyzer';
import AIInstitutionHealthIndex from '../components/admin/AIInstitutionHealthIndex';
import AIAuditReportGenerator from '../components/admin/AIAuditReportGenerator';

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
            // User Management
            case 'userManagement':
                return <UserManagement />;
            case 'addStudent':
                return <AddStudent />;
            case 'addTeacher':
                return <AddTeacher />;
            
            // Courses
            case 'courses':
                return <CoursesManagement />;
            
            // Communication
            case 'communication':
                return <CommunicationManagement />;
            
            // Settings
            case 'settings':
                return <SettingsManagement />;
            
            // AI Tools
            case 'aiTimetable':
                return <AITimetableGenerator />;
            case 'aiDropout':
                return <AIDropoutPredictor />;
            case 'aiSmartReport':
                return <AISmartReportGenerator />;
            case 'aiAdmissionPredictor':
                return <AIAdmissionPredictor />;
            case 'aiPerformanceInsights':
                return <AIPerformanceInsights />;
            case 'aiFeeDefaulter':
                return <AIFeeDefaulterPredictor />;
            case 'aiCommunicationBot':
                return <AICommunicationBot />;
            case 'aiStaffLoadBalancer':
                return <AIStaffLoadBalancer />;
            case 'aiResultAnalyzer':
                return <AIResultAnalyzer />;
            case 'aiInstitutionHealth':
                return <AIInstitutionHealthIndex />;
            case 'aiAuditReport':
                return <AIAuditReportGenerator />;
            
            // AI Test
            case 'aiTest':
                return <AITestComponent />;
            
            default:
                return (
                    <div className="p-6">
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <i className="fas fa-exclamation-circle text-4xl text-yellow-500 mb-4"></i>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Feature Not Implemented</h2>
                            <p className="text-gray-600 mb-4">
                                The feature "{activeView}" is not yet implemented or available.
                            </p>
                            <button 
                                onClick={() => setActiveView('dashboard')}
                                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    </div>
                );
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