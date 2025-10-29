import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Staffing: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const [staffData] = useState({
    overview: {
      totalStaff: 110,
      teaching: 65,
      nonTeaching: 45,
      male: 60,
      female: 50,
    },
    departments: [
      { department: 'Science', total: 25, teaching: 20, nonTeaching: 5 },
      { department: 'Arts', total: 20, teaching: 15, nonTeaching: 5 },
      { department: 'Commerce', total: 18, teaching: 14, nonTeaching: 4 },
      { department: 'Engineering', total: 22, teaching: 16, nonTeaching: 6 },
      { department: 'Administration', total: 25, teaching: 0, nonTeaching: 25 },
    ],
    retention: [
      { year: '2019', retention: 85 },
      { year: '2020', retention: 82 },
      { year: '2021', retention: 88 },
      { year: '2022', retention: 90 },
      { year: '2023', retention: 92 },
      { year: '2024', retention: 89 },
    ],
    performance: [
      { department: 'Science', score: 88, satisfaction: 85 },
      { department: 'Arts', score: 82, satisfaction: 80 },
      { department: 'Commerce', score: 91, satisfaction: 88 },
      { department: 'Engineering', score: 78, satisfaction: 75 },
      { department: 'Administration', score: 85, satisfaction: 82 },
    ],
    recruitment: [
      { month: 'Jan', openings: 3, hired: 2 },
      { month: 'Feb', openings: 2, hired: 1 },
      { month: 'Mar', openings: 5, hired: 4 },
      { month: 'Apr', openings: 4, hired: 3 },
      { month: 'May', openings: 6, hired: 5 },
      { month: 'Jun', openings: 3, hired: 2 },
    ]
  });

  const [timeRange, setTimeRange] = useState('1year');
  const [activeTab, setActiveTab] = useState('overview');

  const COLORS = ['#4f46e5', '#f97316', '#10b981', '#8b5cf6', '#ec4899'];

  const handleGenerateReport = () => {
    alert('Staffing report generated and sent to your email');
  };

  const handleExportData = () => {
    alert('Staffing data exported successfully');
  };

  const handleAnalyzeEfficiency = () => {
    alert('AI staff efficiency analysis in progress. This may take a few moments...');
  };

  return (
    <div className="space-y-6">
      <Card title="Staff Management" icon="fa-solid fa-users-cog">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Workforce Analytics & Management</h3>
            <p className="text-gray-600 text-sm">Monitor staffing metrics and optimize workforce</p>
          </div>
          <div className="flex space-x-2">
            <select
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last 1 Year</option>
              <option value="2years">Last 2 Years</option>
              <option value="5years">Last 5 Years</option>
            </select>
            <Button onClick={handleAnalyzeEfficiency}>
              <i className="fa-solid fa-brain mr-2"></i> AI Analysis
            </Button>
            <Button onClick={handleGenerateReport}>
              <i className="fa-solid fa-file-pdf mr-2"></i> Generate Report
            </Button>
            <Button variant="secondary" onClick={handleExportData}>
              <i className="fa-solid fa-download mr-2"></i> Export Data
            </Button>
          </div>
        </div>

        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Staff Overview
            </button>
            <button
              onClick={() => setActiveTab('departments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'departments'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Department Analysis
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'performance'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Performance Metrics
            </button>
            <button
              onClick={() => setActiveTab('recruitment')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'recruitment'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Recruitment
            </button>
          </nav>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-users text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Staff</p>
                    <p className="text-xl font-bold text-gray-900">{staffData.overview.totalStaff}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-chalkboard-user text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Teaching Staff</p>
                    <p className="text-xl font-bold text-gray-900">{staffData.overview.teaching}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-briefcase text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Non-Teaching</p>
                    <p className="text-xl font-bold text-gray-900">{staffData.overview.nonTeaching}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-cyan-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-mars text-cyan-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Male Staff</p>
                    <p className="text-xl font-bold text-gray-900">{staffData.overview.male}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-pink-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-venus text-pink-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Female Staff</p>
                    <p className="text-xl font-bold text-gray-900">{staffData.overview.female}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Department-wise Staff Distribution">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={staffData.departments}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="teaching" name="Teaching" fill="#4f46e5" />
                      <Bar dataKey="nonTeaching" name="Non-Teaching" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card title="Staff Retention Trend">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={staffData.retention}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis domain={[75, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="retention" 
                        stroke="#10b981" 
                        name="Retention Rate (%)" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-robot text-blue-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-blue-800">AI Staffing Insights</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    The AI analysis shows a healthy staff retention rate of 89% for 2024, which is above the industry 
                    benchmark of 85%. The teaching to non-teaching staff ratio is 59:41, which is optimal for our 
                    institution size. The Science and Commerce departments are well-staffed, while the Engineering 
                    department has a slightly higher workload per staff member. Recommendation: Consider hiring 2 
                    additional staff for the Engineering department to balance the workload.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="space-y-6">
            <Card title="Department Staffing Analysis">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Staff</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teaching</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Non-Teaching</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student-Staff Ratio</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {staffData.departments.map((dept, index) => {
                      const studentCount = dept.department === 'Science' ? 320 : 
                                          dept.department === 'Arts' ? 250 : 
                                          dept.department === 'Commerce' ? 180 : 
                                          dept.department === 'Engineering' ? 280 : 0;
                      const studentStaffRatio = dept.teaching > 0 ? Math.round(studentCount / dept.teaching) : 0;
                      
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.department}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.total}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.teaching}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.nonTeaching}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {studentStaffRatio > 0 ? `${studentStaffRatio}:1` : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              studentStaffRatio <= 15 ? 'bg-green-100 text-green-800' : 
                              studentStaffRatio <= 20 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {studentStaffRatio <= 15 ? 'Optimal' : 
                               studentStaffRatio <= 20 ? 'Acceptable' : 'Needs Attention'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Teaching vs Non-Teaching Distribution">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Teaching', value: staffData.overview.teaching },
                          { name: 'Non-Teaching', value: staffData.overview.nonTeaching }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell key="cell-0" fill="#4f46e5" />
                        <Cell key="cell-1" fill="#f97316" />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card title="Gender Distribution by Department">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={staffData.departments.map(dept => ({
                      department: dept.department,
                      male: Math.round(dept.total * 0.55), // Assuming 55% male on average
                      female: Math.round(dept.total * 0.45) // Assuming 45% female on average
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="male" name="Male" fill="#3b82f6" />
                      <Bar dataKey="female" name="Female" fill="#ec4899" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            <Card title="Department Performance & Satisfaction">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={staffData.performance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis domain={[70, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" name="Performance Score" fill="#4f46e5" />
                    <Bar dataKey="satisfaction" name="Staff Satisfaction" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Performance Metrics">
                <div className="space-y-4">
                  {staffData.performance.map((dept, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-32 text-sm font-medium text-gray-700">{dept.department}</div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full bg-blue-500" 
                              style={{ width: `${dept.score}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            {dept.score}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Satisfaction Metrics">
                <div className="space-y-4">
                  {staffData.performance.map((dept, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-32 text-sm font-medium text-gray-700">{dept.department}</div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full bg-green-500" 
                              style={{ width: `${dept.satisfaction}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            {dept.satisfaction}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-exclamation-triangle text-yellow-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-yellow-800">Performance Insights</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    The Engineering department shows lower performance (78%) and satisfaction (75%) scores compared 
                    to other departments. This correlates with the higher student-staff ratio identified earlier. 
                    The Commerce department is performing exceptionally well with 91% performance and 88% satisfaction. 
                    Recommendation: Conduct a detailed review of the Engineering department's challenges and 
                    implement targeted interventions to improve both metrics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recruitment' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-door-open text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Open Positions</p>
                    <p className="text-xl font-bold text-gray-900">12</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-user-check text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hired This Year</p>
                    <p className="text-xl font-bold text-gray-900">17</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-percent text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hiring Rate</p>
                    <p className="text-xl font-bold text-gray-900">72%</p>
                  </div>
                </div>
              </div>
            </div>

            <Card title="Recruitment Trend">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={staffData.recruitment}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="openings" name="Open Positions" fill="#4f46e5" />
                    <Bar dataKey="hired" name="Hired" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Recruitment Pipeline">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { position: 'Mathematics Teacher', department: 'Science', posted: '2024-06-01', applications: 12, status: 'In Review' },
                      { position: 'Lab Assistant', department: 'Science', posted: '2024-05-28', applications: 8, status: 'Interview Scheduled' },
                      { position: 'Accounts Officer', department: 'Administration', posted: '2024-05-25', applications: 15, status: 'Shortlisted' },
                      { position: 'Counselor', department: 'Administration', posted: '2024-05-20', applications: 6, status: 'Offer Extended' },
                      { position: 'IT Specialist', department: 'Administration', posted: '2024-05-15', applications: 9, status: 'Hired' },
                    ].map((job, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.position}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.posted}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.applications}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            job.status === 'Hired' ? 'bg-green-100 text-green-800' : 
                            job.status === 'Offer Extended' ? 'bg-blue-100 text-blue-800' : 
                            job.status === 'Interview Scheduled' ? 'bg-purple-100 text-purple-800' : 
                            job.status === 'Shortlisted' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary hover:text-primary-dark mr-3">
                            <i className="fa-solid fa-eye mr-1"></i> View
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            <i className="fa-solid fa-edit mr-1"></i> Edit
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
      </Card>
    </div>
  );
};

export default Staffing;