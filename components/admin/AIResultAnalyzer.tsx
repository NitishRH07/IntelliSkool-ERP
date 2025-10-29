import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AIResultAnalyzer: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const [resultData] = useState({
    departmentPerformance: [
      { department: 'Science', avgScore: 82, students: 320, teachers: 8, trend: 'up' },
      { department: 'Mathematics', avgScore: 75, students: 280, teachers: 6, trend: 'down' },
      { department: 'Humanities', avgScore: 78, students: 250, teachers: 5, trend: 'stable' },
      { department: 'Commerce', avgScore: 85, students: 180, teachers: 4, trend: 'up' },
      { department: 'Arts', avgScore: 80, students: 150, teachers: 4, trend: 'stable' },
    ],
    teacherPerformance: [
      { id: 'T001', name: 'Dr. Sarah Johnson', subject: 'Physics', avgScore: 88, classes: 4, trend: 'up' },
      { id: 'T002', name: 'Prof. Michael Chen', subject: 'Mathematics', avgScore: 72, classes: 5, trend: 'down' },
      { id: 'T003', name: 'Dr. Emily Wilson', subject: 'Chemistry', avgScore: 85, classes: 3, trend: 'stable' },
      { id: 'T004', name: 'Ms. Jessica Brown', subject: 'English', avgScore: 81, classes: 4, trend: 'up' },
      { id: 'T005', name: 'Dr. Robert Davis', subject: 'Biology', avgScore: 87, classes: 2, trend: 'up' },
    ],
    gradeDistribution: [
      { grade: 'A', count: 85 },
      { grade: 'B', count: 142 },
      { grade: 'C', count: 98 },
      { grade: 'D', count: 32 },
      { grade: 'F', count: 8 },
    ],
    performanceTrends: [
      { term: '2022-Q1', overall: 75, science: 78, math: 72, humanities: 76 },
      { term: '2022-Q2', overall: 77, science: 80, math: 74, humanities: 77 },
      { term: '2022-Q3', overall: 79, science: 82, math: 75, humanities: 79 },
      { term: '2022-Q4', overall: 81, science: 84, math: 77, humanities: 81 },
      { term: '2023-Q1', overall: 82, science: 85, math: 78, humanities: 82 },
    ],
    insights: [
      { id: 'I001', type: 'Positive Trend', description: 'Overall performance has improved by 9% over the last year', severity: 'high' },
      { id: 'I002', type: 'Concern', description: 'Mathematics department showing consistent decline in scores', severity: 'high' },
      { id: 'I003', type: 'Opportunity', description: 'Commerce department outperforming others with 85% average', severity: 'medium' },
      { id: 'I004', type: 'Recommendation', description: 'Consider additional support for Mathematics teachers', severity: 'medium' },
    ]
  });

  const [timeRange, setTimeRange] = useState('1year');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [activeTab, setActiveTab] = useState('overview');

  const COLORS = ['#4f46e5', '#f97316', '#10b981', '#8b5cf6', '#ec4899'];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return 'fa-arrow-trend-up text-green-500';
      case 'down': return 'fa-arrow-trend-down text-red-500';
      case 'stable': return 'fa-minus text-gray-500';
      default: return 'fa-minus text-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGenerateReport = () => {
    alert('Detailed performance report generated and sent to your email');
  };

  const handleExportData = () => {
    alert('Performance data exported successfully');
  };

  return (
    <div className="space-y-6">
      <Card title="AI Result Analyzer" icon="fa-solid fa-chart-pie">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Department & Teacher Performance Analysis</h3>
            <p className="text-gray-600 text-sm">AI-powered insights on academic performance trends</p>
          </div>
          <div className="flex space-x-2">
            <select
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="1quarter">Last Quarter</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last 1 Year</option>
              <option value="2years">Last 2 Years</option>
            </select>
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
              Performance Overview
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
              onClick={() => setActiveTab('teachers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'teachers'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Teacher Performance
            </button>
          </nav>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-graduation-cap text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Overall Average</p>
                    <p className="text-2xl font-bold text-gray-900">81.2%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-arrow-trend-up text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Improvement</p>
                    <p className="text-2xl font-bold text-gray-900">+8.7%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-building text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Top Department</p>
                    <p className="text-2xl font-bold text-gray-900">Commerce</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-triangle-exclamation text-orange-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Area of Concern</p>
                    <p className="text-2xl font-bold text-gray-900">Mathematics</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Performance Trends">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={resultData.performanceTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="term" />
                      <YAxis domain={[70, 90]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="overall" stroke="#4f46e5" name="Overall" strokeWidth={2} />
                      <Line type="monotone" dataKey="science" stroke="#f97316" name="Science" strokeWidth={2} />
                      <Line type="monotone" dataKey="math" stroke="#10b981" name="Mathematics" strokeWidth={2} />
                      <Line type="monotone" dataKey="humanities" stroke="#8b5cf6" name="Humanities" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card title="Grade Distribution">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={resultData.gradeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="grade"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {resultData.gradeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <Card title="Key Insights">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resultData.insights.map((insight) => (
                  <div key={insight.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900">{insight.type}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(insight.severity)}`}>
                        {insight.severity.charAt(0).toUpperCase() + insight.severity.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{insight.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="space-y-6">
            <Card title="Department Performance Comparison">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Score</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teachers</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {resultData.departmentPerformance.map((dept) => (
                      <tr key={dept.department} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.avgScore}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.students}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.teachers}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <i className={`fa-solid ${getTrendIcon(dept.trend)} mr-2`}></i>
                          {dept.trend.charAt(0).toUpperCase() + dept.trend.slice(1)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary hover:text-primary-dark">
                            <i className="fa-solid fa-chart-line mr-1"></i> Analyze
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Department Performance Visualization">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={resultData.departmentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis domain={[70, 90]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="avgScore" name="Average Score" fill="#4f46e5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card title="Student-Teacher Ratio">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={resultData.departmentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="students" name="Students" fill="#f97316" />
                      <Bar dataKey="teachers" name="Teachers" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'teachers' && (
          <div className="space-y-6">
            <Card title="Teacher Performance Analysis">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Score</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classes</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {resultData.teacherPerformance.map((teacher) => (
                      <tr key={teacher.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                          <div className="text-sm text-gray-500">ID: {teacher.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.avgScore}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.classes}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <i className={`fa-solid ${getTrendIcon(teacher.trend)} mr-2`}></i>
                          {teacher.trend.charAt(0).toUpperCase() + teacher.trend.slice(1)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary hover:text-primary-dark mr-3">
                            <i className="fa-solid fa-eye mr-1"></i> View
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            <i className="fa-solid fa-comment-dots mr-1"></i> Feedback
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-robot text-blue-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-blue-800">AI Teacher Performance Insights</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    The AI analysis shows that Dr. Sarah Johnson and Dr. Robert Davis are top performers with consistent 
                    upward trends in student scores. Prof. Michael Chen's Mathematics classes show a concerning decline 
                    that requires immediate attention. Recommendation: Implement peer mentoring where top performers 
                    support those with declining trends, and consider additional professional development for Mathematics teachers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AIResultAnalyzer;