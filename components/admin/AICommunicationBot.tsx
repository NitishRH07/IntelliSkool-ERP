import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface MessageTemplate {
  id: string;
  name: string;
  category: string;
  content: string;
  usageCount: number;
}

interface ScheduledMessage {
  id: string;
  template: string;
  recipients: string;
  scheduleDate: string;
  scheduleTime: string;
  status: 'scheduled' | 'sent' | 'failed';
}

const AICommunicationBot: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const [templates] = useState<MessageTemplate[]>([
    {
      id: 'T001',
      name: 'Fee Reminder',
      category: 'Finance',
      content: 'Dear Parent, This is a gentle reminder that the monthly fee for {student_name} is due by {due_date}. Please make the payment at your earliest convenience. Thank you.',
      usageCount: 124
    },
    {
      id: 'T002',
      name: 'Attendance Alert',
      category: 'Academic',
      content: 'Dear Parent, We noticed that {student_name} has been absent for {absent_days} days this month. Please contact the class teacher for more information.',
      usageCount: 87
    },
    {
      id: 'T003',
      name: 'Exam Schedule',
      category: 'Academic',
      content: 'Dear Parent, The {exam_name} for {student_name} is scheduled on {exam_date} from {start_time} to {end_time}. Please ensure your child is prepared and arrives on time.',
      usageCount: 156
    },
    {
      id: 'T004',
      name: 'Performance Report',
      category: 'Academic',
      content: 'Dear Parent, {student_name} has shown excellent performance in {subject} with a score of {score}%. Keep up the good work!',
      usageCount: 92
    },
    {
      id: 'T005',
      name: 'Event Invitation',
      category: 'Events',
      content: 'Dear Parent, You are cordially invited to {event_name} on {event_date} at {event_time} in {location}. We look forward to your participation.',
      usageCount: 68
    }
  ]);

  const [scheduledMessages, setScheduledMessages] = useState<ScheduledMessage[]>([
    {
      id: 'S001',
      template: 'Fee Reminder',
      recipients: 'All Parents (Overdue Fees)',
      scheduleDate: '2024-03-20',
      scheduleTime: '09:00',
      status: 'scheduled'
    },
    {
      id: 'S002',
      template: 'Exam Schedule',
      recipients: '10th Grade Parents',
      scheduleDate: '2024-03-22',
      scheduleTime: '14:00',
      status: 'scheduled'
    },
    {
      id: 'S003',
      template: 'Attendance Alert',
      recipients: 'Students with <75% Attendance',
      scheduleDate: '2024-03-18',
      scheduleTime: '11:00',
      status: 'sent'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: 'Academic',
    content: ''
  });

  const [activeTab, setActiveTab] = useState('templates');

  const categories = ['Academic', 'Finance', 'Events', 'General'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'sent': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateTemplate = () => {
    // In a real app, this would save to an API
    alert(`Template "${newTemplate.name}" created successfully!`);
    setShowCreateModal(false);
    setNewTemplate({
      name: '',
      category: 'Academic',
      content: ''
    });
  };

  const handleSendTest = (templateId: string) => {
    alert(`Test message sent for template ${templateId}`);
  };

  const handleScheduleMessage = () => {
    alert('Message scheduled successfully!');
  };

  return (
    <div className="space-y-6">
      <Card title="AI Communication Bot" icon="fa-solid fa-robot">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium">Automated Communication System</h3>
              <p className="text-gray-600 text-sm">AI-powered messaging for parents, students, and staff</p>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => setShowCreateModal(true)}>
                <i className="fa-solid fa-plus mr-2"></i> Create Template
              </Button>
              <Button variant="secondary">
                <i className="fa-solid fa-bolt mr-2"></i> Quick Send
              </Button>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'templates'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Message Templates
            </button>
            <button
              onClick={() => setActiveTab('scheduled')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'scheduled'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Scheduled Messages
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-gray-900">{template.name}</h4>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{template.content}</p>
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">Used {template.usageCount} times</span>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleSendTest(template.id)}
                        className="text-sm text-primary hover:text-primary-dark"
                      >
                        <i className="fa-solid fa-paper-plane mr-1"></i> Test
                      </button>
                      <button className="text-sm text-blue-600 hover:text-blue-900">
                        <i className="fa-solid fa-edit mr-1"></i> Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'scheduled' && (
          <div className="space-y-6">
            <Card title="Schedule New Message">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Template</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                    {templates.map(template => (
                      <option key={template.id} value={template.id}>{template.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Recipients</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                    <option>All Parents</option>
                    <option>All Students</option>
                    <option>All Teachers</option>
                    <option>Parents with Overdue Fees</option>
                    <option>Students with Low Attendance</option>
                    <option>10th Grade Parents</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Time</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button onClick={handleScheduleMessage}>
                  <i className="fa-solid fa-calendar-plus mr-2"></i> Schedule Message
                </Button>
              </div>
            </Card>

            <Card title="Scheduled Messages">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {scheduledMessages.map((message) => (
                      <tr key={message.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{message.template}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.recipients}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {message.scheduleDate} at {message.scheduleTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(message.status)}`}>
                            {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary hover:text-primary-dark mr-3">
                            <i className="fa-solid fa-edit mr-1"></i> Edit
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <i className="fa-solid fa-trash mr-1"></i> Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="text-2xl font-bold text-blue-800">1,247</div>
                <div className="text-sm text-blue-700">Messages Sent</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="text-2xl font-bold text-green-800">89.2%</div>
                <div className="text-sm text-green-700">Delivery Rate</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="text-2xl font-bold text-purple-800">76.8%</div>
                <div className="text-sm text-purple-700">Open Rate</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <div className="text-2xl font-bold text-orange-800">4.2%</div>
                <div className="text-sm text-orange-700">Response Rate</div>
              </div>
            </div>

            <Card title="Communication Trends">
              <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <i className="fa-solid fa-chart-line text-4xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500">Communication analytics chart would appear here</p>
                </div>
              </div>
            </Card>

            <Card title="Top Performing Templates">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Rate</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {templates.map((template) => (
                      <tr key={template.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{template.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{template.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{template.usageCount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${Math.min(100, template.usageCount / 2)}%` }}
                              ></div>
                            </div>
                            <span>{Math.min(100, template.usageCount / 2).toFixed(1)}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </Card>

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Create New Message Template</h3>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                  <input
                    type="text"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="e.g., Fee Reminder"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message Content</label>
                  <textarea
                    value={newTemplate.content}
                    onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="Enter your message template. Use {variable_name} for dynamic content."
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Available variables: {'{student_name}, {parent_name}, {due_date}, {exam_name}, {score}, {subject}'}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTemplate}>
                  Create Template
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AICommunicationBot;