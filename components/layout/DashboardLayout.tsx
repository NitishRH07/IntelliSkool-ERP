// FIX: Create DashboardLayout component to structure all dashboard views.
import React, { useState, ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import NotificationPanel from './NotificationPanel';
import { UserRole, MenuItem } from '../../types';

interface DashboardLayoutProps {
    userRole: UserRole;
    menuItems: MenuItem[];
    activeView: string;
    setActiveView: (view: string) => void;
    onLogout: () => void;
    children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    userRole,
    menuItems,
    activeView,
    setActiveView,
    onLogout,
    children
}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleSidebarCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);
    const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen);

    return (
        <div className="relative min-h-screen">
            <Sidebar
                userRole={userRole}
                menuItems={menuItems}
                activeView={activeView}
                setActiveView={setActiveView}
                isSidebarOpen={isSidebarOpen}
                isSidebarCollapsed={isSidebarCollapsed}
                toggleSidebar={toggleSidebar}
                toggleSidebarCollapse={toggleSidebarCollapse}
            />
            <div className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarOpen ? (isSidebarCollapsed ? 'ml-20' : 'ml-64') : 'ml-0'}`}>
                <Header
                    userRole={userRole}
                    onLogout={onLogout}
                    toggleSidebar={toggleSidebar}
                    isSidebarOpen={isSidebarOpen}
                    toggleNotifications={toggleNotifications}
                    isSidebarCollapsed={isSidebarCollapsed}
                    toggleSidebarCollapse={toggleSidebarCollapse}
                />
                <main className="flex-1 p-6 mt-16 bg-background">
                    {children}
                </main>
            </div>
            <NotificationPanel isOpen={isNotificationsOpen} togglePanel={toggleNotifications} />
        </div>
    );
};

export default DashboardLayout;