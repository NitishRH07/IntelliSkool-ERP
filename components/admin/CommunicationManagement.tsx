import React, { useState } from 'react';
import Button from '../ui/Button';

// Mock communication data
const mockCommunications = [
    { id: '1', title: 'School Holiday Announcement', type: 'Announcement', date: '2023-06-15', recipients: 'All Students' },
    { id: '2', title: 'Parent-Teacher Meeting', type: 'Meeting', date: '2023-06-20', recipients: 'Parents of 10th Grade' },
    { id: '3', title: 'Exam Schedule', type: 'Notice', date: '2023-06-10', recipients: 'Students of 1st PUC' },
    { id: '4', title: 'New Library Rules', type: 'Policy', date: '2023-06-05', recipients: 'All Users' },
];

const CommunicationManagement: React.FC = () => {
    const [communications] = useState(mockCommunications);
    const [showComposeForm, setShowComposeForm] = useState(false);
    const [newMessage, setNewMessage] = useState({
        title: '',
        type: 'Announcement',
        recipients: 'All Students',
        content: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewMessage(prev => ({ ...prev, [name]: value }));
    };

    const handleSendMessage = () => {
        if (newMessage.title && newMessage.content) {
            // In a real app, you would send the message
            alert(`Message "${newMessage.title}" sent successfully!`);
            setNewMessage({ title: '', type: 'Announcement', recipients: 'All Students', content: '' });
            setShowComposeForm(false);
        } else {
            alert('Please fill in all required fields');
        }
    };

    const handleDeleteMessage = (messageId: string, messageTitle: string) => {
        // In a real app, you would delete the message
        if (confirm(`Are you sure you want to delete the message "${messageTitle}"?`)) {
            alert(`Message "${messageTitle}" deleted successfully!`);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Communication Management</h1>
                <Button onClick={() => setShowComposeForm(true)}>
                    <i className="fa-solid fa-plus mr-2"></i>
                    Compose Message
                </Button>
            </div>

            {showComposeForm && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Compose New Message</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Message Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={newMessage.title}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                placeholder="Enter message title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Message Type
                            </label>
                            <select
                                name="type"
                                value={newMessage.type}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            >
                                <option value="Announcement">Announcement</option>
                                <option value="Notice">Notice</option>
                                <option value="Meeting">Meeting</option>
                                <option value="Policy">Policy</option>
                                <option value="Event">Event</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Recipients
                            </label>
                            <select
                                name="recipients"
                                value={newMessage.recipients}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            >
                                <option value="All Students">All Students</option>
                                <option value="All Teachers">All Teachers</option>
                                <option value="All Parents">All Parents</option>
                                <option value="All Users">All Users</option>
                                <option value="Specific Class">Specific Class</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Message Content *
                        </label>
                        <textarea
                            name="content"
                            value={newMessage.content}
                            onChange={handleInputChange}
                            rows={5}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            placeholder="Enter your message content"
                        />
                    </div>
                    <div className="flex space-x-3">
                        <Button onClick={handleSendMessage}>
                            Send Message
                        </Button>
                        <Button variant="secondary" onClick={() => setShowComposeForm(false)}>
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
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Recipients
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {communications.map((message) => (
                            <tr key={message.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{message.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {message.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {message.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {message.recipients}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-primary hover:text-primary-dark mr-3">
                                        <i className="fa-solid fa-eye"></i>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteMessage(message.id, message.title)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <i className="fa-solid fa-trash"></i>
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

export default CommunicationManagement;