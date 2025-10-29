import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Assignment {
    id: string;
    title: string;
    subject: string;
    class: string;
    dueDate: string;
    assignedDate: string;
    totalMarks: number;
    submissions: number;
    pending: number;
    status: 'active' | 'closed' | 'draft';
}

const TeacherAssignments: React.FC = () => {
    // Mock data - in a real app, this would come from an API
    const [assignments] = useState<Assignment[]>([
        {
            id: 'A001',
            title: 'Laws of Motion Problems',
            subject: 'Physics',
            class: '10th A',
            dueDate: '2024-03-20',
            assignedDate: '2024-03-10',
            totalMarks: 20,
            submissions: 32,
            pending: 3,
            status: 'active'
        },
        {
            id: 'A002',
            title: 'Chemical Reactions Worksheet',
            subject: 'Chemistry',
            class: '10th B',
            dueDate: '2024-03-25',
            assignedDate: '2024-03-12',
            totalMarks: 15,
            submissions: 28,
            pending: 4,
            status: 'active'
        },
        {
            id: 'A003',
            title: 'Algebra Practice Set',
            subject: 'Mathematics',
            class: '10th A',
            dueDate: '2024-03-15',
            assignedDate: '2024-03-05',
            totalMarks: 25,
            submissions: 35,
            pending: 0,
            status: 'closed'
        },
        {
            id: 'A004',
            title: 'Essay on Environmental Conservation',
            subject: 'English',
            class: '10th B',
            dueDate: '2024-03-30',
            assignedDate: '2024-03-15',
            totalMarks: 30,
            submissions: 15,
            pending: 17,
            status: 'active'
        },
        {
            id: 'A005',
            title: 'Periodic Table Quiz',
            subject: 'Chemistry',
            class: '10th A',
            dueDate: '2024-04-05',
            assignedDate: '2024-03-18',
            totalMarks: 10,
            submissions: 0,
            pending: 35,
            status: 'draft'
        }
    ]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newAssignment, setNewAssignment] = useState({
        title: '',
        subject: 'Physics',
        class: '10th A',
        dueDate: '',
        totalMarks: 20
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'closed': return 'bg-gray-100 text-gray-800';
            case 'draft': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleCreateAssignment = () => {
        // In a real app, this would submit to an API
        alert(`Assignment "${newAssignment.title}" created successfully!`);
        setShowCreateModal(false);
        setNewAssignment({
            title: '',
            subject: 'Physics',
            class: '10th A',
            dueDate: '',
            totalMarks: 20
        });
    };

    return (
        <div className="space-y-6">
            <Card title="Assignments" icon="fa-solid fa-file-pen">
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-medium">Manage Assignments</h3>
                        <p className="text-gray-600 text-sm">Create, track, and grade student assignments</p>
                    </div>
                    <Button onClick={() => setShowCreateModal(true)}>
                        <i className="fa-solid fa-plus mr-2"></i> Create Assignment
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="text-2xl font-bold text-blue-800">{assignments.filter(a => a.status === 'active').length}</div>
                        <div className="text-sm text-blue-700">Active Assignments</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <div className="text-2xl font-bold text-green-800">{assignments.filter(a => a.status === 'closed').length}</div>
                        <div className="text-sm text-green-700">Completed</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                        <div className="text-2xl font-bold text-yellow-800">{assignments.filter(a => a.status === 'draft').length}</div>
                        <div className="text-sm text-yellow-700">Drafts</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <div className="text-2xl font-bold text-purple-800">
                            {assignments.reduce((sum, a) => sum + a.submissions, 0)}
                        </div>
                        <div className="text-sm text-purple-700">Total Submissions</div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submissions</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {assignments.map((assignment) => (
                                <tr key={assignment.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                                        <div className="text-sm text-gray-500">{assignment.totalMarks} marks</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.subject}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.class}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.dueDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{assignment.submissions}/{assignment.submissions + assignment.pending}</div>
                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-primary h-2 rounded-full" 
                                                style={{ width: `${(assignment.submissions / (assignment.submissions + assignment.pending)) * 100}%` }}
                                            ></div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(assignment.status)}`}>
                                            {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-primary hover:text-primary-dark mr-3">
                                            View
                                        </button>
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                                            Edit
                                        </button>
                                        <button className="text-green-600 hover:text-green-900">
                                            Grade
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Create Assignment Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">Create New Assignment</h3>
                                <button 
                                    onClick={() => setShowCreateModal(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Title</label>
                                    <input
                                        type="text"
                                        value={newAssignment.title}
                                        onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        placeholder="e.g., Laws of Motion Problems"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                        <select
                                            value={newAssignment.subject}
                                            onChange={(e) => setNewAssignment({...newAssignment, subject: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        >
                                            <option>Physics</option>
                                            <option>Chemistry</option>
                                            <option>Mathematics</option>
                                            <option>English</option>
                                            <option>Biology</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                                        <select
                                            value={newAssignment.class}
                                            onChange={(e) => setNewAssignment({...newAssignment, class: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        >
                                            <option>10th A</option>
                                            <option>10th B</option>
                                            <option>9th A</option>
                                            <option>9th B</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                        <input
                                            type="date"
                                            value={newAssignment.dueDate}
                                            onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
                                        <input
                                            type="number"
                                            value={newAssignment.totalMarks}
                                            onChange={(e) => setNewAssignment({...newAssignment, totalMarks: parseInt(e.target.value) || 0})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                            min="1"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end space-x-3">
                                <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleCreateAssignment}>
                                    Create Assignment
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherAssignments;