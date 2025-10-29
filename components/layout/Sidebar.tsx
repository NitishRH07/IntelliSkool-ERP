import React, { useState } from 'react';
import { UserRole } from '../../types';
import type { MenuItem } from '../../types';

interface SidebarProps {
    userRole: UserRole;
    menuItems: MenuItem[];
    activeView: string;
    setActiveView: (view: string) => void;
    isSidebarOpen: boolean;
    isSidebarCollapsed: boolean;
    toggleSidebar: () => void;
    toggleSidebarCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, menuItems, activeView, setActiveView, isSidebarOpen, isSidebarCollapsed, toggleSidebar, toggleSidebarCollapse }) => {
    const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

    const toggleSubmenu = (label: string) => {
        setOpenSubmenus(prev => 
            prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
        );
    };
    
    // Add animation class to submenu items
    const submenuAnimationClass = "transition-all duration-300 ease-in-out overflow-hidden";
    
    const handleItemClick = (view?: string) => {
        if (view) {
            setActiveView(view);
        }
    };
    
    // Function to get welcome message based on user role
    const getWelcomeMessage = () => {
        switch (userRole) {
            case UserRole.STUDENT:
                return "Welcome, Student";
            case UserRole.TEACHER:
                return "Welcome, Teacher";
            case UserRole.ADMIN:
                return "Welcome, Admin";
            case UserRole.MANAGEMENT:
                return "Welcome, Management";
            case UserRole.PARENT:
                return "Welcome, Parent";
            default:
                return "Welcome";
        }
    };
    
    // Function to get initials for collapsed view
    const getUserInitials = () => {
        switch (userRole) {
            case UserRole.STUDENT:
                return "S";
            case UserRole.TEACHER:
                return "T";
            case UserRole.ADMIN:
                return "A";
            case UserRole.MANAGEMENT:
                return "M";
            case UserRole.PARENT:
                return "P";
            default:
                return "U";
        }
    };
    
    return (
        <div className={`fixed top-0 left-0 h-full bg-sidebar text-text-light flex flex-col z-50 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-accent">
                {isSidebarCollapsed ? (
                    <div className="flex items-center justify-center w-full">
                        <h1 className="text-xl font-bold">I</h1>
                    </div>
                ) : (
                    <h1 className="text-xl font-bold">IntelliSkool</h1>
                )}
                <div className="flex space-x-2">
                    <button 
                        onClick={toggleSidebarCollapse}
                        className="text-text-light focus:outline-none hover:bg-sidebar-accent p-1 rounded"
                    >
                        <i className={`fas ${isSidebarCollapsed ? 'fa-expand' : 'fa-times'}`}></i>
                    </button>
                    <button 
                        onClick={toggleSidebar}
                        className="md:hidden text-text-light focus:outline-none"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div className={`flex items-center justify-center py-4 border-b border-sidebar-accent ${isSidebarCollapsed ? 'px-2' : 'px-4'}`}>
                {isSidebarCollapsed ? (
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        {getUserInitials()}
                    </div>
                ) : (
                    <h2 className="text-lg font-semibold text-center">{getWelcomeMessage()}</h2>
                )}
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                {menuItems.map(item => (
                    <div key={item.label}>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (item.submenu) {
                                    toggleSubmenu(item.label);
                                } else {
                                    handleItemClick(item.view);
                                }
                            }}
                            className={`flex items-center p-2 rounded-md transition-colors ${
                                activeView === item.view ? 'bg-primary text-white' : 'hover:bg-sidebar-accent'
                            } justify-start`}
                        >
                            <i className={`${item.icon} ${isSidebarCollapsed ? 'mx-auto text-center' : 'mr-3 w-6 text-center'}`}></i>
                            {!isSidebarCollapsed && (
                                <span className="flex-1">{item.label}</span>
                            )}
                            {!isSidebarCollapsed && item.submenu && (
                                <i className={`fas fa-chevron-down transition-transform ${openSubmenus.includes(item.label) ? 'rotate-180' : ''}`}></i>
                            )}
                        </a>
                        {!isSidebarCollapsed && item.submenu && (
                            <div className={`mt-2 ml-7 space-y-2 ${submenuAnimationClass}`} style={{ maxHeight: openSubmenus.includes(item.label) ? '500px' : '0px' }}>
                                {item.submenu.map(subItem => (
                                    <a
                                        key={subItem.label}
                                        href="#"
                                        onClick={(e) => {e.preventDefault(); handleItemClick(subItem.view);}}
                                        className={`flex items-center p-2 rounded-md text-sm transition-all duration-200 ${
                                            activeView === subItem.view ? 'bg-primary-dark text-white scale-105' : 'hover:bg-sidebar-accent'
                                        }`}
                                    >
                                        <i className={`${subItem.icon} mr-3 w-5 text-center transition-transform duration-200 ${activeView === subItem.view ? 'scale-125' : ''}`}></i>
                                        <span className={`${activeView === subItem.view ? 'font-bold' : ''}`}>{subItem.label}</span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;