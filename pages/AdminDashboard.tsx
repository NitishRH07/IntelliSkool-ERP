// FIX: Create AdminDashboard component.
import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { UserRole } from '../types';
import { ADMIN_MENU } from '../constants';
import StatCard from '../components/ui/StatCard';
import PlaceholderContent from '../components/ui/PlaceholderContent';
import AITimetableGenerator from '../components/ai/AITimetableGenerator';
import AIDropoutPredictor from '../components/analytics/AIDropoutPredictor';
import AISmartReportGenerator from '../components/ai/AISmartReportGenerator';
import UserManagement from '../components/admin/UserManagement';
import AIAdmissionPredictor from '../components/admin/AIAdmissionPredictor';
import CoursesManagement from '../components/admin/CoursesManagement';
import CommunicationManagement from '../components/admin/CommunicationManagement';
import SettingsManagement from '../components/admin/SettingsManagement';
import AIPerformanceInsights from '../components/admin/AIPerformanceInsights';
import AIFeeDefaulterPredictor from '../components/admin/AIFeeDefaulterPredictor';
import AICommunicationBot from '../components/admin/AICommunicationBot';
import AIStaffLoadBalancer from '../components/admin/AIStaffLoadBalancer';
import AIResultAnalyzer from '../components/admin/AIResultAnalyzer';
import AIInstitutionHealthIndex from '../components/admin/AIInstitutionHealthIndex';
import AIAuditReportGenerator from '../components/admin/AIAuditReportGenerator';
import AddStudent from '../components/admin/AddStudent';
import AddTeacher from '../components/admin/AddTeacher';

const AdminDashboard: React.FC<{ setUserRole: (role: UserRole | null) => void }> = ({ setUserRole }) => {
    const [activeView, setActiveView] = useState('dashboard');

    const handleLogout = () => {
        setUserRole(null);
    };

    const renderContent = () => {
        switch (activeView) {
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
            case 'userManagement':
                return <UserManagement />;
            case 'addStudent':
                return <AddStudent />;
            case 'addTeacher':
                return <AddTeacher />;
            case 'courses':
                return <CoursesManagement />;
            case 'communication':
                return <CommunicationManagement />;
            case 'settings':
                return <SettingsManagement />;
            // Handle missing components with placeholders
            case 'aiPrediction':
            default:
                // Check if it's a known missing component
                if (activeView !== 'dashboard') {
                    return <PlaceholderContent title={activeView.replace(/([A-Z])/g, ' $1').trim()} message="This feature is under development." />;
                }
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard title="Total Students" value="1,250" icon="fa-solid fa-users" color="bg-blue-500" />
                            <StatCard title="Total Teachers" value="85" icon="fa-solid fa-chalkboard-user" color="bg-green-500" />
                            <StatCard title="New Admissions" value="52" icon="fa-solid fa-user-plus" color="bg-indigo-500" />
                            <StatCard title="Pending Tasks" value="8" icon="fa-solid fa-list-check" color="bg-orange-500" />
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold mb-4">User Management</h3>
                                <div className="space-y-3">
                                    <button 
                                        onClick={() => setActiveView('addStudent')}
                                        className="w-full flex items-center justify-between p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                    >
                                        <span>Add New Student</span>
                                        <i className="fa-solid fa-chevron-right"></i>
                                    </button>
                                    <button 
                                        onClick={() => setActiveView('addTeacher')}
                                        className="w-full flex items-center justify-between p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                                    >
                                        <span>Add New Teacher</span>
                                        <i className="fa-solid fa-chevron-right"></i>
                                    </button>
                                    <button 
                                        onClick={() => setActiveView('userManagement')}
                                        className="w-full flex items-center justify-between p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                                    >
                                        <span>Manage Users</span>
                                        <i className="fa-solid fa-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold mb-4">System Status</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Server Status</span>
                                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Online</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Database</span>
                                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Connected</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Last Backup</span>
                                        <span className="text-gray-600 text-sm">2 hours ago</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                                            <i className="fa-solid fa-user-plus text-blue-600"></i>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">New student registered</p>
                                            <p className="text-xs text-gray-500">2 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-green-100 p-2 rounded-full mr-3">
                                            <i className="fa-solid fa-chalkboard-user text-green-600"></i>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Teacher profile updated</p>
                                            <p className="text-xs text-gray-500">5 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-purple-100 p-2 rounded-full mr-3">
                                            <i className="fa-solid fa-file-invoice text-purple-600"></i>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Report generated</p>
                                            <p className="text-xs text-gray-500">1 day ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
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