import React, { useState } from 'react';
import Button from '../ui/Button';

const SettingsManagement: React.FC = () => {
    const [settings, setSettings] = useState({
        schoolName: 'IntelliSkool International',
        schoolAddress: '123 Education Street, Bangalore, Karnataka',
        academicYear: '2023-2024',
        timezone: 'Asia/Kolkata',
        language: 'English',
        theme: 'light',
        notifications: true,
        emailNotifications: true,
        smsNotifications: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSaveSettings = () => {
        // In a real app, you would save settings to the database
        alert('Settings saved successfully!');
    };

    const handleResetSettings = () => {
        if (confirm('Are you sure you want to reset all settings to default values?')) {
            setSettings({
                schoolName: 'IntelliSkool International',
                schoolAddress: '123 Education Street, Bangalore, Karnataka',
                academicYear: '2023-2024',
                timezone: 'Asia/Kolkata',
                language: 'English',
                theme: 'light',
                notifications: true,
                emailNotifications: true,
                smsNotifications: false,
            });
            alert('Settings reset to default values!');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">System Settings</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">General Settings</h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    School Name
                                </label>
                                <input
                                    type="text"
                                    name="schoolName"
                                    value={settings.schoolName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    School Address
                                </label>
                                <textarea
                                    name="schoolAddress"
                                    value={settings.schoolAddress}
                                    onChange={handleInputChange as any}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Academic Year
                                    </label>
                                    <input
                                        type="text"
                                        name="academicYear"
                                        value={settings.academicYear}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Timezone
                                    </label>
                                    <select
                                        name="timezone"
                                        value={settings.timezone}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                    >
                                        <option value="Asia/Kolkata">Asia/Kolkata (India)</option>
                                        <option value="America/New_York">America/New_York (EST)</option>
                                        <option value="Europe/London">Europe/London (GMT)</option>
                                        <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">Preferences</h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Language
                                    </label>
                                    <select
                                        name="language"
                                        value={settings.language}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                    >
                                        <option value="English">English</option>
                                        <option value="Hindi">Hindi</option>
                                        <option value="Tamil">Tamil</option>
                                        <option value="Telugu">Telugu</option>
                                        <option value="Kannada">Kannada</option>
                                        <option value="Malayalam">Malayalam</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Theme
                                    </label>
                                    <select
                                        name="theme"
                                        value={settings.theme}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                    >
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center">
                                <input
                                    id="notifications"
                                    name="notifications"
                                    type="checkbox"
                                    checked={settings.notifications}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                />
                                <label htmlFor="notifications" className="ml-3 block text-sm text-gray-700">
                                    Enable system notifications
                                </label>
                            </div>
                            
                            <div className="flex items-center">
                                <input
                                    id="emailNotifications"
                                    name="emailNotifications"
                                    type="checkbox"
                                    checked={settings.emailNotifications}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                />
                                <label htmlFor="emailNotifications" className="ml-3 block text-sm text-gray-700">
                                    Enable email notifications
                                </label>
                            </div>
                            
                            <div className="flex items-center">
                                <input
                                    id="smsNotifications"
                                    name="smsNotifications"
                                    type="checkbox"
                                    checked={settings.smsNotifications}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                />
                                <label htmlFor="smsNotifications" className="ml-3 block text-sm text-gray-700">
                                    Enable SMS notifications
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">Actions</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <Button onClick={handleSaveSettings} className="w-full">
                                Save Settings
                            </Button>
                            
                            <Button variant="secondary" onClick={handleResetSettings} className="w-full">
                                Reset to Defaults
                            </Button>
                            
                            <div className="pt-4 border-t border-gray-200">
                                <h3 className="text-sm font-medium text-gray-900 mb-2">System Information</h3>
                                <div className="text-sm text-gray-500 space-y-1">
                                    <p>Version: 1.0.0</p>
                                    <p>Last Updated: 2023-06-15</p>
                                    <p>Status: <span className="text-green-600">Operational</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">Backup & Security</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <Button variant="secondary" className="w-full">
                                <i className="fa-solid fa-download mr-2"></i>
                                Backup Data
                            </Button>
                            
                            <Button variant="secondary" className="w-full">
                                <i className="fa-solid fa-shield-alt mr-2"></i>
                                Security Settings
                            </Button>
                            
                            <Button variant="danger" className="w-full">
                                <i className="fa-solid fa-sync mr-2"></i>
                                System Reset
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsManagement;