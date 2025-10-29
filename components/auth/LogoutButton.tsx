import React from 'react';
import Button from '../ui/Button';
import { logout } from '../../services/authService';

interface LogoutButtonProps {
    variant?: 'primary' | 'secondary';
    className?: string;
    onLogout?: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ 
    variant = 'primary', 
    className = '',
    onLogout 
}) => {
    const handleClick = () => {
        // Perform logout
        logout();
        
        // Notify parent component
        if (onLogout) {
            onLogout();
        }
    };

    return (
        <Button 
            variant={variant} 
            className={className}
            onClick={handleClick}
        >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Logout
        </Button>
    );
};

export default LogoutButton;