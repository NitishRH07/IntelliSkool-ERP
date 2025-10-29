import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const AIPerformanceInsights: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const [insightsData] = useState({
    academicPerformance: [
      { subject: 'Mathematics', current: 85, previous: 78, target: 90 },
      { subject: 'Physics', current: 78, previous: 82, target: 85 },
      { subject: 'Chemistry', current: 88, previous: 85, target: 90 },
      { subject: 'Biology', current: 92, previous: 88, target: 95 },
      { subject: 'English', current: 76, previous: 79, target: 80 },
      { subject: 'History', current: 84, previous: 81, target: 85 },
    ],
    attendanceTrends: [
      { month: 'Jan', attendance: 88, punctuality: 85 },
      { month: 'Feb', attendance: 90, punctuality: 87 },
      { month: 'Mar', attendance: 92, punctuality: 89 },
      { month: 'Apr', attendance: 89, punctuality: 86 },
      { month: 'May', attendance: 91, punctuality: 88 },
      { month: 'Jun', attendance: 93, punctuality: 90 },
    ],
    staffEfficiency: [
      { department: 'Science', efficiency: 88, productivity: 85 },
      { department: 'Arts', efficiency: 82, productivity: 80 },
      { department: 'Commerce', efficiency: 91, productivity: 88 },
      { department: 'Engineering', efficiency: 78, productivity: 75 },
      { department: 'Administration', efficiency: 85, productivity: 82 },
    ],
    comparativeAnalysis: [
      { metric: 'Academic Performance', current: 85, benchmark: 82, industry: 80 },
      { metric: 'Attendance', current: 91, benchmark: 88, industry: 85 },
      { metric: 'Staff Retention', current: 89, benchmark: 85, industry: 82 },
      { metric: 'Student Satisfaction', current: 87, benchmark: 84, industry: 81 },
      { metric: 'Faculty Development', current: 78, benchmark: 80, industry: 75 },
    ]
  });

  const [timeRange, setTimeRange] = useState('6months');
  const [activeTab, setActiveTab] = useState('overview');

  const COLORS = ['#4f46e5', '#f97316', '#10b981', '#8b5cf6', '#ec4899'];

  const handleGenerateReport = () => {
    alert('AI Performance Insights report generated and sent to your email');
  };

  const handleExportData = () => {
    alert('Performance data exported successfully');
  };

  const handleRefreshAnalysis = () => {
    alert('Refreshing AI analysis. This may take a few moments...');
  };

  return (
    <div className="space-y-6">
      <Card title="AI Performance Insights Dashboard" icon="fa-solid fa-chart-line">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Auto-Analyzed Academic Results, Attendance Trends & Staff Efficiency</h3>
            <p className="text-gray-600 text-sm">AI-powered insights for data-driven decision making</p>
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
            <Button onClick={handleRefreshAnalysis}>
              <i className="fa-solid fa-arrows-rotate mr-2"></i> Refresh Analysis
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
              Performance Overview
            </button>
            <button
              onClick={() => setActiveTab('academic')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'academic'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Academic Performance
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'attendance'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Attendance Trends
            </button>
            <button
              onClick={() => setActiveTab('staff')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'staff'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Staff Efficiency
            </button>
          </nav>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-graduation-cap text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg. Academic Score</p>
                    <p className="text-xl font-bold text-gray-900">85.3%</p>
                    <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 3.2% from last period</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-user-check text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg. Attendance</p>
                    <p className="text-xl font-bold text-gray-900">91.0%</p>
                    <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 1.8% from last period</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-users text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Staff Efficiency</p>
                    <p className="text-xl font-bold text-gray-900">84.8%</p>
                    <p className="text-xs text-red-600 mt-1"><i className="fa-solid fa-arrow-down mr-1"></i> 0.5% from last period</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-cyan-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-trophy text-cyan-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Performance Index</p>
                    <p className="text-xl font-bold text-gray-900">83.7</p>
                    <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 2.1 points from last period</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Comparative Performance Analysis">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={insightsData.comparativeAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metric" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="current" name="Current Performance" fill="#4f46e5" />
                      <Bar dataKey="benchmark" name="Internal Benchmark" fill="#f97316" />
                      <Bar dataKey="industry" name="Industry Standard" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card title="Performance Radar">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={insightsData.comparativeAnalysis}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis angle={30} domain={[70, 100]} />
                      <Radar name="Current" dataKey="current" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
                      <Radar name="Benchmark" dataKey="benchmark" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-robot text-blue-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-blue-800">AI Performance Insights</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    The AI analysis shows a positive trend in academic performance and attendance, with a 3.2% improvement 
                    in average scores and 1.8% increase in attendance. However, staff efficiency has slightly declined by 0.5%. 
                    The Science and Commerce departments are outperforming others, while Engineering needs attention. 
                    Recommendation: Implement targeted faculty development programs for the Engineering department and 
                    recognize high-performing departments to maintain momentum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="space-y-6">
            <Card title="Subject-wise Academic Performance">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={insightsData.academicPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[70, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" name="Current Performance" fill="#4f46e5" />
                    <Bar dataKey="previous" name="Previous Period" fill="#94a3b8" />
                    <Bar dataKey="target" name="Target" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Performance Improvement Analysis">
                <div className="space-y-4">
                  {insightsData.academicPerformance.map((subject, index) => {
                    const improvement = subject.current - subject.previous;
                    return (
                      <div key={index} className="flex items-center">
                        <div className="w-32 text-sm font-medium text-gray-700">{subject.subject}</div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  improvement >= 0 ? 'bg-green-500' : 'bg-red-500'
                                }`} 
                                style={{ width: `${Math.abs(improvement) * 5}%` }}
                              ></div>
                            </div>
                            <span className={`ml-2 text-sm font-medium ${
                              improvement >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {improvement >= 0 ? '+' : ''}{improvement}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card title="Target Achievement">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={insightsData.academicPerformance.map(subject => ({
                          name: subject.subject,
                          value: Math.round((subject.current / subject.target) * 100)
                        }))}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {insightsData.academicPerformance.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.current >= entry.target ? '#10b981' : '#f97316'} 
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <Card title="Attendance & Punctuality Trends">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={insightsData.attendanceTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="#4f46e5" 
                      name="Attendance (%)" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="punctuality" 
                      stroke="#10b981" 
                      name="Punctuality (%)" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Monthly Attendance Analysis">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Punctuality</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {insightsData.attendanceTrends.map((month, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{month.month}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{month.attendance}%</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{month.punctuality}%</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-green-600 text-sm">
                              <i className="fa-solid fa-arrow-up mr-1"></i> 
                              {index > 0 ? month.attendance - insightsData.attendanceTrends[index-1].attendance : 0}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card title="Attendance Insights">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <i className="fa-solid fa-lightbulb text-blue-600"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Consistent Improvement</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Attendance has shown consistent improvement over the last 6 months, 
                        reaching a peak of 93% in June.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <i className="fa-solid fa-check-circle text-green-600"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Punctuality Correlation</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Punctuality closely follows attendance trends, indicating effective 
                        student engagement strategies.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-yellow-100 p-2 rounded-full mr-3">
                      <i className="fa-solid fa-exclamation-triangle text-yellow-600"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Recommendation</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Implement reward systems for consistent attendance to maintain 
                        the positive trend and address minor dips.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="space-y-6">
            <Card title="Department-wise Staff Efficiency">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={insightsData.staffEfficiency}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis domain={[70, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="efficiency" name="Efficiency (%)" fill="#4f46e5" />
                    <Bar dataKey="productivity" name="Productivity (%)" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Efficiency Metrics">
                <div className="space-y-4">
                  {insightsData.staffEfficiency.map((dept, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-32 text-sm font-medium text-gray-700">{dept.department}</div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full bg-blue-500" 
                              style={{ width: `${dept.efficiency}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            {dept.efficiency}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Productivity Metrics">
                <div className="space-y-4">
                  {insightsData.staffEfficiency.map((dept, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-32 text-sm font-medium text-gray-700">{dept.department}</div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full bg-green-500" 
                              style={{ width: `${dept.productivity}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            {dept.productivity}%
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
                  <h4 className="font-medium text-yellow-800">Staff Efficiency Insights</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    The AI analysis shows that the Commerce department has the highest efficiency (91%) and productivity (88%), 
                    while the Engineering department lags behind with 78% efficiency and 75% productivity. The overall staff 
                    efficiency has slightly declined by 0.5% compared to the previous period. 
                    Recommendation: Conduct a detailed review of the Engineering department's processes and workload 
                    distribution. Consider implementing efficiency improvement workshops for all departments.
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

export default AIPerformanceInsights;