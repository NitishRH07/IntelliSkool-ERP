import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AIReportSummarizer: React.FC = () => {
  // Mock data - in a real app, this would come from an API or ML model
  const [summaryData] = useState({
    recentReports: [
      { id: 1, title: 'Q2 Academic Performance Report', department: 'Academics', date: '2024-06-15', status: 'Summarized', length: '24 pages', summaryLength: '3 paragraphs' },
      { id: 2, title: 'Faculty Recruitment Analysis', department: 'HR', date: '2024-06-10', status: 'Summarized', length: '18 pages', summaryLength: '2 paragraphs' },
      { id: 3, title: 'Infrastructure Investment ROI', department: 'Finance', date: '2024-06-05', status: 'Pending', length: '32 pages', summaryLength: '-' },
      { id: 4, title: 'Student Satisfaction Survey Results', department: 'Student Affairs', date: '2024-05-28', status: 'Summarized', length: '28 pages', summaryLength: '4 paragraphs' },
      { id: 5, title: 'Technology Upgrade Impact Assessment', department: 'IT', date: '2024-05-20', status: 'Pending', length: '22 pages', summaryLength: '-' },
    ],
    summaryMetrics: [
      { month: 'Jan 2024', reportsProcessed: 12, avgReduction: 75, timeSaved: 18 },
      { month: 'Feb 2024', reportsProcessed: 15, avgReduction: 78, timeSaved: 22 },
      { month: 'Mar 2024', reportsProcessed: 18, avgReduction: 80, timeSaved: 28 },
      { month: 'Apr 2024', reportsProcessed: 14, avgReduction: 77, timeSaved: 21 },
      { month: 'May 2024', reportsProcessed: 16, avgReduction: 82, timeSaved: 26 },
      { month: 'Jun 2024', reportsProcessed: 20, avgReduction: 85, timeSaved: 32 },
    ],
    departmentUsage: [
      { department: 'Academics', reports: 24, summaries: 22 },
      { department: 'Finance', reports: 18, summaries: 17 },
      { department: 'HR', reports: 15, summaries: 14 },
      { department: 'IT', reports: 12, summaries: 10 },
      { department: 'Student Affairs', reports: 16, summaries: 15 },
      { department: 'Administration', reports: 20, summaries: 18 },
    ],
    keyInsights: [
      { category: 'Academic Performance', insight: 'Science department shows 12% improvement in student grades', source: 'Q2 Academic Report' },
      { category: 'Financial Efficiency', insight: 'Infrastructure investments showing 15% ROI above projections', source: 'Infrastructure Report' },
      { category: 'Staff Satisfaction', insight: 'Faculty recruitment initiatives increased retention by 8%', source: 'HR Report' },
      { category: 'Student Experience', insight: 'Technology upgrades improved student satisfaction scores by 18%', source: 'Student Survey' },
      { category: 'Operational Excellence', insight: 'Process automation reduced administrative workload by 25%', source: 'IT Report' },
    ]
  });

  const [activeTab, setActiveTab] = useState('reports');
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [summaryLength, setSummaryLength] = useState('medium');

  const handleGenerateReport = () => {
    alert('AI Report Summary generated and sent to your email');
  };

  const handleExportData = () => {
    alert('Report summary data exported successfully');
  };

  const handleSummarizeReport = (id: number) => {
    alert(`Generating summary for report ${id}. This may take a few moments...`);
    // In a real app, this would trigger the AI summarization process
  };

  const handleViewSummary = (id: number) => {
    setSelectedReport(id);
  };

  const handleCloseSummary = () => {
    setSelectedReport(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Summarized': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Mock summary content
  const mockSummary = `Executive Summary:
This report analyzes the Q2 academic performance across all departments. Key findings indicate a 12% improvement in overall student grades compared to Q1, with the Science department leading the improvement at 18%. The implementation of new teaching methodologies and adaptive learning technologies has contributed significantly to these positive results.

Key Insights:
1. Student engagement metrics have increased by 22% across all departments
2. Faculty adoption of new technologies is at 85% utilization rate
3. Dropout rates have decreased by 8% compared to the previous quarter
4. Departmental collaboration has improved, with cross-departmental projects increasing by 15%

Recommendations:
1. Continue investment in adaptive learning technologies
2. Expand successful teaching methodologies to all departments
3. Implement additional support programs for departments showing slower improvement
4. Conduct follow-up analysis on long-term impact of these improvements`;

  return (
    <div className="space-y-6">
      <Card title="AI Report Summarizer" icon="fa-solid fa-file-contract">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Auto-Generates Executive Summaries from Admin and Teacher Data</h3>
            <p className="text-gray-600 text-sm">AI-powered summarization of complex reports and documents</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleGenerateReport}>
              <i className="fa-solid fa-file-pdf mr-2"></i> Generate Summary Report
            </Button>
            <Button variant="secondary" onClick={handleExportData}>
              <i className="fa-solid fa-download mr-2"></i> Export Data
            </Button>
          </div>
        </div>

        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reports'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Report Summaries
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'metrics'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Performance Metrics
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'insights'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Key Insights
            </button>
            <button
              onClick={() => setActiveTab('usage')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'usage'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Usage Analytics
            </button>
          </nav>
        </div>

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h3 className="text-lg font-medium">Recent Reports</h3>
              <div className="flex space-x-2">
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={summaryLength}
                  onChange={(e) => setSummaryLength(e.target.value)}
                >
                  <option value="short">Short Summary</option>
                  <option value="medium">Medium Summary</option>
                  <option value="long">Detailed Summary</option>
                </select>
                <Button>
                  <i className="fa-solid fa-upload mr-2"></i> Upload Report
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Length
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {summaryData.recentReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{report.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.length}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {report.status === 'Summarized' ? (
                          <button 
                            onClick={() => handleViewSummary(report.id)}
                            className="text-primary hover:text-primary-dark mr-3"
                          >
                            <i className="fa-solid fa-eye mr-1"></i> View Summary
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleSummarizeReport(report.id)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <i className="fa-solid fa-brain mr-1"></i> Summarize
                          </button>
                        )}
                        <button className="text-gray-600 hover:text-gray-900">
                          <i className="fa-solid fa-download mr-1"></i> Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-robot text-blue-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-blue-800">AI Summarization Insights</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    The AI report summarizer has processed 95 reports this quarter, reducing average document length by 82%. 
                    Executives save approximately 32 hours per month by reading summaries instead of full reports. 
                    The system maintains 94% accuracy in capturing key insights and recommendations. 
                    Two reports are currently pending summarization and will be processed within 24 hours. 
                    Recommendation: Encourage all departments to submit reports for AI summarization to improve 
                    decision-making efficiency and reduce information overload.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-file-alt text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Reports Processed</p>
                    <p className="text-xl font-bold text-gray-900">95</p>
                    <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 12 this month</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-compress-alt text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg. Reduction</p>
                    <p className="text-xl font-bold text-gray-900">82%</p>
                    <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 3% improvement</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-clock text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Time Saved</p>
                    <p className="text-xl font-bold text-gray-900">32 hrs/month</p>
                    <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 6 hrs increase</p>
                  </div>
                </div>
              </div>
            </div>

            <Card title="Monthly Performance Trends">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={summaryData.summaryMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="reportsProcessed" name="Reports Processed" fill="#4f46e5" />
                    <Bar dataKey="avgReduction" name="Avg. Reduction (%)" fill="#10b981" />
                    <Bar dataKey="timeSaved" name="Time Saved (hrs)" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Processing Efficiency">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div>
                      <h4 className="font-medium text-gray-900">Accuracy Rate</h4>
                      <p className="text-sm text-gray-600">Key insight capture rate</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">94%</p>
                      <p className="text-xs text-green-600"><i className="fa-solid fa-arrow-up mr-1"></i> 2%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div>
                      <h4 className="font-medium text-gray-900">Processing Speed</h4>
                      <p className="text-sm text-gray-600">Avg. time per report</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">4.2 min</p>
                      <p className="text-xs text-green-600"><i className="fa-solid fa-arrow-down mr-1"></i> 0.8 min</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div>
                      <h4 className="font-medium text-gray-900">User Satisfaction</h4>
                      <p className="text-sm text-gray-600">Executive feedback score</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">4.7/5</p>
                      <p className="text-xs text-green-600"><i className="fa-solid fa-arrow-up mr-1"></i> 0.3 pts</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-900">Adoption Rate</h4>
                      <p className="text-sm text-gray-600">Departments using the system</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">92%</p>
                      <p className="text-xs text-green-600"><i className="fa-solid fa-arrow-up mr-1"></i> 5%</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Summary Quality Metrics">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={summaryData.summaryMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="avgReduction" name="Reduction (%)" fill="#4f46e5" />
                      <Bar dataKey="timeSaved" name="Time Saved (hrs)" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-chart-line text-green-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-green-800">Performance Metrics Summary</h4>
                  <p className="text-sm text-green-700 mt-1">
                    The AI summarization system shows consistent improvement with 95 reports processed this quarter, 
                    achieving an 82% average reduction in document length. Executives save 32 hours per month, 
                    with processing speed improving to 4.2 minutes per report. User satisfaction remains high at 4.7/5. 
                    The system maintains 94% accuracy in capturing key insights. 
                    Recommendation: Continue optimizing the summarization algorithms to further improve speed and accuracy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h3 className="text-lg font-medium">Key Institutional Insights</h3>
              <Button>
                <i className="fa-solid fa-sync mr-2"></i> Refresh Insights
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {summaryData.keyInsights.map((insight, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <i className="fa-solid fa-lightbulb text-blue-600"></i>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-2">
                        {insight.category}
                      </span>
                      <h4 className="font-medium text-gray-900 mb-2">{insight.insight}</h4>
                      <p className="text-sm text-gray-600">Source: {insight.source}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Card title="Insight Categories">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { category: 'Academic Performance', count: 24 },
                    { category: 'Financial Efficiency', count: 18 },
                    { category: 'Staff Satisfaction', count: 15 },
                    { category: 'Student Experience', count: 22 },
                    { category: 'Operational Excellence', count: 19 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Insights Count" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-robot text-blue-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-blue-800">AI Insight Generation</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    The AI system has extracted 98 key insights from 95 summarized reports this quarter. 
                    The most common insight categories are Student Experience (22 insights) and Academic Performance (24 insights). 
                    Cross-report analysis has identified 15 correlations between different institutional metrics. 
                    The system flags 8 critical insights requiring immediate attention. 
                    Recommendation: Review critical insights weekly and establish action plans for high-priority items. 
                    Share positive insights across departments to promote best practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'usage' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-building text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active Departments</p>
                    <p className="text-xl font-bold text-gray-900">6</p>
                    <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 1 new</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-users text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active Users</p>
                    <p className="text-xl font-bold text-gray-900">42</p>
                    <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 8 new</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-chart-bar text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg. Monthly Usage</p>
                    <p className="text-xl font-bold text-gray-900">156</p>
                    <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 24 increase</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-star text-yellow-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">User Retention</p>
                    <p className="text-xl font-bold text-gray-900">94%</p>
                    <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 3% increase</p>
                  </div>
                </div>
              </div>
            </div>

            <Card title="Department Usage Analysis">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={summaryData.departmentUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="reports" name="Reports Submitted" fill="#4f46e5" />
                    <Bar dataKey="summaries" name="Summaries Generated" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="User Engagement Metrics">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div>
                      <h4 className="font-medium text-gray-900">Login Frequency</h4>
                      <p className="text-sm text-gray-600">Avg. logins per user per week</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">3.2</p>
                      <p className="text-xs text-green-600"><i className="fa-solid fa-arrow-up mr-1"></i> 0.4</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div>
                      <h4 className="font-medium text-gray-900">Feature Adoption</h4>
                      <p className="text-sm text-gray-600">% of users using all features</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">78%</p>
                      <p className="text-xs text-green-600"><i className="fa-solid fa-arrow-up mr-1"></i> 5%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div>
                      <h4 className="font-medium text-gray-900">Report Uploads</h4>
                      <p className="text-sm text-gray-600">Avg. uploads per department</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">4.2</p>
                      <p className="text-xs text-green-600"><i className="fa-solid fa-arrow-up mr-1"></i> 0.7</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-900">Summary Downloads</h4>
                      <p className="text-sm text-gray-600">% of summaries downloaded</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">89%</p>
                      <p className="text-xs text-green-600"><i className="fa-solid fa-arrow-up mr-1"></i> 4%</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Department Adoption Rates">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={summaryData.departmentUsage.map(dept => ({
                      department: dept.department,
                      adoption: Math.round((dept.summaries / dept.reports) * 100)
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="adoption" name="Adoption Rate (%)" fill="#4f46e5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-lightbulb text-blue-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-blue-800">Usage Analytics Insights</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    The AI report summarizer shows strong adoption with 6 active departments and 42 users. 
                    Monthly usage has increased to 156 summaries, with user retention at 94%. 
                    The Academics department leads in usage with 24 reports submitted and 22 summaries generated. 
                    User engagement metrics show 3.2 average logins per week and 78% feature adoption. 
                    Recommendation: Continue user training programs and consider adding features for the 
                    Administration department which has the lowest adoption rate at 90%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Summary Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Summary: Q2 Academic Performance Report
                </h3>
                <button 
                  onClick={handleCloseSummary}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <i className="fa-solid fa-times text-xl"></i>
                </button>
              </div>
              
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-700">
                  {mockSummary}
                </pre>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="secondary" onClick={handleCloseSummary}>
                  Close
                </Button>
                <Button>
                  <i className="fa-solid fa-download mr-2"></i> Download Summary
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIReportSummarizer;