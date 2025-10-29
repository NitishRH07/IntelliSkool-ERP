
import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: string;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-5 flex items-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl ${color}`}>
                <i className={icon}></i>
            </div>
            <div className="ml-4">
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <p className="text-2xl font-bold text-text-main">{value}</p>
            </div>
        </div>
    );
};

export default StatCard;
