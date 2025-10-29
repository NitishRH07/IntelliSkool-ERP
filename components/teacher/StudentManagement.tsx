import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Student {
  id: string;
  name: string;
  grade: string;
  attendance: number;
  lastTestScore: number;
  performanceTrend: 'up' | 'down' | 'stable';
}

const StudentManagement = () => {
  const [students] = useState<Student[]>([
    {
      id: 'S001',
      name: 'Alice Johnson',
      grade: '10th',
      attendance: 95,
      lastTestScore: 87,
      performanceTrend: 'up'
    },
    {
      id: 'S002',
      name: 'Bob Smith',
      grade: '10th',
      attendance: 82,
      lastTestScore: 76,
      performanceTrend: 'stable'
    },
    {
      id: 'S003',
      name: 'Charlie Brown',
      grade: '10th',
      attendance: 78,
      lastTestScore: 65,
      performanceTrend: 'down'
    },
    {
      id: 'S004',
      name: 'Diana Miller',
      grade: '10th',
      attendance: 92,
      lastTestScore: 91,
      performanceTrend: 'up'
    },
    {
      id: 'S005',
      name: 'Edward Davis',
      grade: '10th',
      attendance: 88,
      lastTestScore: 82,
      performanceTrend: 'stable'
    }
  ]);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.includes(searchTerm)
  );

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleCloseDetails = () => {
    setSelectedStudent(null);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return 'fa-arrow-trend-up text-green-500';
      case 'down': return 'fa-arrow-trend-down text-red-500';
      case 'stable': return 'fa-minus text-gray-500';
      default: return 'fa-minus text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card title="Student Management" icon="fa-solid fa-users">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search students by name or ID..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
            </div>
            <Button>
              <i className="fa-solid fa-plus mr-2"></i> Add Student
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Test</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.grade}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.attendance > 90 ? 'bg-green-100 text-green-800' :
                      student.attendance > 80 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {student.attendance}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.lastTestScore}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <i className={`fa-solid ${getTrendIcon(student.performanceTrend)}`}></i>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(student)}
                      className="text-primary hover:text-primary-dark"
                    >
                      View Details
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

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold text-gray-900">{selectedStudent.name}</h3>
                <button
                  onClick={handleCloseDetails}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <i className="fa-solid fa-xmark text-2xl"></i>
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Student Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Student ID:</span>
                      <span className="font-medium">{selectedStudent.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Grade:</span>
                      <span className="font-medium">{selectedStudent.grade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Attendance:</span>
                      <span className="font-medium">{selectedStudent.attendance}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Academic Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Test Score:</span>
                      <span className="font-medium">{selectedStudent.lastTestScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Performance Trend:</span>
                      <span className="font-medium">
                        <i className={`fa-solid ${getTrendIcon(selectedStudent.performanceTrend)} mr-2`}></i>
                        {selectedStudent.performanceTrend.charAt(0).toUpperCase() + selectedStudent.performanceTrend.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
                <div className="border border-gray-200 rounded-lg p-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <i className="fa-solid fa-circle-check text-green-500 mt-1 mr-3"></i>
                      <div>
                        <p className="text-gray-900">Submitted Physics assignment on time</p>
                        <p className="text-sm text-gray-500">2 days ago</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <i className="fa-solid fa-exclamation-circle text-yellow-500 mt-1 mr-3"></i>
                      <div>
                        <p className="text-gray-900">Absent from class</p>
                        <p className="text-sm text-gray-500">1 week ago</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <i className="fa-solid fa-medal text-blue-500 mt-1 mr-3"></i>
                      <div>
                        <p className="text-gray-900">Scored 95% in Mathematics quiz</p>
                        <p className="text-sm text-gray-500">2 weeks ago</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="secondary">
                  <i className="fa-solid fa-message mr-2"></i> Message Parent
                </Button>
                <Button>
                  <i className="fa-solid fa-file-pen mr-2"></i> Update Records
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;