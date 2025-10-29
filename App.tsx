import React, { useState, useEffect } from 'react';
import { UserRole } from './types';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';
import ManagementDashboard from './pages/ManagementDashboard';
import LoginScreen from './pages/LoginScreen';
import { isAuthenticated, getCurrentUser, logout } from './services/authService';

console.log("App.tsx: Module loaded");

const App: React.FC = () => {
    console.log("App.tsx: Component initializing");
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Check if user is already authenticated on app load
    useEffect(() => {
        console.log("App.tsx: useEffect running - checking authentication");
        try {
            const checkAuth = () => {
                console.log("App.tsx: Checking if user is authenticated");
                if (isAuthenticated()) {
                    console.log("App.tsx: User is authenticated, getting current user");
                    const user = getCurrentUser();
                    if (user) {
                        console.log("App.tsx: Setting user role", user.role);
                        setUserRole(user.role);
                    } else {
                        console.log("App.tsx: No current user found");
                    }
                } else {
                    console.log("App.tsx: User is not authenticated");
                }
                console.log("App.tsx: Finished authentication check");
                setLoading(false);
            };

            checkAuth();
        } catch (err) {
            console.error("App.tsx: Error during authentication check:", err);
            setError("Failed to initialize application. Please check the console for details.");
            setLoading(false);
        }
    }, []);

    const handleLogout = () => {
        console.log("App.tsx: Handling logout");
        try {
            logout();
            setUserRole(null);
        } catch (err) {
            console.error("App.tsx: Error during logout:", err);
            setError("Failed to logout. Please try again.");
        }
    };

    const handleSelectRole = (role: UserRole) => {
        console.log("App.tsx: Handling role selection", role);
        try {
            setUserRole(role);
        } catch (err) {
            console.error("App.tsx: Error selecting role:", err);
            setError("Failed to select role. Please try again.");
        }
    };

    // Show loading spinner while checking auth status
    if (loading) {
        console.log("App.tsx: Rendering loading state");
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Show error message if there's an error
    if (error) {
        console.log("App.tsx: Rendering error state", error);
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
        console.log("App.tsx: Rendering login screen");
        return <LoginScreen onSelectRole={handleSelectRole} />;
    }

    // Render appropriate dashboard based on user role
    const renderDashboard = () => {
        console.log("App.tsx: Rendering dashboard for role", userRole);
        try {
            switch (userRole) {
                case UserRole.ADMIN:
                    console.log("App.tsx: Rendering AdminDashboard");
                    return <AdminDashboard setUserRole={handleLogout} />;
                case UserRole.TEACHER:
                    console.log("App.tsx: Rendering TeacherDashboard");
                    return <TeacherDashboard setUserRole={handleLogout} />;
                case UserRole.STUDENT:
                    console.log("App.tsx: Rendering StudentDashboard");
                    return <StudentDashboard setUserRole={handleLogout} />;
                case UserRole.PARENT:
                    console.log("App.tsx: Rendering ParentDashboard");
                    return <ParentDashboard setUserRole={handleLogout} />;
                case UserRole.MANAGEMENT:
                    console.log("App.tsx: Rendering ManagementDashboard");
                    return <ManagementDashboard setUserRole={handleLogout} />;
                default:
                    console.log("App.tsx: Rendering default LoginScreen");
                    return <LoginScreen onSelectRole={handleSelectRole} />;
            }
        } catch (err) {
            console.error("App.tsx: Error rendering dashboard:", err);
            setError("Failed to load dashboard. Please try again.");
            return null;
        }
    };

    console.log("App.tsx: Rendering main app content");
    return (
        <div className="min-h-screen bg-background text-text-main">
            {renderDashboard()}
        </div>
    );
};

console.log("App.tsx: Component definition completed");
export default App;