import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AIDecisionSupportSystem: React.FC = () => {
  // Mock data - in a real app, this would come from an API or ML model
  const [decisionData] = useState({
    recommendations: [
      { id: 1, area: 'Academics', priority: 'High', recommendation: 'Implement adaptive learning technology in Science department', impact: 85, effort: 'Medium', status: 'Pending' },
      { id: 2, area: 'Finance', priority: 'High', recommendation: 'Optimize budget allocation for IT infrastructure', impact: 90, effort: 'Low', status: 'Approved' },
      { id: 3, area: 'Staffing', priority: 'Medium', recommendation: 'Hire 2 additional faculty for Engineering department', impact: 75, effort: 'High', status: 'Pending' },
      { id: 4, area: 'Infrastructure', priority: 'Medium', recommendation: 'Upgrade laboratory equipment in Science department', impact: 80, effort: 'High', status: 'Pending' },
      { id: 5, area: 'Student Support', priority: 'Low', recommendation: 'Expand counseling services to all departments', impact: 70, effort: 'Medium', status: 'Rejected' },
    ],
    impactAnalysis: [
      { metric: 'Academic Performance', current: 85, projected: 92, improvement: 7 },
      { metric: 'Student Satisfaction', current: 82, projected: 88, improvement: 6 },
      { metric: 'Staff Retention', current: 89, projected: 93, improvement: 4 },
      { metric: 'Financial Efficiency', current: 78, projected: 85, improvement: 7 },
      { metric: 'Operational Cost', current: 100, projected: 95, improvement: -5 },
    ],
    priorityMatrix: [
      { id: 1, recommendation: 'Adaptive Learning Tech', impact: 85, urgency: 90 },
      { id: 2, recommendation: 'IT Budget Optimization', impact: 90, urgency: 85 },
      { id: 3, recommendation: 'Faculty Hiring', impact: 75, urgency: 70 },
      { id: 4, recommendation: 'Lab Equipment Upgrade', impact: 80, urgency: 65 },
      { id: 5, recommendation: 'Counseling Expansion', impact: 70, urgency: 50 },
    ],
    implementationProgress: [
      { month: 'Jan 2024', planned: 5, completed: 3, inProgress: 2 },
      { month: 'Feb 2024', planned: 4, completed: 4, inProgress: 0 },
      { month: 'Mar 2024', planned: 6, completed: 5, inProgress: 1 },
      { month: 'Apr 2024', planned: 3, completed: 2, inProgress: 1 },
      { month: 'May 2024', planned: 7, completed: 6, inProgress: 1 },
      { month: 'Jun 2024', planned: 5, completed: 4, inProgress: 1 },
    ]
  });

  const [timeRange, setTimeRange] = useState('6months');
  const [activeTab, setActiveTab] = useState('recommendations');
  const [filterPriority, setFilterPriority] = useState('All');

  const COLORS = ['#4f46e5', '#f97316', '#10b981', '#8b5cf6', '#ec4899'];

  const handleGenerateReport = () => {
    alert('AI Decision Support report generated and sent to your email');
  };

  const handleExportData = () => {
    alert('Decision support data exported successfully');
  };

  const handleRunAnalysis = () => {
    alert('Running advanced decision support analysis. This may take a few moments...');
  };

  const handleApproveRecommendation = (id: number) => {
    alert(`Recommendation ${id} approved for implementation`);
  };

  const handleRejectRecommendation = (id: number) => {
    alert(`Recommendation ${id} rejected`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card title="AI Decision Support System" icon="fa-solid fa-lightbulb">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Suggests Data-Driven Actions for Policy or Academic Improvements</h3>
            <p className="text-gray-600 text-sm">AI-powered recommendations for strategic decision making</p>
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
            <Button onClick={handleRunAnalysis}>
              <i className="fa-solid fa-brain mr-2"></i> Run Analysis
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
              onClick={() => setActiveTab('recommendations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'recommendations'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Recommendations
            </button>
            <button
              onClick={() => setActiveTab('impact')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'impact'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Impact Analysis
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'matrix'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Priority Matrix
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'progress'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Implementation Progress
            </button>
          </nav>
        </div>

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h3 className="text-lg font-medium">Strategic Recommendations</h3>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="All">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {decisionData.recommendations
                .filter(rec => filterPriority === 'All' || rec.priority === filterPriority)
                .map((rec) => (
                  <div key={rec.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                            {rec.priority} Priority
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            {rec.area}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rec.status)}`}>
                            {rec.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEffortColor(rec.effort)}`}>
                            {rec.effort} Effort
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-2">{rec.recommendation}</h4>
                        <div className="flex items-center">
                          <div className="w-32 text-sm text-gray-600">Expected Impact:</div>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="h-2.5 rounded-full bg-blue-500" 
                                  style={{ width: `${rec.impact}%` }}
                                ></div>
                              </div>
                              <span className="ml-2 text-sm font-medium text-gray-700">
                                {rec.impact}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {rec.status === 'Pending' && (
                          <>
                            <Button size="sm" onClick={() => handleApproveRecommendation(rec.id)}>
                              <i className="fa-solid fa-check mr-1"></i> Approve
                            </Button>
                            <Button variant="secondary" size="sm" onClick={() => handleRejectRecommendation(rec.id)}>
                              <i className="fa-solid fa-times mr-1"></i> Reject
                            </Button>
                          </>
                        )}
                        {rec.status === 'Approved' && (
                          <Button variant="secondary" size="sm">
                            <i className="fa-solid fa-eye mr-1"></i> View Details
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-robot text-blue-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-blue-800">AI Decision Support Insights</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    The AI system has identified 5 key recommendations with varying priorities and impacts. 
                    The highest priority recommendations focus on academic technology and financial optimization, 
                    both with high impact scores (85-90%). The staffing recommendation for the Engineering 
                    department is medium priority with 75% impact but requires high effort. 
                    Recommendation: Approve the high-impact, low-effort IT budget optimization first, 
                    followed by the adaptive learning technology implementation. Consider the faculty hiring 
                    recommendation after reviewing the budget implications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="space-y-6">
            <Card title="Projected Impact Analysis">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={decisionData.impactAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis domain={[70, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" name="Current State" fill="#94a3b8" />
                    <Bar dataKey="projected" name="Projected State" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {decisionData.impactAnalysis.map((metric, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 text-sm mb-2">{metric.metric}</h4>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">{metric.projected}</span>
                    <span className="text-sm text-gray-600 ml-1">/100</span>
                  </div>
                  <div className={`text-xs mt-1 ${metric.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <i className={`fa-solid ${metric.improvement >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'} mr-1`}></i>
                    {metric.improvement >= 0 ? '+' : ''}{metric.improvement} pts
                  </div>
                </div>
              ))}
            </div>

            <Card title="Impact vs Effort Matrix">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={decisionData.recommendations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="recommendation" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="impact" name="Impact (%)" fill="#4f46e5" />
                    <Bar dataKey="effort" name="Effort Level" fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="bg-green-50 border border-green-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-chart-line text-green-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-green-800">Impact Analysis Summary</h4>
                  <p className="text-sm text-green-700 mt-1">
                    The AI analysis projects significant improvements across all key metrics if recommendations are implemented. 
                    Academic performance is expected to increase by 7 points to 92, student satisfaction by 6 points to 88, 
                    and financial efficiency by 7 points to 85. Operational costs are projected to decrease by 5%. 
                    The overall institutional performance index is expected to improve by 6.2 points. 
                    Recommendation: Prioritize high-impact recommendations with manageable effort requirements for maximum ROI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <Card title="Recommendation Priority Matrix">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={decisionData.priorityMatrix}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="recommendation" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="impact" name="Impact (%)" fill="#4f46e5" />
                    <Bar dataKey="urgency" name="Urgency (%)" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Priority Quadrants">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <i className="fa-solid fa-bolt text-red-600"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">High Impact, High Urgency</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Immediate action required. These recommendations should be prioritized first.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-yellow-100 p-2 rounded-full mr-3">
                      <i className="fa-solid fa-clock text-yellow-600"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">High Impact, Low Urgency</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Important for long-term success. Schedule for implementation in the next planning cycle.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <i className="fa-solid fa-calendar text-blue-600"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Low Impact, High Urgency</h4>
                      <p className="text-sm text-gray-600 mt-1">
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Recommendation Categories">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'High Priority', value: 2 },
                          { name: 'Medium Priority', value: 2 },
                          { name: 'Low Priority', value: 1 }
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
                        <Cell key="cell-0" fill="#ef4444" />
                        <Cell key="cell-1" fill="#f97316" />
                        <Cell key="cell-2" fill="#10b981" />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-lightbulb text-blue-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-blue-800">Priority Matrix Insights</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    The priority matrix shows that adaptive learning technology and IT budget optimization 
                    are high impact and high urgency recommendations that require immediate attention. 
                    Faculty hiring and lab equipment upgrades are high impact but lower urgency, suitable 
                    for the next planning cycle. Counseling expansion has lower impact and urgency. 
                    Recommendation: Focus resources on the top two recommendations first, then address 
                    the medium priority items in the next quarter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <Card title="Implementation Progress">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={decisionData.implementationProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="planned" 
                      stroke="#4f46e5" 
                      name="Planned" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="completed" 
                      stroke="#10b981" 
                      name="Completed" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="inProgress" 
                      stroke="#f97316" 
                      name="In Progress" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-check-circle text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Completed Initiatives</p>
                    <p className="text-xl font-bold text-gray-900">24</p>
                    <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 4 this month</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-tasks text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">In Progress</p>
                    <p className="text-xl font-bold text-gray-900">6</p>
                    <p className="text-xs text-blue-600 mt-1">On schedule</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-clock text-yellow-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pending Approval</p>
                    <p className="text-xl font-bold text-gray-900">3</p>
                    <p className="text-xs text-yellow-600 mt-1">Awaiting review</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Monthly Progress Summary">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Planned</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {decisionData.implementationProgress.map((month, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{month.month}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{month.planned}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{month.completed}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-green-600">
                              {Math.round((month.completed / month.planned) * 100)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card title="Implementation Efficiency">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={decisionData.implementationProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="planned" name="Planned" fill="#4f46e5" />
                      <Bar dataKey="completed" name="Completed" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-robot text-blue-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-blue-800">Implementation Progress Insights</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    The implementation progress shows consistent execution with an average success rate of 87%. 
                    June achieved 80% completion rate with 4 out of 5 planned initiatives completed. 
                    The overall trend shows improvement in execution efficiency over the last 6 months. 
                    Currently, 24 initiatives have been completed, 6 are in progress, and 3 are pending approval. 
                    Recommendation: Maintain current implementation pace while focusing on completing the 
                    in-progress initiatives. Expedite review of pending approvals to maintain momentum.
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

export default AIDecisionSupportSystem;