import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AIPerformanceInsights: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const [performanceData] = useState({
    attendanceTrends: [
      { month: 'Jan', overall: 85, science: 88, math: 82, english: 85 },
      { month: 'Feb', overall: 87, science: 90, math: 84, english: 87 },
      { month: 'Mar', overall: 82, science: 85, math: 79, english: 82 },
      { month: 'Apr', overall: 89, science: 92, math: 86, english: 89 },
      { month: 'May', overall: 91, science: 94, math: 88, english: 91 },
    ],
    gradeDistribution: [
      { grade: 'A', count: 42, subject: 'Science' },
      { grade: 'B', count: 68, subject: 'Science' },
      { grade: 'C', count: 35, subject: 'Science' },
      { grade: 'D', count: 12, subject: 'Science' },
      { grade: 'F', count: 3, subject: 'Science' },
      { grade: 'A', count: 38, subject: 'Math' },
      { grade: 'B', count: 72, subject: 'Math' },
      { grade: 'C', count: 40, subject: 'Math' },
      { grade: 'D', count: 8, subject: 'Math' },
      { grade: 'F', count: 2, subject: 'Math' },
    ],
    subjectPerformance: [
      { subject: 'Physics', avgScore: 78, trend: 'up' },
      { subject: 'Chemistry', avgScore: 82, trend: 'stable' },
      { subject: 'Biology', avgScore: 85, trend: 'up' },
      { subject: 'Mathematics', avgScore: 75, trend: 'down' },
      { subject: 'English', avgScore: 80, trend: 'stable' },
      { subject: 'History', avgScore: 72, trend: 'down' },
    ],
    anomalies: [
      { id: 'A001', type: 'Attendance Drop', description: 'Physics class attendance dropped 15% last week', severity: 'high', date: '2024-03-15' },
      { id: 'A002', type: 'Grade Anomaly', description: 'Unusually high scores in Chemistry midterm', severity: 'medium', date: '2024-03-10' },
      { id: 'A003', type: 'Participation Drop', description: 'Decreased participation in English class discussions', severity: 'low', date: '2024-03-12' },
    ]
  });

  const [timeRange, setTimeRange] = useState('6months');
  const [selectedSubject, setSelectedSubject] = useState('All');

  const COLORS = ['#4f46e5', '#f97316', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4'];

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

  return (
    <div className="space-y-6">
      <Card title="AI Performance Insights Dashboard" icon="fa-solid fa-chart-line">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Academic Performance Analytics</h3>
            <p className="text-gray-600 text-sm">AI-powered insights and trend detection</p>
          </div>
          <div className="flex space-x-2">
            <select
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="1month">Last 1 Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last 1 Year</option>
            </select>
            <Button>
              <i className="fa-solid fa-arrows-rotate mr-2"></i> Refresh Data
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <i className="fa-solid fa-users text-blue-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Overall Attendance</p>
                <p className="text-2xl font-bold text-gray-900">87.4%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-lg p-5">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <i className="fa-solid fa-graduation-cap text-green-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Grade</p>
                <p className="text-2xl font-bold text-gray-900">B+</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-lg p-5">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <i className="fa-solid fa-lightbulb text-purple-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Anomalies Detected</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card title="Attendance Trends">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData.attendanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="overall" stroke="#4f46e5" name="Overall" strokeWidth={2} />
                  <Line type="monotone" dataKey="science" stroke="#f97316" name="Science" strokeWidth={2} />
                  <Line type="monotone" dataKey="math" stroke="#10b981" name="Math" strokeWidth={2} />
                  <Line type="monotone" dataKey="english" stroke="#8b5cf6" name="English" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Grade Distribution">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData.gradeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="grade" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Student Count">
                    {performanceData.gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card title="Subject Performance">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Score</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {performanceData.subjectPerformance.map((subject, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subject.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.avgScore}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <i className={`fa-solid ${getTrendIcon(subject.trend)} mr-2`}></i>
                        {subject.trend.charAt(0).toUpperCase() + subject.trend.slice(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Detected Anomalies">
            <div className="space-y-4">
              {performanceData.anomalies.map((anomaly) => (
                <div key={anomaly.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">{anomaly.type}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(anomaly.severity)}`}>
                      {anomaly.severity.charAt(0).toUpperCase() + anomaly.severity.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{anomaly.description}</p>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">Detected on {anomaly.date}</span>
                    <Button variant="secondary" size="sm">
                      <i className="fa-solid fa-magnifying-glass mr-1"></i> Investigate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
          <div className="flex">
            <i className="fa-solid fa-robot text-blue-500 text-xl mr-3 mt-1"></i>
            <div>
              <h4 className="font-medium text-blue-800">AI Insights Summary</h4>
              <p className="text-sm text-blue-700 mt-1">
                Overall performance is trending positively with a 3.2% improvement in attendance over the last quarter. 
                Mathematics shows a concerning downward trend that requires attention. The system detected 3 anomalies 
                that warrant investigation. Recommendation: Implement targeted support programs for Mathematics students.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIPerformanceInsights;