import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const SettingsManagement: React.FC = () => {
  const [settings, setSettings] = useState({
    institutionName: 'IntelliSkool Academy',
    institutionAddress: '123 Education Street, Knowledge City',
    contactEmail: 'info@intelliskool.edu',
    contactPhone: '+1 (555) 123-4567',
    academicYear: '2023-2024',
    semester: 'Spring 2024',
    timezone: 'UTC-5',
    language: 'English',
    theme: 'light',
    aiApiKey: 'AIzaSyBBA4UHSzi8mNmnUImokkB7i7CkkP4p6yE',
    logo: '',
    enableNotifications: true,
    enableEmailNotifications: true,
    enableSmsNotifications: true,
    maxStudentsPerClass: 35,
    workingHoursStart: '08:00',
    workingHoursEnd: '16:00'
  });

  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    // In a real app, this would save to an API
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values?')) {
      // Reset to default values
      alert('Settings reset to default values');
    }
  };

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'ai', label: 'AI Settings' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'academic', label: 'Academic' }
  ];

  return (
    <div className="space-y-6">
      <Card title="System Settings" icon="fa-solid fa-cogs">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium">Configure System Settings</h3>
              <p className="text-gray-600 text-sm">Manage institution-wide configuration and preferences</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="secondary" onClick={handleReset}>
                <i className="fa-solid fa-rotate-left mr-2"></i> Reset Defaults
              </Button>
              <Button onClick={handleSave}>
                <i className="fa-solid fa-save mr-2"></i> Save Settings
              </Button>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'general' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
                <input
                  type="text"
                  value={settings.institutionName}
                  onChange={(e) => setSettings({...settings, institutionName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution Address</label>
                <input
                  type="text"
                  value={settings.institutionAddress}
                  onChange={(e) => setSettings({...settings, institutionAddress: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                <input
                  type="tel"
                  value={settings.contactPhone}
                  onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="UTC-12">(UTC-12:00) International Date Line West</option>
                  <option value="UTC-11">(UTC-11:00) Midway Island, Samoa</option>
                  <option value="UTC-10">(UTC-10:00) Hawaii</option>
                  <option value="UTC-9">(UTC-09:00) Alaska</option>
                  <option value="UTC-8">(UTC-08:00) Pacific Time (US & Canada)</option>
                  <option value="UTC-7">(UTC-07:00) Mountain Time (US & Canada)</option>
                  <option value="UTC-6">(UTC-06:00) Central Time (US & Canada)</option>
                  <option value="UTC-5">(UTC-05:00) Eastern Time (US & Canada)</option>
                  <option value="UTC-4">(UTC-04:00) Atlantic Time (Canada)</option>
                  <option value="UTC-3">(UTC-03:00) Brasilia</option>
                  <option value="UTC-2">(UTC-02:00) Mid-Atlantic</option>
                  <option value="UTC-1">(UTC-01:00) Cape Verde Is.</option>
                  <option value="UTC0">(UTC+00:00) London, Dublin, Lisbon</option>
                  <option value="UTC+1">(UTC+01:00) Paris, Berlin, Rome</option>
                  <option value="UTC+2">(UTC+02:00) Cairo, Helsinki, Istanbul</option>
                  <option value="UTC+3">(UTC+03:00) Moscow, Nairobi</option>
                  <option value="UTC+4">(UTC+04:00) Abu Dhabi, Muscat</option>
                  <option value="UTC+5">(UTC+05:00) Islamabad, Karachi</option>
                  <option value="UTC+6">(UTC+06:00) Dhaka, Novosibirsk</option>
                  <option value="UTC+7">(UTC+07:00) Bangkok, Jakarta, Hanoi</option>
                  <option value="UTC+8">(UTC+08:00) Beijing, Singapore, Perth</option>
                  <option value="UTC+9">(UTC+09:00) Tokyo, Seoul, Osaka</option>
                  <option value="UTC+10">(UTC+10:00) Sydney, Melbourne, Guam</option>
                  <option value="UTC+11">(UTC+11:00) Magadan, Solomon Is.</option>
                  <option value="UTC+12">(UTC+12:00) Auckland, Wellington, Fiji</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({...settings, language: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Chinese</option>
                  <option>Japanese</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">AI API Key</label>
                <div className="flex">
                  <input
                    type="password"
                    value={settings.aiApiKey}
                    onChange={(e) => setSettings({...settings, aiApiKey: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                  <button className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-gray-700 hover:bg-gray-200">
                    <i className="fa-solid fa-eye"></i>
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">API key for accessing AI services like Gemini</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                  <select
                    value={settings.theme}
                    onChange={(e) => setSettings({...settings, theme: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mr-3">
                      {settings.logo ? (
                        <img src={settings.logo} alt="Logo" className="w-12 h-12 object-contain" />
                      ) : (
                        <i className="fa-solid fa-image text-gray-400"></i>
                      )}
                    </div>
                    <button className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200">
                      Upload Logo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Enable System Notifications</h4>
                  <p className="text-sm text-gray-500">Receive alerts for important system events</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableNotifications}
                    onChange={(e) => setSettings({...settings, enableNotifications: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Enable Email Notifications</h4>
                  <p className="text-sm text-gray-500">Send notifications via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableEmailNotifications}
                    onChange={(e) => setSettings({...settings, enableEmailNotifications: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Enable SMS Notifications</h4>
                  <p className="text-sm text-gray-500">Send notifications via SMS</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableSmsNotifications}
                    onChange={(e) => setSettings({...settings, enableSmsNotifications: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'academic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Academic Year</label>
                <input
                  type="text"
                  value={settings.academicYear}
                  onChange={(e) => setSettings({...settings, academicYear: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Semester</label>
                <input
                  type="text"
                  value={settings.semester}
                  onChange={(e) => setSettings({...settings, semester: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Students per Class</label>
                <input
                  type="number"
                  value={settings.maxStudentsPerClass}
                  onChange={(e) => setSettings({...settings, maxStudentsPerClass: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  min="1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours Start</label>
                  <input
                    type="time"
                    value={settings.workingHoursStart}
                    onChange={(e) => setSettings({...settings, workingHoursStart: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours End</label>
                  <input
                    type="time"
                    value={settings.workingHoursEnd}
                    onChange={(e) => setSettings({...settings, workingHoursEnd: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SettingsManagement;