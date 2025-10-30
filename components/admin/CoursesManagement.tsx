import React, { useState } from 'react';
import Button from '../ui/Button';

// Mock course data
const mockCourses = [
    { id: '1', name: 'Mathematics', code: 'MATH101', credits: 3, instructor: 'Dr. Ramanathan', students: 45 },
    { id: '2', name: 'Physics', code: 'PHYS101', credits: 4, instructor: 'Prof. Lakshmi', students: 42 },
    { id: '3', name: 'Chemistry', code: 'CHEM101', credits: 4, instructor: 'Dr. Prakash', students: 40 },
    { id: '4', name: 'Biology', code: 'BIOL101', credits: 3, instructor: 'Dr. Anitha', students: 38 },
    { id: '5', name: 'English', code: 'ENG101', credits: 2, instructor: 'Prof. Meena', students: 50 },
];

const CoursesManagement: React.FC = () => {
    const [courses] = useState(mockCourses);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCourse, setNewCourse] = useState({
        name: '',
        code: '',
        credits: 3,
        instructor: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewCourse(prev => ({ ...prev, [name]: value }));
    };

    const handleAddCourse = () => {
        if (newCourse.name && newCourse.code && newCourse.instructor) {
            // In a real app, you would add the course to the database
            alert(`Course "${newCourse.name}" added successfully!`);
            setNewCourse({ name: '', code: '', credits: 3, instructor: '' });
            setShowAddForm(false);
        } else {
            alert('Please fill in all required fields');
        }
    };

    const handleDeleteCourse = (courseId: string, courseName: string) => {
        // In a real app, you would delete the course from the database
        if (confirm(`Are you sure you want to delete the course "${courseName}"?`)) {
            alert(`Course "${courseName}" deleted successfully!`);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Courses Management</h1>
                <Button onClick={() => setShowAddForm(true)}>
                    <i className="fa-solid fa-plus mr-2"></i>
                    Add Course
                </Button>
            </div>

            {showAddForm && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Course</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Course Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={newCourse.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                placeholder="Enter course name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Course Code *
                            </label>
                            <input
                                type="text"
                                name="code"
                                value={newCourse.code}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                placeholder="Enter course code"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Credits
                            </label>
                            <select
                                name="credits"
                                value={newCourse.credits}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            >
                                {[1, 2, 3, 4, 5, 6].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Instructor *
                            </label>
                            <input
                                type="text"
                                name="instructor"
                                value={newCourse.instructor}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                placeholder="Enter instructor name"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <Button onClick={handleAddCourse}>
                            Add Course
                        </Button>
                        <Button variant="secondary" onClick={() => setShowAddForm(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Course
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Code
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Credits
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Instructor
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Students
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {courses.map((course) => (
                            <tr key={course.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{course.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{course.code}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{course.credits}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{course.instructor}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{course.students}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleDeleteCourse(course.id, course.name)}
                                        className="text-red-600 hover:text-red-900 mr-3"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                    <button className="text-primary hover:text-primary-dark">
                                        <i className="fa-solid fa-edit"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CoursesManagement;