import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Student {
    id: string;
    name: string;
    rollNumber: string;
    attendance: number;
    lastTestScore: number;
    performanceTrend: 'up' | 'down' | 'stable';
}

interface Class {
    id: string;
    name: string;
    subject: string;
    grade: string;
    section: string;
    strength: number;
    students: Student[];
}

const TeacherClasses: React.FC = () => {
    // Mock data - in a real app, this would come from an API
    const [classes] = useState<Class[]>([
        {
            id: 'C001',
            name: 'Physics - 10th A',
            subject: 'Physics',
            grade: '10th',
            section: 'A',
            strength: 35,
            students: [
                { id: 'S001', name: 'Alice Johnson', rollNumber: '10A01', attendance: 95, lastTestScore: 87, performanceTrend: 'up' },
                { id: 'S002', name: 'Bob Smith', rollNumber: '10A02', attendance: 82, lastTestScore: 76, performanceTrend: 'stable' },
                { id: 'S003', name: 'Charlie Brown', rollNumber: '10A03', attendance: 78, lastTestScore: 65, performanceTrend: 'down' },
                { id: 'S004', name: 'Diana Miller', rollNumber: '10A04', attendance: 92, lastTestScore: 91, performanceTrend: 'up' },
                { id: 'S005', name: 'Edward Davis', rollNumber: '10A05', attendance: 88, lastTestScore: 82, performanceTrend: 'stable' },
            ]
        },
        {
            id: 'C002',
            name: 'Physics - 10th B',
            subject: 'Physics',
            grade: '10th',
            section: 'B',
            strength: 32,
            students: [
                { id: 'S006', name: 'Fiona Clark', rollNumber: '10B01', attendance: 90, lastTestScore: 85, performanceTrend: 'up' },
                { id: 'S007', name: 'George Wilson', rollNumber: '10B02', attendance: 85, lastTestScore: 78, performanceTrend: 'stable' },
                { id: 'S008', name: 'Helen Moore', rollNumber: '10B03', attendance: 93, lastTestScore: 89, performanceTrend: 'up' },
            ]
        }
    ]);

    const [selectedClass, setSelectedClass] = useState<Class>(classes[0]);
    const [searchTerm, setSearchTerm] = useState('');

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'up': return 'fa-arrow-trend-up text-green-500';
            case 'down': return 'fa-arrow-trend-down text-red-500';
            case 'stable': return 'fa-minus text-gray-500';
            default: return 'fa-minus text-gray-500';
        }
    };

    const getStatusColor = (attendance: number) => {
        if (attendance >= 90) return 'bg-green-100 text-green-800';
        if (attendance >= 80) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };

    const filteredStudents = selectedClass.students.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <Card title="My Classes" icon="fa-solid fa-school">
                <div className="mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-medium mb-2">Select Class</h3>
                            <div className="flex flex-wrap gap-2">
                                {classes.map(cls => (
                                    <button
                                        key={cls.id}
                                        onClick={() => setSelectedClass(cls)}
                                        className={`px-4 py-2 rounded-lg transition-colors ${
                                            selectedClass.id === cls.id
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {cls.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                    <div className="text-xl font-bold text-blue-800">{selectedClass.strength}</div>
                                    <div className="text-xs text-blue-700">Students</div>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                    <div className="text-xl font-bold text-green-800">
                                        {Math.round(selectedClass.students.reduce((sum, student) => sum + student.attendance, 0) / selectedClass.students.length)}%
                                    </div>
                                    <div className="text-xs text-green-700">Avg Attendance</div>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                                    <div className="text-xl font-bold text-purple-800">
                                        {Math.round(selectedClass.students.reduce((sum, student) => sum + student.lastTestScore, 0) / selectedClass.students.length)}%
                                    </div>
                                    <div className="text-xs text-purple-700">Avg Score</div>
                                </div>
                                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                                    <div className="text-xl font-bold text-orange-800">
                                        {selectedClass.students.filter(s => s.performanceTrend === 'up').length}
                                    </div>
                                    <div className="text-xs text-orange-700">Improving</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search students by name or roll number..."
                                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400"></i>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="secondary">
                                <i className="fa-solid fa-file-export mr-2"></i> Export
                            </Button>
                            <Button>
                                <i className="fa-solid fa-message mr-2"></i> Message Class
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Test</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.rollNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(student.attendance)}`}>
                                            {student.attendance}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.lastTestScore}%</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <i className={`fa-solid ${getTrendIcon(student.performanceTrend)}`}></i>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-primary hover:text-primary-dark mr-3">
                                            View Details
                                        </button>
                                        <button className="text-blue-600 hover:text-blue-900">
                                            Message
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredStudents.length === 0 && (
                    <div className="text-center py-12">
                        <i className="fa-solid fa-users text-4xl text-gray-300 mb-4"></i>
                        <h3 className="text-xl font-medium text-gray-700">No students found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default TeacherClasses;