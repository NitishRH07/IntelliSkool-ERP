import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AIStaffLoadBalancer: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const [staffData] = useState({
    teachers: [
      { id: 'T001', name: 'Dr. Sarah Johnson', subject: 'Physics', classes: 4, students: 140, workload: 85, recommendation: 'Optimal' },
      { id: 'T002', name: 'Prof. Michael Chen', subject: 'Mathematics', classes: 5, students: 175, workload: 95, recommendation: 'Reduce by 1 class' },
      { id: 'T003', name: 'Dr. Emily Wilson', subject: 'Chemistry', classes: 3, students: 105, workload: 65, recommendation: 'Optimal' },
      { id: 'T004', name: 'Ms. Jessica Brown', subject: 'English', classes: 4, students: 120, workload: 75, recommendation: 'Optimal' },
      { id: 'T005', name: 'Dr. Robert Davis', subject: 'Biology', classes: 2, students: 70, workload: 45, recommendation: 'Add 1-2 classes' },
      { id: 'T006', name: 'Mr. William Taylor', subject: 'History', classes: 6, students: 210, workload: 110, recommendation: 'Reduce by 2 classes' },
    ],
    workloadDistribution: [
      { range: '0-30%', count: 1 },
      { range: '31-60%', count: 2 },
      { range: '61-90%', count: 2 },
      { range: '91-100%', count: 1 },
      { range: '100%+', count: 1 },
    ],
    recommendations: [
      { id: 'R001', type: 'Class Redistribution', description: 'Move 1 Physics class from Prof. Chen to Dr. Davis', impact: 'Balances workload between both teachers' },
      { id: 'R002', type: 'Teaching Assistant', description: 'Assign TA to Mr. Taylor to reduce direct student load', impact: 'Reduces workload by approximately 20%' },
      { id: 'R003', type: 'Curriculum Adjustment', description: 'Consider splitting large History classes into smaller groups', impact: 'Improves student engagement and reduces teacher load' },
    ]
  });

  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [viewMode, setViewMode] = useState('overview');

  const getWorkloadColor = (workload: number) => {
    if (workload <= 70) return 'bg-green-100 text-green-800';
    if (workload <= 90) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const handleOptimize = () => {
    alert('AI optimization in progress. This may take a few moments...');
    // In a real app, this would trigger the AI optimization algorithm
  };

  const handleViewDetails = (teacher: any) => {
    setSelectedTeacher(teacher);
  };

  return (
    <div className="space-y-6">
      <Card title="AI Staff Load Balancer" icon="fa-solid fa-balance-scale">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Workload Optimization System</h3>
            <p className="text-gray-600 text-sm">AI-powered staff allocation and workload balancing</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleOptimize}>
              <i className="fa-solid fa-brain mr-2"></i> Run AI Optimization
            </Button>
            <Button variant="secondary">
              <i className="fa-solid fa-file-export mr-2"></i> Export Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <i className="fa-solid fa-chalkboard-user text-blue-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Teachers</p>
                <p className="text-2xl font-bold text-gray-900">{staffData.teachers.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-lg p-5">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <i className="fa-solid fa-users text-green-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {staffData.teachers.reduce((sum, teacher) => sum + teacher.students, 0)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-lg p-5">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <i className="fa-solid fa-book text-purple-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Classes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {staffData.teachers.reduce((sum, teacher) => sum + teacher.classes, 0)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 rounded-lg p-5">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg mr-4">
                <i className="fa-solid fa-exclamation-triangle text-orange-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Overloaded Teachers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {staffData.teachers.filter(t => t.workload > 90).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card title="Teacher Workload Overview">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classes</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workload</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommendation</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {staffData.teachers.map((teacher) => (
                      <tr key={teacher.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.classes}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.students}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  teacher.workload <= 70 ? 'bg-green-500' : 
                                  teacher.workload <= 90 ? 'bg-yellow-500' : 'bg-red-500'
                                }`} 
                                style={{ width: `${Math.min(100, teacher.workload)}%` }}
                              ></div>
                            </div>
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getWorkloadColor(teacher.workload)}`}>
                              {teacher.workload}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.recommendation}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => handleViewDetails(teacher)}
                            className="text-primary hover:text-primary-dark"
                          >
                            <i className="fa-solid fa-eye mr-1"></i> Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card title="Workload Distribution">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={staffData.workloadDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Number of Teachers" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="AI Recommendations">
              <div className="space-y-4">
                {staffData.recommendations.map((rec) => (
                  <div key={rec.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-gray-900">{rec.type}</h4>
                    <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                    <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                      {rec.impact}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
          <div className="flex">
            <i className="fa-solid fa-robot text-blue-500 text-xl mr-3 mt-1"></i>
            <div>
              <h4 className="font-medium text-blue-800">AI Optimization Summary</h4>
              <p className="text-sm text-blue-700 mt-1">
                The AI analysis shows that 2 teachers are overloaded (workload {'>'} 90%) and 1 teacher is underutilized (workload {'<'} 50%). 
                The recommended actions include redistributing classes from overloaded teachers to underutilized ones and assigning 
                teaching assistants to extremely overloaded teachers. Implementation of these recommendations would balance the 
                workload distribution and improve overall staff satisfaction.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Teacher Detail Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Teacher Workload Details</h3>
                <button
                  onClick={() => setSelectedTeacher(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <i className="fa-solid fa-xmark text-2xl"></i>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Teacher Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{selectedTeacher.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subject:</span>
                      <span className="font-medium">{selectedTeacher.subject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Workload:</span>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getWorkloadColor(selectedTeacher.workload)}`}>
                        {selectedTeacher.workload}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Current Allocation</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Classes:</span>
                      <span className="font-medium">{selectedTeacher.classes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Students:</span>
                      <span className="font-medium">{selectedTeacher.students}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Class Size:</span>
                      <span className="font-medium">{Math.round(selectedTeacher.students / selectedTeacher.classes)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">AI Recommendations for {selectedTeacher.name}</h4>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <ul className="list-disc list-inside space-y-2 text-sm text-blue-800">
                    <li>{selectedTeacher.recommendation}</li>
                    {selectedTeacher.workload > 90 && (
                      <>
                        <li>Consider reducing class hours by 20% to balance workload</li>
                        <li>Assign a teaching assistant to help with grading and student support</li>
                      </>
                    )}
                    {selectedTeacher.workload < 50 && (
                      <>
                        <li>Consider adding 1-2 additional classes to optimize utilization</li>
                        <li>Explore opportunities for professional development or mentoring roles</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="secondary" onClick={() => setSelectedTeacher(null)}>
                  Close
                </Button>
                <Button>
                  <i className="fa-solid fa-save mr-2"></i> Apply Recommendations
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIStaffLoadBalancer;