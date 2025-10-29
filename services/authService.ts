// authService.ts
import { UserRole } from '../types';
import { MOCK_STUDENTS } from '../constants';

export interface User {
    id: string;
    username: string;
    role: UserRole;
    name: string;
    email: string;
}

// Mock user database - using the new mock student data
const mockUsers: User[] = [
    {
        id: '1',
        username: 'admin',
        role: UserRole.ADMIN,
        name: 'Dr. Ramanathan',
        email: 'admin@intelliskool.com'
    },
    {
        id: '2',
        username: 'teacher',
        role: UserRole.TEACHER,
        name: 'Prof. Lakshmi',
        email: 'teacher@intelliskool.com'
    },
    // Add all mock students as users
    ...MOCK_STUDENTS.map((student, index) => ({
        id: (index + 3).toString(),
        username: student.name.toLowerCase().replace(/\s+/g, '.'),
        role: UserRole.STUDENT,
        name: student.name,
        email: `${student.name.toLowerCase().replace(/\s+/g, '.')}@intelliskool.com`
    })),
    // Add mock parents
    {
        id: '303',
        username: 'parent',
        role: UserRole.PARENT,
        name: 'Mr. Krishnan',
        email: 'parent@intelliskool.com'
    },
    {
        id: '304',
        username: 'management',
        role: UserRole.MANAGEMENT,
        name: 'Dr. Priya',
        email: 'management@intelliskool.com'
    }
];

// Mock authentication function
export const authenticateUser = async (username: string, password: string, role: UserRole): Promise<User | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real application, this would call an API
    // For demo purposes, we'll use mock data
    const user = mockUsers.find(u => u.username === username && u.role === role);
    
    // Simple password validation (in real app, this would be handled server-side)
    if (user && password === 'password') { // Using a simple password for demo
        return user;
    }
    
    return null;
};

// Get user by ID
export const getUserById = (id: string): User | undefined => {
    return mockUsers.find(u => u.id === id);
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
    // In a real app, this would check for a valid token
    return !!localStorage.getItem('authToken');
};

// Login function
export const login = async (username: string, password: string, role: UserRole): Promise<{ success: boolean; user?: User; error?: string }> => {
    try {
        const user = await authenticateUser(username, password, role);
        
        if (user) {
            // Store token in localStorage (in real app, this would be a JWT)
            localStorage.setItem('authToken', `token-${user.id}`);
            localStorage.setItem('currentUser', JSON.stringify(user));
            return { success: true, user };
        } else {
            return { success: false, error: 'Invalid username, password, or role' };
        }
    } catch (error) {
        return { success: false, error: 'Authentication service error' };
    }
};

// Logout function
export const logout = (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
};

// Get current user
export const getCurrentUser = (): User | null => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
};