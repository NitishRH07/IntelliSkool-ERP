import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { MOCK_STUDENTS } from '../../constants';

interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin?: string;
}

const UserManagement = () => {
  // Combine mock students with existing users
  const mockStudentUsers = MOCK_STUDENTS.map(student => ({
    id: student.id,
    name: student.name,
    role: 'Student',
    email: `${student.name.toLowerCase().replace(/\s+/g, '.')}@student.intelliskool.edu`,
    status: 'active' as const,
    lastLogin: '2024-03-16'
  }));

  const [users] = useState<User[]>([
    {
      id: 'U001',
      name: 'Dr. Sarah Johnson',
      role: 'Teacher',
      email: 'sarah.j@intelliskool.edu',
      status: 'active',
      lastLogin: '2024-03-15'
    },
    {
      id: 'U002',
      name: 'Michael Chen',
      role: 'Student',
      email: 'michael.c@student.intelliskool.edu',
      status: 'active',
      lastLogin: '2024-03-16'
    },
    {
      id: 'U003',
      name: 'Priya Sharma',
      role: 'Parent',
      email: 'priya.sharma@parent.intelliskool.edu',
      status: 'active',
      lastLogin: '2024-03-14'
    },
    {
      id: 'U004',
      name: 'Robert Wilson',
      role: 'Admin',
      email: 'robert.w@intelliskool.edu',
      status: 'inactive'
    },
    {
      id: 'U005',
      name: 'Emma Thompson',
      role: 'Management',
      email: 'emma.t@intelliskool.edu',
      status: 'pending'
    },
    ...mockStudentUsers
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<User>>({});

  const roles = ['All', 'Admin', 'Teacher', 'Student', 'Parent', 'Management'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setEditFormData({ ...user });
  };

  const handleSaveEdit = () => {
    // In a real application, this would be an API call
    console.log('Saving user:', editFormData);
    setEditingUser(null);
    setEditFormData({});
  };

  const handleDeleteUser = (userId: string) => {
    // In a real application, this would be an API call
    console.log('Deleting user:', userId);
    // For demo, we'll just close any open modals
    setSelectedUser(null);
    setEditingUser(null);
  };

  const handleResetPassword = (userId: string) => {
    // In a real application, this would be an API call
    console.log('Resetting password for user:', userId);
    alert(`Password reset instructions sent to user ${userId}`);
  };

  return (
    <div className="space-y-6">
      <Card title="User Management" icon="fa-solid fa-users-gear">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <Button>
              <i className="fa-solid fa-plus mr-2"></i> Add New User
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin || 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-primary hover:text-primary-dark mr-3"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleEditUser(user)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <i className="fa-solid fa-users text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-medium text-gray-700">No users found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </Card>

      {/* User Detail Modal */}
      {selectedUser && !editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <i className="fa-solid fa-xmark text-2xl"></i>
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">User Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">User ID:</span>
                      <span className="font-medium">{selectedUser.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Role:</span>
                      <span className="font-medium">{selectedUser.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{selectedUser.email}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Account Status</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Login:</span>
                      <span className="font-medium">{selectedUser.lastLogin || 'Never'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Permissions</h4>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">View Dashboard</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Manage Content</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                      <span className="ml-2 text-sm text-gray-700">Edit Settings</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">View Reports</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="secondary" onClick={() => handleResetPassword(selectedUser.id)}>
                  <i className="fa-solid fa-key mr-2"></i> Reset Password
                </Button>
                <Button onClick={() => handleEditUser(selectedUser)}>
                  <i className="fa-solid fa-edit mr-2"></i> Edit User
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold text-gray-900">Edit User</h3>
                <button
                  onClick={() => setEditingUser(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <i className="fa-solid fa-xmark text-2xl"></i>
                </button>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editFormData.name || ''}
                    onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editFormData.email || ''}
                    onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={editFormData.role || ''}
                    onChange={(e) => setEditFormData({...editFormData, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                    <option value="Parent">Parent</option>
                    <option value="Management">Management</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editFormData.status || ''}
                    onChange={(e) => setEditFormData({...editFormData, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="secondary" onClick={() => setEditingUser(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit}>
                  <i className="fa-solid fa-save mr-2"></i> Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;