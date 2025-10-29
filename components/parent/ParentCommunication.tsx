import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Message {
    id: string;
    sender: string;
    senderRole: string;
    content: string;
    timestamp: string;
    read: boolean;
}

const ParentCommunication: React.FC = () => {
    // Mock data - in a real app, this would come from an API
    const [messages, setMessages] = useState<Message[]>([
        { id: 'M001', sender: 'Mr. Johnson', senderRole: 'Physics Teacher', content: 'Your child has shown excellent improvement in the recent physics test. Keep up the good work!', timestamp: '2024-03-15 14:30', read: true },
        { id: 'M002', sender: 'Mrs. Smith', senderRole: 'Class Teacher', content: 'Please ensure Alex completes the science project by Friday. Materials list has been shared.', timestamp: '2024-03-14 11:15', read: true },
        { id: 'M003', sender: 'Dr. Williams', senderRole: 'Principal', content: 'Parent-teacher meeting scheduled for March 20th. Please confirm your availability.', timestamp: '2024-03-12 09:45', read: false },
    ]);

    const [newMessage, setNewMessage] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('Mr. Johnson (Physics Teacher)');

    const teachers = [
        'Mr. Johnson (Physics Teacher)',
        'Mrs. Smith (Class Teacher)',
        'Dr. Williams (Principal)',
        'Ms. Davis (Mathematics Teacher)',
        'Mr. Brown (Chemistry Teacher)',
    ];

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        
        const [teacherName, teacherRole] = selectedTeacher.split(' (');
        
        const message: Message = {
            id: `M${String(messages.length + 1).padStart(3, '0')}`,
            sender: 'You (Parent)',
            senderRole: 'Parent',
            content: newMessage,
            timestamp: new Date().toLocaleString('en-US', { 
                month: '2-digit', 
                day: '2-digit', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            }).replace(',', ''),
            read: true
        };
        
        setMessages([message, ...messages]);
        setNewMessage('');
    };

    const unreadCount = messages.filter(msg => !msg.read).length;

    return (
        <div className="space-y-6">
            <Card title="Communication" icon="fa-solid fa-comments">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Message List */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <h3 className="font-medium mb-2">Unread Messages</h3>
                            <div className="text-2xl font-bold text-primary">{unreadCount}</div>
                            <div className="text-sm text-gray-600">messages</div>
                        </div>
                        
                        <Card title="Teachers">
                            <div className="space-y-2">
                                {teachers.map((teacher, index) => (
                                    <div 
                                        key={index}
                                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                            selectedTeacher === teacher 
                                                ? 'bg-primary text-white' 
                                                : 'hover:bg-gray-100'
                                        }`}
                                        onClick={() => setSelectedTeacher(teacher)}
                                    >
                                        <div className="font-medium">{teacher.split(' (')[0]}</div>
                                        <div className="text-sm opacity-80">{teacher.split(' (')[1].replace(')', '')}</div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                    
                    {/* Message Thread */}
                    <div className="lg:col-span-2 flex flex-col">
                        <Card title={`Chat with ${selectedTeacher.split(' (')[0]}`} className="flex-1 flex flex-col">
                            <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-96">
                                {messages.map((message) => (
                                    <div 
                                        key={message.id}
                                        className={`p-4 rounded-lg ${
                                            message.sender.includes('You') 
                                                ? 'bg-primary text-white ml-10' 
                                                : 'bg-gray-100 mr-10'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="font-medium">{message.sender}</div>
                                            <div className={`text-xs ${message.sender.includes('You') ? 'text-primary-light' : 'text-gray-500'}`}>
                                                {message.timestamp}
                                            </div>
                                        </div>
                                        <div className="text-sm mb-2">{message.senderRole}</div>
                                        <div className={`${message.sender.includes('You') ? 'text-white' : 'text-gray-700'}`}>
                                            {message.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="border-t pt-4">
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    />
                                    <Button onClick={handleSendMessage}>
                                        <i className="fa-solid fa-paper-plane"></i>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="border border-gray-200 rounded-lg p-4 text-center">
                                <i className="fa-solid fa-bullhorn text-2xl text-blue-500 mb-2"></i>
                                <div className="font-medium">Announcements</div>
                                <div className="text-sm text-gray-500">View all</div>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4 text-center">
                                <i className="fa-solid fa-calendar-days text-2xl text-green-500 mb-2"></i>
                                <div className="font-medium">Meetings</div>
                                <div className="text-sm text-gray-500">Schedule</div>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4 text-center">
                                <i className="fa-solid fa-file-lines text-2xl text-purple-500 mb-2"></i>
                                <div className="font-medium">Documents</div>
                                <div className="text-sm text-gray-500">Download</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ParentCommunication;