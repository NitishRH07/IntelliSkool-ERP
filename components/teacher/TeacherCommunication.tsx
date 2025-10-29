import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Announcement {
    id: string;
    title: string;
    content: string;
    date: string;
    author: string;
    recipients: string;
    priority: 'low' | 'medium' | 'high';
}

interface Message {
    id: string;
    sender: string;
    recipient: string;
    content: string;
    timestamp: string;
    read: boolean;
}

const TeacherCommunication: React.FC = () => {
    // Mock data - in a real app, this would come from an API
    const [announcements, setAnnouncements] = useState<Announcement[]>([
        { id: 'ANN001', title: 'Parent-Teacher Meeting', content: 'Please note that the quarterly parent-teacher meeting is scheduled for March 25th. All parents are requested to attend.', date: '2024-03-15', author: 'Dr. Williams (Principal)', recipients: 'All Parents', priority: 'high' },
        { id: 'ANN002', title: 'Science Exhibition', content: 'Our annual science exhibition will be held on April 10th. Students are encouraged to participate with their innovative projects.', date: '2024-03-10', author: 'Mr. Johnson (Physics Dept)', recipients: 'Students', priority: 'medium' },
        { id: 'ANN003', title: 'Library Timing Change', content: 'The library will be closed for maintenance from March 18th to March 20th. New timings will be notified soon.', date: '2024-03-12', author: 'Mrs. Smith (Librarian)', recipients: 'All', priority: 'low' },
    ]);

    const [messages, setMessages] = useState<Message[]>([
        { id: 'MSG001', sender: 'Dr. Williams', recipient: 'All Teachers', content: 'Please submit your quarterly reports by March 22nd.', timestamp: '2024-03-15 10:30', read: false },
        { id: 'MSG002', sender: 'Mrs. Smith', recipient: 'Physics Dept', content: 'New textbooks have arrived for the 10th grade. Please collect them from the library.', timestamp: '2024-03-14 14:15', read: true },
        { id: 'MSG003', sender: 'Mr. Brown', recipient: 'You', content: 'Can we schedule a meeting to discuss Alex Morgan\'s performance?', timestamp: '2024-03-13 09:45', read: false },
    ]);

    const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState({
        title: '',
        content: '',
        recipients: 'All',
        priority: 'medium' as 'low' | 'medium' | 'high'
    });
    const [newMessage, setNewMessage] = useState({
        recipient: '',
        content: ''
    });

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleCreateAnnouncement = () => {
        // In a real app, this would submit to an API
        const announcement: Announcement = {
            id: `ANN${String(announcements.length + 1).padStart(3, '0')}`,
            title: newAnnouncement.title,
            content: newAnnouncement.content,
            date: new Date().toISOString().split('T')[0],
            author: 'You (Teacher)',
            recipients: newAnnouncement.recipients,
            priority: newAnnouncement.priority
        };
        
        setAnnouncements([announcement, ...announcements]);
        setShowAnnouncementModal(false);
        setNewAnnouncement({
            title: '',
            content: '',
            recipients: 'All',
            priority: 'medium'
        });
        alert('Announcement created successfully!');
    };

    const handleSendMessage = () => {
        // In a real app, this would submit to an API
        const message: Message = {
            id: `MSG${String(messages.length + 1).padStart(3, '0')}`,
            sender: 'You (Teacher)',
            recipient: newMessage.recipient,
            content: newMessage.content,
            timestamp: new Date().toLocaleString('en-US', { 
                month: '2-digit', 
                day: '2-digit', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            }).replace(',', ''),
            read: false
        };
        
        setMessages([message, ...messages]);
        setShowMessageModal(false);
        setNewMessage({
            recipient: '',
            content: ''
        });
        alert('Message sent successfully!');
    };

    const unreadMessages = messages.filter(msg => !msg.read).length;

    return (
        <div className="space-y-6">
            <Card title="Communication" icon="fa-solid fa-bullhorn">
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-medium">School Communications</h3>
                        <p className="text-gray-600 text-sm">Manage announcements and messages</p>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={() => setShowMessageModal(true)}>
                            <i className="fa-solid fa-message mr-2"></i> Send Message
                        </Button>
                        <Button onClick={() => setShowAnnouncementModal(true)}>
                            <i className="fa-solid fa-bullhorn mr-2"></i> New Announcement
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Announcements */}
                    <div className="lg:col-span-2">
                        <Card title="Recent Announcements">
                            <div className="space-y-4">
                                {announcements.map((announcement) => (
                                    <div key={announcement.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-gray-900">{announcement.title}</h4>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                                                {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                                            <span>By {announcement.author}</span>
                                            <span>{announcement.date}</span>
                                        </div>
                                        <p className="text-gray-700 mt-3">{announcement.content}</p>
                                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                                            <span className="text-xs text-gray-500">To: {announcement.recipients}</span>
                                            <div className="flex space-x-2">
                                                <Button variant="secondary" size="sm">
                                                    <i className="fa-solid fa-share-nodes mr-1"></i> Share
                                                </Button>
                                                <Button variant="secondary" size="sm">
                                                    <i className="fa-solid fa-edit mr-1"></i> Edit
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Messages and Quick Actions */}
                    <div>
                        <Card title="Messages">
                            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                                <div className="flex justify-between">
                                    <span className="text-blue-800 font-medium">Unread Messages</span>
                                    <span className="bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
                                        {unreadMessages}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                {messages.map((message) => (
                                    <div 
                                        key={message.id} 
                                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                                            message.read 
                                                ? 'border-gray-200 bg-gray-50' 
                                                : 'border-blue-200 bg-blue-50'
                                        }`}
                                    >
                                        <div className="flex justify-between">
                                            <span className="font-medium text-sm">{message.sender}</span>
                                            <span className="text-xs text-gray-500">{message.timestamp.split(' ')[0]}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1 truncate">{message.content}</p>
                                        <div className="text-xs text-gray-400 mt-1">To: {message.recipient}</div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <Button variant="secondary" className="w-full">
                                    <i className="fa-solid fa-inbox mr-2"></i> View All Messages
                                </Button>
                            </div>
                        </Card>

                        <Card title="Quick Actions" className="mt-6">
                            <div className="grid grid-cols-1 gap-3">
                                <button className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors">
                                    <i className="fa-solid fa-calendar-days text-blue-500 text-xl mr-3"></i>
                                    <div className="text-left">
                                        <div className="font-medium">Class Notices</div>
                                        <div className="text-xs text-gray-500">Send to specific classes</div>
                                    </div>
                                </button>
                                <button className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors">
                                    <i className="fa-solid fa-user-group text-green-500 text-xl mr-3"></i>
                                    <div className="text-left">
                                        <div className="font-medium">Parent Messages</div>
                                        <div className="text-xs text-gray-500">Communicate with parents</div>
                                    </div>
                                </button>
                                <button className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors">
                                    <i className="fa-solid fa-file-lines text-purple-500 text-xl mr-3"></i>
                                    <div className="text-left">
                                        <div className="font-medium">Report Distribution</div>
                                        <div className="text-xs text-gray-500">Share reports with parents</div>
                                    </div>
                                </button>
                            </div>
                        </Card>
                    </div>
                </div>
            </Card>

            {/* Create Announcement Modal */}
            {showAnnouncementModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">Create Announcement</h3>
                                <button 
                                    onClick={() => setShowAnnouncementModal(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={newAnnouncement.title}
                                        onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        placeholder="Enter announcement title"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                                    <textarea
                                        value={newAnnouncement.content}
                                        onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        placeholder="Enter announcement content"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
                                        <select
                                            value={newAnnouncement.recipients}
                                            onChange={(e) => setNewAnnouncement({...newAnnouncement, recipients: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        >
                                            <option>All</option>
                                            <option>All Parents</option>
                                            <option>All Students</option>
                                            <option>10th Grade Parents</option>
                                            <option>10th Grade Students</option>
                                            <option>Physics Department</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                        <select
                                            value={newAnnouncement.priority}
                                            onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value as any})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end space-x-3">
                                <Button variant="secondary" onClick={() => setShowAnnouncementModal(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleCreateAnnouncement}>
                                    Post Announcement
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Send Message Modal */}
            {showMessageModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">Send Message</h3>
                                <button 
                                    onClick={() => setShowMessageModal(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                                    <input
                                        type="text"
                                        value={newMessage.recipient}
                                        onChange={(e) => setNewMessage({...newMessage, recipient: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        placeholder="Enter recipient name or group"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        value={newMessage.content}
                                        onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        placeholder="Type your message here..."
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end space-x-3">
                                <Button variant="secondary" onClick={() => setShowMessageModal(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSendMessage}>
                                    Send Message
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherCommunication;