import React, { useState } from 'react';
import { UserRole } from '../../types';
import { createCredentials, User } from '../../services/authService';
import Button from '../ui/Button';

const UserManagement: React.FC = () => {
    const [users] = useState<User[]>([
        // Mock data for display
        { id: '1', username: 'admin', role: UserRole.ADMIN, name: 'Dr. Ramanathan', email: 'admin@intelliskool.com' },
        { id: '2', username: 'teacher', role: UserRole.TEACHER, name: 'Prof. Lakshmi', email: 'teacher@intelliskool.com' },
        { id: '3', username: 'student', role: UserRole.STUDENT, name: 'Arjun', email: 'arjun@intelliskool.com' },
        { id: '4', username: 'parent', role: UserRole.PARENT, name: 'Mr. Krishnan', email: 'parent@intelliskool.com' },
    ]);
    
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        role: UserRole.STUDENT,
        username: ''
    });
    
    const [credentials, setCredentials] = useState<{ username: string; password: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewUser(prev => ({ ...prev, [name]: value }));
    };
    
    const handleCreateCredentials = async () => {
        if (!newUser.name || !newUser.email || !newUser.username) {
            setError('Please fill in all required fields');
            return;
        }
        
        setLoading(true);
        setError('');
        
        try {
            const result = await createCredentials(newUser);
            
            if (result.success && result.credentials) {
                setCredentials(result.credentials);
                // Reset form
                setNewUser({
                    name: '',
                    email: '',
                    role: UserRole.STUDENT,
                    username: ''
                });
            } else {
                setError(result.error || 'Failed to create credentials');
            }
        } catch (err) {
            setError('Failed to create credentials: ' + (err as Error).message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleCopyCredentials = () => {
        if (credentials) {
            const text = `Username: ${credentials.username}\nPassword: ${credentials.password}`;
            navigator.clipboard.writeText(text);
            alert('Credentials copied to clipboard!');
        }
    };
    
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Create Credentials Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Issue Login Credentials</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={newUser.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                placeholder="Enter full name"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={newUser.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                placeholder="Enter email address"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Username *
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={newUser.username}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                placeholder="Enter username"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Role
                            </label>
                            <select
                                name="role"
                                value={newUser.role}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            >
                                <option value={UserRole.STUDENT}>Student</option>
                                <option value={UserRole.TEACHER}>Teacher</option>
                                <option value={UserRole.PARENT}>Parent</option>
                            </select>
                        </div>
                        
                        <Button
                            onClick={handleCreateCredentials}
                            disabled={loading}
                            className="w-full"
                        >
                            {loading ? 'Creating...' : 'Create Credentials'}
                        </Button>
                    </div>
                    
                    {error && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}
                    
                    {credentials && (
                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                            <h3 className="text-green-800 font-medium mb-2">Credentials Created Successfully</h3>
                            <p className="text-green-700 text-sm mb-3">
                                Username: <strong>{credentials.username}</strong><br />
                                Password: <strong>{credentials.password}</strong>
                            </p>
                            <Button
                                variant="secondary"
                                onClick={handleCopyCredentials}
                                size="sm"
                            >
                                Copy to Clipboard
                            </Button>
                        </div>
                    )}
                </div>
                
                {/* User List Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Existing Users</h2>
                    
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Role
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Email
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {user.name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {user.email}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;