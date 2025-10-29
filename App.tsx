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
    const [error, setError] = useState<string | null>(null);

    // Check if user is already authenticated on app load
    useEffect(() => {
        try {
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
        } catch (err) {
            console.error("Error during authentication check:", err);
            setError("Failed to initialize application. Please check the console for details.");
            setLoading(false);
        }
    }, []);

    const handleLogout = () => {
        try {
            logout();
            setUserRole(null);
        } catch (err) {
            console.error("Error during logout:", err);
            setError("Failed to logout. Please try again.");
        }
    };

    const handleSelectRole = (role: UserRole) => {
        try {
            setUserRole(role);
        } catch (err) {
            console.error("Error selecting role:", err);
            setError("Failed to select role. Please try again.");
        }
    };

    // Show loading spinner while checking auth status
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Show error message if there's an error
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Application Error</h2>
                    <p className="text-gray-700 mb-4">{error}</p>
                    <p className="text-gray-500 text-sm">Please check the browser console for more details.</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
                    >
                        Reload Application
                    </button>
                </div>
            </div>
        );
    }

    // If user is not authenticated, show login screen
    if (!userRole) {
        return <LoginScreen onSelectRole={handleSelectRole} />;
    }

    // Render appropriate dashboard based on user role
    const renderDashboard = () => {
        try {
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
        } catch (err) {
            console.error("Error rendering dashboard:", err);
            setError("Failed to load dashboard. Please try again.");
            return null;
        }
    };

    return (
        <div className="min-h-screen bg-background text-text-main">
            {renderDashboard()}
        </div>
    );
};

export default App;