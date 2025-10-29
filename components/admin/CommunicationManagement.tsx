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
  status: 'draft' | 'published' | 'scheduled';
}

const CommunicationManagement: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 'ANN001',
      title: 'Parent-Teacher Meeting',
      content: 'Please note that the quarterly parent-teacher meeting is scheduled for March 25th. All parents are requested to attend.',
      date: '2024-03-15',
      author: 'Dr. Williams (Principal)',
      recipients: 'All Parents',
      priority: 'high',
      status: 'published'
    },
    {
      id: 'ANN002',
      title: 'Science Exhibition',
      content: 'Our annual science exhibition will be held on April 10th. Students are encouraged to participate with their innovative projects.',
      date: '2024-03-10',
      author: 'Mr. Johnson (Physics Dept)',
      recipients: 'Students',
      priority: 'medium',
      status: 'published'
    },
    {
      id: 'ANN003',
      title: 'Library Timing Change',
      content: 'The library will be closed for maintenance from March 18th to March 20th. New timings will be notified soon.',
      date: '2024-03-12',
      author: 'Mrs. Smith (Librarian)',
      recipients: 'All',
      priority: 'low',
      status: 'published'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    recipients: 'All',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateAnnouncement = () => {
    const announcement: Announcement = {
      id: `ANN${String(announcements.length + 1).padStart(3, '0')}`,
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      date: new Date().toISOString().split('T')[0],
      author: 'Admin',
      recipients: newAnnouncement.recipients,
      priority: newAnnouncement.priority,
      status: 'published'
    };
    
    setAnnouncements([announcement, ...announcements]);
    setShowCreateModal(false);
    setNewAnnouncement({
      title: '',
      content: '',
      recipients: 'All',
      priority: 'medium'
    });
  };

  return (
    <div className="space-y-6">
      <Card title="Communication Management" icon="fa-solid fa-bullhorn">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Manage Announcements</h3>
            <p className="text-gray-600 text-sm">Create and manage institutional announcements</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            <i className="fa-solid fa-plus mr-2"></i> Create Announcement
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="text-2xl font-bold text-blue-800">{announcements.length}</div>
            <div className="text-sm text-blue-700">Total Announcements</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="text-2xl font-bold text-green-800">{announcements.filter(a => a.status === 'published').length}</div>
            <div className="text-sm text-green-700">Published</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <div className="text-2xl font-bold text-yellow-800">{announcements.filter(a => a.priority === 'high').length}</div>
            <div className="text-sm text-yellow-700">High Priority</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="text-2xl font-bold text-purple-800">
              {announcements.reduce((sum, a) => sum + (a.recipients === 'All' ? 1 : 0), 0)}
            </div>
            <div className="text-sm text-purple-700">Institution-wide</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {announcements.map((announcement) => (
                <tr key={announcement.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{announcement.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{announcement.content}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{announcement.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{announcement.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{announcement.recipients}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(announcement.status)}`}>
                      {announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primary-dark mr-3">
                      Edit
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      View
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {announcements.length === 0 && (
          <div className="text-center py-12">
            <i className="fa-solid fa-bullhorn text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-medium text-gray-700">No announcements found</h3>
            <p className="text-gray-500 mt-2">Create your first announcement to get started</p>
          </div>
        )}
      </Card>

      {/* Create Announcement Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Create New Announcement</h3>
                <button 
                  onClick={() => setShowCreateModal(false)}
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <option>All Teachers</option>
                      <option>Specific Classes</option>
                      <option>Specific Departments</option>
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
                <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAnnouncement}>
                  Publish Announcement
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationManagement;