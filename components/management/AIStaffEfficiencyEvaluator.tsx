import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const AIStaffEfficiencyEvaluator: React.FC = () => {
  // Mock data - in a real app, this would come from an API or ML model
  const [efficiencyData] = useState({
    workloadAnalysis: [
      { department: 'Science', workload: 85, outcomes: 88, efficiency: 92 },
      { department: 'Arts', workload: 78, outcomes: 82, efficiency: 85 },
      { department: 'Commerce', workload: 92, outcomes: 91, efficiency: 99 },
      { department: 'Engineering', workload: 95, outcomes: 78, efficiency: 82 },
      { department: 'Administration', workload: 75, outcomes: 85, efficiency: 88 },
    ],
    productivityTrends: [
      { month: 'Jan 2024', productivity: 82, efficiency: 85 },
      { month: 'Feb 2024', productivity: 84, efficiency: 87 },
      { month: 'Mar 2024', productivity: 86, efficiency: 89 },
      { month: 'Apr 2024', productivity: 85, efficiency: 88 },
      { month: 'May 2024', productivity: 87, efficiency: 90 },
      { month: 'Jun 2024', productivity: 89, efficiency: 92 },
    ],
    performanceMetrics: [
      { metric: 'Task Completion Rate', current: 92, target: 95, industry: 88 },
      { metric: 'Quality Score', current: 88, target: 90, industry: 85 },
      { metric: 'Time Management', current: 85, target: 88, industry: 82 },
      { metric: 'Resource Utilization', current: 87, target: 90, industry: 84 },
      { metric: 'Innovation Index', current: 78, target: 85, industry: 80 },
    ],
    efficiencyDrivers: [
      { driver: 'Training Programs', impact: 25 },
      { driver: 'Technology Tools', impact: 20 },
      { driver: 'Work Environment', impact: 18 },
      { driver: 'Clear Objectives', impact: 15 },
      { driver: 'Recognition Systems', impact: 12 },
      { driver: 'Workload Balance', impact: 10 },
    ]
  });

  const [timeRange, setTimeRange] = useState('6months');
  const [activeTab, setActiveTab] = useState('overview');
  const [sortBy, setSortBy] = useState('efficiency');

  const COLORS = ['#4f46e5', '#f97316', '#10b981', '#8b5cf6', '#ec4899'];

  const handleGenerateReport = () => {
    alert('AI Staff Efficiency Evaluation report generated and sent to your email');
  };

  const handleExportData = () => {
    alert('Efficiency data exported successfully');
  };

  const handleRunAnalysis = () => {
    alert('Running advanced staff efficiency analysis. This may take a few moments...');
  };

  return (
    <div className="space-y-6">
      <Card title="AI Staff Efficiency Evaluator" icon="fa-solid fa-balance-scale">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Analyzes Workload vs. Outcomes for Each Department</h3>
            <p className="text-gray-600 text-sm">AI-powered evaluation of staff performance and efficiency</p>
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
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Efficiency Overview
            </button>
            <button
              onClick={() => setActiveTab('workload')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'workload'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Workload Analysis
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'trends'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Productivity Trends
            </button>
            <button
              onClick={() => setActiveTab('drivers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'drivers'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Efficiency Drivers
            </button>
          </nav>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-users text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg. Efficiency Score</p>
                    <p className="text-xl font-bold text-gray-900">89.2%</p>
                    <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 2.1% from last period</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-chart-line text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Top Performing Dept</p>
                    <p className="text-xl font-bold text-gray-900">Commerce</p>
                    <p className="text-xs text-gray-600 mt-1">99% efficiency</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-red-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-exclamation-triangle text-red-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Needs Attention</p>
                    <p className="text-xl font-bold text-gray-900">Engineering</p>
                    <p className="text-xs text-gray-600 mt-1">82% efficiency</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Department Efficiency Comparison">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={efficiencyData.workloadAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="efficiency" name="Efficiency (%)" fill="#4f46e5" />
                      <Bar dataKey="workload" name="Workload (%)" fill="#f97316" />
                      <Bar dataKey="outcomes" name="Outcomes (%)" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card title="Efficiency Radar">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={efficiencyData.performanceMetrics}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis angle={30} domain={[70, 100]} />
                      <Radar name="Current" dataKey="current" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
                      <Radar name="Target" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
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
                  <h4 className="font-medium text-blue-800">AI Efficiency Insights</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    The AI analysis shows an overall efficiency score of 89.2%, which is 2.1% higher than the previous period. 
                    The Commerce department is the top performer with 99% efficiency, while the Engineering department needs 
                    attention with 82% efficiency. The analysis reveals that workload and outcomes are well-correlated, 
                    with the Commerce department achieving the best balance. 
                    Recommendation: Implement workload rebalancing strategies for the Engineering department and 
                    replicate successful practices from the Commerce department across other departments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'workload' && (
          <div className="space-y-6">
            <Card title="Workload vs. Outcomes Analysis">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => setSortBy('department')}
                      >
                        Department
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => setSortBy('workload')}
                      >
                        Workload (%)
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => setSortBy('outcomes')}
                      >
                        Outcomes (%)
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => setSortBy('efficiency')}
                      >
                        Efficiency (%)
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
                    {efficiencyData.workloadAnalysis
                      .sort((a, b) => b[sortBy as keyof typeof a] - a[sortBy as keyof typeof a])
                      .map((dept, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.department}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.workload}%</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.outcomes}%</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.efficiency}%</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              dept.efficiency >= 95 ? 'bg-green-100 text-green-800' : 
                              dept.efficiency >= 85 ? 'bg-blue-100 text-blue-800' : 
                              dept.efficiency >= 75 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {dept.efficiency >= 95 ? 'Excellent' : 
                               dept.efficiency >= 85 ? 'Good' : 
                               dept.efficiency >= 75 ? 'Fair' : 'Needs Improvement'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-primary hover:text-primary-dark mr-3">
                              <i className="fa-solid fa-eye mr-1"></i> View
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                              <i className="fa-solid fa-chart-line mr-1"></i> Analyze
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Workload Distribution">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={efficiencyData.workloadAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="workload" name="Workload (%)" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card title="Outcome Achievement">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={efficiencyData.workloadAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="outcomes" name="Outcomes (%)" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-exclamation-triangle text-yellow-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-yellow-800">Workload Insights</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    The Engineering department has the highest workload (95%) but the lowest outcomes (78%), resulting in 
                    the lowest efficiency (82%). This indicates potential resource constraints or process inefficiencies. 
                    The Commerce department achieves the highest efficiency (99%) with a balanced workload (92%) and 
                    excellent outcomes (91%). 
                    Recommendation: Conduct a detailed workload analysis for the Engineering department and consider 
                    redistributing some tasks or providing additional resources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-6">
            <Card title="Productivity & Efficiency Trends">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={efficiencyData.productivityTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[75, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="productivity" 
                      stroke="#4f46e5" 
                      name="Productivity (%)" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="efficiency" 
                      stroke="#10b981" 
                      name="Efficiency (%)" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Monthly Productivity Analysis">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Productivity</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {efficiencyData.productivityTrends.map((month, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{month.month}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{month.productivity}%</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{month.efficiency}%</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm ${
                              index > 0 && month.efficiency > efficiencyData.productivityTrends[index-1].efficiency 
                                ? 'text-green-600' 
                                : index > 0 && month.efficiency < efficiencyData.productivityTrends[index-1].efficiency 
                                  ? 'text-red-600' 
                                  : 'text-gray-600'
                            }`}>
                              {index > 0 && month.efficiency > efficiencyData.productivityTrends[index-1].efficiency ? (
                                <><i className="fa-solid fa-arrow-up mr-1"></i> +{month.efficiency - efficiencyData.productivityTrends[index-1].efficiency}%</>
                              ) : index > 0 && month.efficiency < efficiencyData.productivityTrends[index-1].efficiency ? (
                                <><i className="fa-solid fa-arrow-down mr-1"></i> {month.efficiency - efficiencyData.productivityTrends[index-1].efficiency}%</>
                              ) : (
                                'Stable'
                              )}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card title="Performance Metrics Comparison">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={efficiencyData.performanceMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metric" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="current" name="Current (%)" fill="#4f46e5" />
                      <Bar dataKey="target" name="Target (%)" fill="#10b981" />
                      <Bar dataKey="industry" name="Industry Avg (%)" fill="#94a3b8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'drivers' && (
          <div className="space-y-6">
            <Card title="Key Efficiency Drivers">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={efficiencyData.efficiencyDrivers}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="driver" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="impact" name="Impact (%)" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {efficiencyData.efficiencyDrivers.map((driver, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <i className="fa-solid fa-bolt text-blue-600"></i>
                    </div>
                    <h3 className="font-medium text-gray-900">{driver.driver}</h3>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full bg-blue-500" 
                        style={{ width: `${driver.impact}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {driver.impact}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    {driver.impact >= 20 
                      ? 'High impact on overall efficiency. Priority investment area.' 
                      : driver.impact >= 15 
                        ? 'Moderate impact. Consider targeted improvements.' 
                        : 'Lower impact. Maintain current standards.'}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-lightbulb text-blue-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-blue-800">Efficiency Improvement Recommendations</h4>
                  <ul className="text-sm text-blue-700 mt-1 list-disc pl-5 space-y-1">
                    <li>Prioritize investment in training programs (25% impact) and technology tools (20% impact)</li>
                    <li>Enhance work environment quality to improve the 18% impact factor</li>
                    <li>Establish clearer objectives and recognition systems for all departments</li>
                    <li>Address workload imbalances, particularly in the Engineering department</li>
                    <li>Replicate Commerce department best practices across other departments</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AIStaffEfficiencyEvaluator;