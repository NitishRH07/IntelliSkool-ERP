// FIX: Create NotificationPanel component for the dashboard layout.
import React from 'react';

interface NotificationPanelProps {
    isOpen: boolean;
    togglePanel: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, togglePanel }) => {
    const notifications = [
        { id: 1, icon: 'fa-file-invoice', color: 'bg-blue-500', text: 'New invoice generated for fees.' },
        { id: 2, icon: 'fa-calendar-check', color: 'bg-green-500', text: 'Parent-Teacher meeting scheduled.' },
        { id: 3, icon: 'fa-triangle-exclamation', color: 'bg-yellow-500', text: 'Physics assignment deadline tomorrow.' },
    ];

    return (
        <div className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-80`}>
            <div className="flex items-center justify-between p-4 border-b animate-slide-in-right">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <button onClick={togglePanel} className="text-gray-500 hover:text-gray-800 transition-transform duration-200 hover:rotate-90">
                    <i className="fas fa-times"></i>
                </button>
            </div>
            <div className="p-4 space-y-4">
                {notifications.map(notif => (
                    <div key={notif.id} className="flex items-start animate-fade-in" style={{ animationDelay: `${notif.id * 0.1}s` }}>
                        <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white ${notif.color} transition-transform duration-300 hover:scale-110`}>
                            <i className={`fas ${notif.icon}`}></i>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-gray-700">{notif.text}</p>
                            <span className="text-xs text-gray-400">5 minutes ago</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationPanel;
