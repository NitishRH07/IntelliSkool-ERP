// FIX: Create types file to define shared data structures.
export enum UserRole {
    ADMIN = 'Admin',
    TEACHER = 'Teacher',
    STUDENT = 'Student',
    PARENT = 'Parent',
    MANAGEMENT = 'Management',
}

export interface MenuItem {
    label: string;
    icon: string;
    view?: string;
    submenu?: MenuItem[];
}

export interface Question {
    questionText: string;
    options: string[];
    correctAnswer: string;
}

export interface Quiz {
    title: string;
    questions: Question[];
}

export interface Student {
    id: string;
    name: string;
    role: UserRole;
    grades: { [subject: string]: number };
    attendance: number;
}

export interface ChatMessage {
    id:string;
    role: 'user' | 'model';
    content: string;
}

// FIX: To resolve the "Subsequent property declarations must have the same type" error, the AIStudio interface is moved inside the `declare global` block. This prevents module scope conflicts by ensuring a single, consistent global definition for the window.aistudio type.
declare global {
    // FIX: Define a named interface for aistudio to avoid declaration conflicts.
    interface AIStudio {
        hasSelectedApiKey: () => Promise<boolean>;
        openSelectKey: () => Promise<void>;
    }

    interface Window {
        aistudio?: AIStudio;
    }
}
