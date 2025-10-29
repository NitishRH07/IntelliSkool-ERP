import React, { useState, useEffect } from 'react';
import { UserRole } from './types';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';
import ManagementDashboard from './pages/ManagementDashboard';
import LoginScreen from './pages/LoginScreen';
import { isAuthenticated, getCurrentUser, logout } from './services/authService';

const App: React.FC = () => {
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const [loading, setLoading] = useState(true);

    // Check if user is already authenticated on app load
    useEffect(() => {
        const checkAuth = () => {
            if (isAuthenticated()) {
                const user = getCurrentUser();
                if (user) {
                    setUserRole(user.role);
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const handleLogout = () => {
        logout();
        setUserRole(null);
    };

    const handleSelectRole = (role: UserRole) => {
        setUserRole(role);
    };

    // Show loading spinner while checking auth status
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // If user is not authenticated, show login screen
    if (!userRole) {
        return <LoginScreen onSelectRole={handleSelectRole} />;
    }

    // Render appropriate dashboard based on user role
    const renderDashboard = () => {
        switch (userRole) {
            case UserRole.ADMIN:
                return <AdminDashboard setUserRole={handleLogout} />;
            case UserRole.TEACHER:
                return <TeacherDashboard setUserRole={handleLogout} />;
            case UserRole.STUDENT:
                return <StudentDashboard setUserRole={handleLogout} />;
            case UserRole.PARENT:
                return <ParentDashboard setUserRole={handleLogout} />;
            case UserRole.MANAGEMENT:
                return <ManagementDashboard setUserRole={handleLogout} />;
            default:
                return <LoginScreen onSelectRole={handleSelectRole} />;
        }
    };

    return (
        <div className="min-h-screen bg-background text-text-main">
            {renderDashboard()}
        </div>
    );
};

export default App;