import React from 'react';
import Card from './Card';

interface PlaceholderContentProps {
    title?: string;
    message?: string;
}

const PlaceholderContent: React.FC<PlaceholderContentProps> = ({ 
    title = 'Feature Coming Soon', 
    message = 'This feature is currently under development. Please check back later.' 
}) => {
    return (
        <Card title={title} className="text-center">
            <div className="py-12">
                <i className="fa-solid fa-hammer text-4xl text-gray-300 mb-4"></i>
                <p className="text-gray-600">{message}</p>
            </div>
        </Card>
    );
};

export default PlaceholderContent;