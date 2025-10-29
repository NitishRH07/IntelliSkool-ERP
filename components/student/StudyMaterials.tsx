import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  type: 'notes' | 'past-paper' | 'video' | 'presentation';
  date: string;
  fileSize?: string;
  downloads: number;
}

const StudyMaterials: React.FC = () => {
  const [materials] = useState<StudyMaterial[]>([
    {
      id: '1',
      title: 'Physics Laws of Motion Notes',
      subject: 'Physics',
      type: 'notes',
      date: '2024-03-15',
      fileSize: '2.4 MB',
      downloads: 124
    },
    {
      id: '2',
      title: 'Mathematics Past Exam Paper 2023',
      subject: 'Mathematics',
      type: 'past-paper',
      date: '2024-03-10',
      fileSize: '1.8 MB',
      downloads: 89
    },
    {
      id: '3',
      title: 'Chemistry Organic Reactions Video',
      subject: 'Chemistry',
      type: 'video',
      date: '2024-03-05',
      downloads: 156
    },
    {
      id: '4',
      title: 'Biology Cell Structure Presentation',
      subject: 'Biology',
      type: 'presentation',
      date: '2024-02-28',
      fileSize: '4.2 MB',
      downloads: 76
    },
    {
      id: '5',
      title: 'English Literature Past Paper 2022',
      subject: 'English',
      type: 'past-paper',
      date: '2024-02-20',
      fileSize: '1.5 MB',
      downloads: 98
    }
  ]);

  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const subjects = ['All', 'Physics', 'Mathematics', 'Chemistry', 'Biology', 'English'];

  const filteredMaterials = materials.filter(material => {
    const subjectMatch = selectedSubject === 'All' || material.subject === selectedSubject;
    const searchMatch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       material.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return subjectMatch && searchMatch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'notes': return 'fa-solid fa-file-lines';
      case 'past-paper': return 'fa-solid fa-file-pdf';
      case 'video': return 'fa-solid fa-video';
      case 'presentation': return 'fa-solid fa-chalkboard-user';
      default: return 'fa-solid fa-file';
    }
  };

  const handleDownload = (id: string) => {
    // In a real app, this would trigger a download
    console.log(`Downloading material ${id}`);
    // Update download count
    // setMaterials(prev => prev.map(material => 
    //   material.id === id ? {...material, downloads: material.downloads + 1} : material
    // ));
  };

  return (
    <div className="space-y-6">
      <Card title="Study Materials & Past Papers" icon="fa-solid fa-book">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search materials..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Filter by Subject:</span>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map(material => (
            <div key={material.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <i className={`${getTypeIcon(material.type)} text-primary text-xl`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{material.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <span className="bg-gray-100 px-2 py-1 rounded mr-2">{material.subject}</span>
                    <span>{material.date}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-sm text-gray-500">
                      {material.fileSize && <span>{material.fileSize} • </span>}
                      <span>{material.downloads} downloads</span>
                    </div>
                    <Button 
                      onClick={() => handleDownload(material.id)}
                      variant="secondary"
                      className="text-sm px-3 py-1"
                    >
                      <i className="fa-solid fa-download mr-1"></i> Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <i className="fa-solid fa-file-circle-question text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-medium text-gray-700">No materials found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default StudyMaterials;