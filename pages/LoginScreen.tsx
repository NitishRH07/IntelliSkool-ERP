import React, { useState } from 'react';

import { UserRole } from '../types';

import Card from '../components/ui/Card';

import Button from '../components/ui/Button';

interface LoginScreenProps {
    onSelectRole: (role: UserRole) => void;
}

const roles = [
    { role: UserRole.ADMIN, icon: 'fa-solid fa-user-shield', color: 'bg-red-500' },
    { role: UserRole.TEACHER, icon: 'fa-solid fa-chalkboard-user', color: 'bg-blue-500' },
    { role: UserRole.STUDENT, icon: 'fa-solid fa-user-graduate', color: 'bg-green-500' },
    { role: UserRole.PARENT, icon: 'fa-solid fa-user-group', color: 'bg-yellow-500' },
    { role: UserRole.MANAGEMENT, icon: 'fa-solid fa-user-tie', color: 'bg-purple-500' },
];

const LoginScreen: React.FC<LoginScreenProps> = ({ onSelectRole }) => {
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock authentication: any non-empty username/password is valid
        if (selectedRole && username.trim() && password.trim()) {
            onSelectRole(selectedRole);
        } else {
            alert('Please enter a username and password.');
        }
    };

    // Render login form if a role has been selected
    if (selectedRole) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Card title={`${selectedRole} Login`} className="w-full max-w-sm text-center shadow-2xl animate-fade-in">
                    <div className="mb-4 text-sm text-gray-600">
                        <p>Enter your credentials to access the {selectedRole.toLowerCase()} dashboard.</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 text-left">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder={`Enter your ${selectedRole.toLowerCase()} username`}
                                required
                                autoFocus
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                           <i className="fas fa-sign-in-alt mr-2"></i> Login
                        </Button>
                    </form>
                    <button
                        onClick={() => setSelectedRole(null)}
                        className="mt-4 text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                        &larr; Back to Role Selection
                    </button>
                </Card>
            </div>
        );
    }

    // Render role selection grid
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card title="Welcome to IntelliSkool ERP" className="w-full max-w-2xl text-center shadow-2xl">
                <p className="mb-8 text-gray-600">Please select your role to continue</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {roles.map(({ role, icon, color }) => (
                        <button
                            key={role}
                            onClick={() => setSelectedRole(role)}
                            className={`p-6 rounded-lg text-white ${color} hover:opacity-90 transform hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center space-y-3 shadow-lg`}
                        >
                            <i className={`${icon} text-4xl`}></i>
                            <span className="font-semibold text-lg">{role}</span>
                        </button>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default LoginScreen;