
import React, { ReactNode } from 'react';

interface CardProps {
    title?: string;
    children: ReactNode;
    className?: string;
    icon?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '', icon }) => {
    return (
        <div className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg ${className}`}>
            {title && (
                <div className="flex items-center mb-4 animate-fade-in">
                    {icon && <i className={`${icon} text-primary mr-3 text-xl animate-bounce-in`}></i>}
                    <h3 className="text-xl font-semibold text-text-main animate-fade-in">{title}</h3>
                </div>
            )}
            <div className="animate-fade-in">{children}</div>
        </div>
    );
};

export default Card;
