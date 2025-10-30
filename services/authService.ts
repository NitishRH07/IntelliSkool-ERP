// authService.ts
import { UserRole } from '../types';
import { supabase } from './supabaseClient';

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

// Supabase authentication functions
export const authenticateUser = async (username: string, password: string, role: UserRole): Promise<User | null> => {
    try {
        // First, try Supabase authentication
        if (supabase) {
            // For demo purposes, we'll simulate authentication
            // In a real implementation, you would use:
            // const { data, error } = await supabase.auth.signInWithPassword({
            //   email: username,
            //   password: password
            // });
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // For demo, check against mock users
            const user = mockUsers.find(u => u.username === username && u.role === role);
            
            // Simple password validation (in real app, this would be handled server-side)
            if (user && password === 'password') { // Using a simple password for demo
                return user;
            }
        }
        
        // Fallback to mock authentication
        await new Promise(resolve => setTimeout(resolve, 500));
        const user = mockUsers.find(u => u.username === username && u.role === role);
        
        // Simple password validation (in real app, this would be handled server-side)
        if (user && password === 'password') { // Using a simple password for demo
            return user;
        }
        
        return null;
    } catch (error) {
        console.error('Authentication error:', error);
        return null;
    }
};

// Get user by ID
export const getUserById = async (id: string): Promise<User | undefined> => {
    try {
        if (supabase) {
            // In a real implementation, you would fetch from Supabase:
            // const { data, error } = await supabase
            //   .from('users')
            //   .select('*')
            //   .eq('id', id)
            //   .single();
            // return data;
        }
        
        // Fallback to mock data
        return mockUsers.find(u => u.id === id);
    } catch (error) {
        console.error('Error fetching user:', error);
        return undefined;
    }
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
    
    if (supabase) {
        // In a real implementation, you would sign out:
        // supabase.auth.signOut();
    }
};

// Get current user
export const getCurrentUser = (): User | null => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
};

// Admin function to create user credentials
export const createCredentials = async (userData: {
    name: string;
    email: string;
    role: UserRole;
    username: string;
}): Promise<{ success: boolean; credentials?: { username: string; password: string }; error?: string }> => {
    try {
        if (supabase) {
            // In a real implementation, you would create a user in Supabase:
            // const { data, error } = await supabase.auth.signUp({
            //   email: userData.email,
            //   password: generateRandomPassword(), // Generate a random password
            //   options: {
            //     data: {
            //       name: userData.name,
            //       role: userData.role,
            //       username: userData.username
            //     }
            //   }
            // });
            
            // For demo, we'll just return mock credentials
            const credentials = {
                username: userData.username,
                password: 'password' // In real app, this would be a generated secure password
            };
            
            return { success: true, credentials };
        }
        
        // Fallback for demo
        const credentials = {
            username: userData.username,
            password: 'password'
        };
        
        return { success: true, credentials };
    } catch (error) {
        return { success: false, error: 'Failed to create credentials' };
    }
};