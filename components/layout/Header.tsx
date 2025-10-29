import React from 'react';
import { UserRole } from '../../types';
import LogoutButton from '../../components/auth/LogoutButton';

interface HeaderProps {
    userRole: UserRole;
    onLogout: () => void;
    toggleSidebar?: () => void;
    isSidebarOpen?: boolean;
    toggleNotifications?: () => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, onLogout, toggleSidebar, isSidebarOpen, toggleNotifications }) => {
    return (
        <header className="fixed top-0 right-0 h-16 bg-white shadow-md flex items-center justify-between px-6 z-40 animate-fade-in">
            <div className="flex items-center">
                <button 
                    onClick={toggleSidebar}
                    className="md:hidden mr-4 text-gray-600 hover:text-primary focus:outline-none"
                >
                    <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>
            <div className="flex items-center space-x-4">
                <button 
                    onClick={toggleNotifications}
                    className="text-gray-600 hover:text-primary relative transition-transform duration-200 hover:scale-110"
                >
                    <i className="fas fa-bell"></i>
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center animate-pulse-primary">3</span>
                </button>
                <LogoutButton 
                    variant="secondary"
                    className="flex items-center text-gray-600 hover:text-primary transition-all duration-200 hover:scale-105"
                    onLogout={onLogout}
                />
            </div>
        </header>
    );
};

export default Header;