import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Course {
    id: string;
    name: string;
    code: string;
    instructor: string;
    credits: number;
    progress: number;
    status: 'enrolled' | 'completed' | 'dropped';
    startDate: string;
    endDate: string;
    nextAssignment?: string;
    nextAssignmentDate?: string;
}

const StudentCourses: React.FC = () => {
    // Mock data - in a real app, this would come from an API
    const [courses] = useState<Course[]>([
        {
            id: 'C001',
            name: 'Physics - Laws of Motion',
            code: 'PHY101',
            instructor: 'Dr. Sarah Johnson',
            credits: 4,
            progress: 75,
            status: 'enrolled',
            startDate: '2024-01-15',
            endDate: '2024-05-30',
            nextAssignment: 'Chapter 5 Problems',
            nextAssignmentDate: '2024-03-20'
        },
        {
            id: 'C002',
            name: 'Mathematics - Algebra',
            code: 'MATH101',
            instructor: 'Prof. Michael Chen',
            credits: 3,
            progress: 60,
            status: 'enrolled',
            startDate: '2024-01-15',
            endDate: '2024-05-30',
            nextAssignment: 'Quadratic Equations Quiz',
            nextAssignmentDate: '2024-03-25'
        },
        {
            id: 'C003',
            name: 'Chemistry - Periodic Table',
            code: 'CHEM101',
            instructor: 'Dr. Emily Wilson',
            credits: 4,
            progress: 85,
            status: 'enrolled',
            startDate: '2024-01-15',
            endDate: '2024-05-30',
            nextAssignment: 'Lab Report Submission',
            nextAssignmentDate: '2024-03-18'
        },
        {
            id: 'C004',
            name: 'English Literature',
            code: 'ENG101',
            instructor: 'Ms. Jessica Brown',
            credits: 3,
            progress: 40,
            status: 'enrolled',
            startDate: '2024-01-15',
            endDate: '2024-05-30'
        },
        {
            id: 'C005',
            name: 'Biology - Cell Structure',
            code: 'BIO101',
            instructor: 'Dr. Robert Davis',
            credits: 4,
            progress: 100,
            status: 'completed',
            startDate: '2023-09-15',
            endDate: '2023-12-30'
        }
    ]);

    const [filter, setFilter] = useState('all');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'enrolled': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'dropped': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredCourses = courses.filter(course => {
        if (filter === 'all') return true;
        return course.status === filter;
    });

    const overallProgress = courses.length > 0 
        ? Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length) 
        : 0;

    return (
        <div className="space-y-6">
            <Card title="My Courses" icon="fa-solid fa-book-open-reader">
                <div className="mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-medium">Course Enrollment</h3>
                            <p className="text-gray-600 text-sm">Manage your academic courses and track progress</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-3 py-1 rounded-full text-sm ${
                                    filter === 'all' 
                                        ? 'bg-primary text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                All Courses
                            </button>
                            <button
                                onClick={() => setFilter('enrolled')}
                                className={`px-3 py-1 rounded-full text-sm ${
                                    filter === 'enrolled' 
                                        ? 'bg-primary text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Enrolled
                            </button>
                            <button
                                onClick={() => setFilter('completed')}
                                className={`px-3 py-1 rounded-full text-sm ${
                                    filter === 'completed' 
                                        ? 'bg-primary text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Completed
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="text-2xl font-bold text-blue-800">{courses.filter(c => c.status === 'enrolled').length}</div>
                        <div className="text-sm text-blue-700">Active Courses</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <div className="text-2xl font-bold text-green-800">{courses.filter(c => c.status === 'completed').length}</div>
                        <div className="text-sm text-green-700">Completed</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <div className="text-2xl font-bold text-purple-800">{overallProgress}%</div>
                        <div className="text-sm text-purple-700">Overall Progress</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                        <div className="text-2xl font-bold text-orange-800">
                            {courses.filter(c => c.nextAssignment).length}
                        </div>
                        <div className="text-sm text-orange-700">Upcoming Assignments</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredCourses.map((course) => (
                        <div key={course.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900">{course.name}</h4>
                                    <p className="text-gray-600 text-sm">{course.code} • {course.credits} credits</p>
                                    <p className="text-gray-700 mt-1">Instructor: {course.instructor}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                                </span>
                            </div>

                            <div className="mt-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Progress</span>
                                    <span className="font-medium">{course.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-primary h-2 rounded-full" 
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <div className="text-gray-500">Start Date</div>
                                    <div className="font-medium">{course.startDate}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500">End Date</div>
                                    <div className="font-medium">{course.endDate}</div>
                                </div>
                            </div>

                            {course.nextAssignment && (
                                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                                    <div className="flex justify-between">
                                        <div>
                                            <div className="text-sm font-medium text-yellow-800">Next Assignment</div>
                                            <div className="text-sm text-yellow-700">{course.nextAssignment}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-yellow-600">Due</div>
                                            <div className="text-sm font-medium text-yellow-800">{course.nextAssignmentDate}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-4 flex justify-end space-x-2">
                                <Button variant="secondary" size="sm">
                                    <i className="fa-solid fa-book mr-1"></i> Materials
                                </Button>
                                <Button size="sm">
                                    <i className="fa-solid fa-chart-line mr-1"></i> Progress
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-12">
                        <i className="fa-solid fa-book text-4xl text-gray-300 mb-4"></i>
                        <h3 className="text-xl font-medium text-gray-700">No courses found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your filter criteria</p>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default StudentCourses;