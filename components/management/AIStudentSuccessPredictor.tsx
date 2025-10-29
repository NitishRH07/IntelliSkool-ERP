import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const AIStudentSuccessPredictor: React.FC = () => {
  // Mock data - in a real app, this would come from an API or ML model
  const [successData] = useState({
    departmentPerformance: [
      { department: 'Science', performance: 88, successRate: 92, riskLevel: 'Low' },
      { department: 'Arts', performance: 82, successRate: 85, riskLevel: 'Medium' },
      { department: 'Commerce', performance: 91, successRate: 95, riskLevel: 'Low' },
      { department: 'Engineering', performance: 78, successRate: 75, riskLevel: 'High' },
    ],
    successFactors: [
      { factor: 'Academic Performance', weight: 30, score: 85 },
      { factor: 'Attendance', weight: 25, score: 91 },
      { factor: 'Participation', weight: 15, score: 78 },
      { factor: 'Assignments', weight: 15, score: 82 },
      { factor: 'Extracurricular', weight: 10, score: 75 },
      { factor: 'Behavior', weight: 5, score: 90 },
    ],
    riskAnalysis: [
      { month: 'Jan 2024', atRisk: 15, moderateRisk: 25, lowRisk: 60 },
      { month: 'Feb 2024', atRisk: 12, moderateRisk: 28, lowRisk: 60 },
      { month: 'Mar 2024', atRisk: 10, moderateRisk: 22, lowRisk: 68 },
      { month: 'Apr 2024', atRisk: 14, moderateRisk: 26, lowRisk: 60 },
      { month: 'May 2024', atRisk: 8, moderateRisk: 20, lowRisk: 72 },
      { month: 'Jun 2024', atRisk: 6, moderateRisk: 18, lowRisk: 76 },
    ],
    interventionEffectiveness: [
      { intervention: 'Tutoring Program', before: 65, after: 85, improvement: 20 },
      { intervention: 'Attendance Support', before: 75, after: 92, improvement: 17 },
      { intervention: 'Counseling Services', before: 70, after: 88, improvement: 18 },
      { intervention: 'Study Groups', before: 60, after: 78, improvement: 18 },
      { intervention: 'Parent Engagement', before: 55, after: 75, improvement: 20 },
    ]
  });

  const [timeRange, setTimeRange] = useState('6months');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const COLORS = ['#4f46e5', '#f97316', '#10b981', '#8b5cf6', '#ec4899'];

  const handleGenerateReport = () => {
    alert('AI Student Success Prediction report generated and sent to your email');
  };

  const handleExportData = () => {
    alert('Success prediction data exported successfully');
  };

  const handleRunAnalysis = () => {
    alert('Running advanced student success prediction analysis. This may take a few moments...');
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card title="AI Student Success Predictor" icon="fa-solid fa-chart-pie">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Highlights Departments with Strong or Weak Academic Outcomes</h3>
            <p className="text-gray-600 text-sm">AI-powered prediction of student success and risk factors</p>
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
            <select
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="Science">Science</option>
              <option value="Arts">Arts</option>
              <option value="Commerce">Commerce</option>
              <option value="Engineering">Engineering</option>
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
              Success Overview
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
              onClick={() => setActiveTab('factors')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'factors'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Success Factors
            </button>
            <button
              onClick={() => setActiveTab('risk')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'risk'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Risk Analysis
            </button>
          </nav>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-graduation-cap text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Overall Success Rate</p>
                    <p className="text-xl font-bold text-gray-900">87.5%</p>
                    <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 3.2% from last period</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-users text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Students at Risk</p>
                    <p className="text-xl font-bold text-gray-900">6%</p>
                    <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-down mr-1"></i> 2.1% from last period</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-trophy text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Top Performing Dept</p>
                    <p className="text-xl font-bold text-gray-900">Commerce</p>
                    <p className="text-xs text-gray-600 mt-1">95% success rate</p>
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
                    <p className="text-xs text-gray-600 mt-1">75% success rate</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Department Success Rates">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={successData.departmentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="successRate" name="Success Rate (%)" fill="#4f46e5" />
                      <Bar dataKey="performance" name="Performance (%)" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card title="Risk Distribution">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Low Risk', value: 76 },
                          { name: 'Moderate Risk', value: 18 },
                          { name: 'High Risk', value: 6 }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell key="cell-0" fill="#10b981" />
                        <Cell key="cell-1" fill="#f97316" />
                        <Cell key="cell-2" fill="#ef4444" />
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
                <i className="fa-solid fa-robot text-blue-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-blue-800">AI Success Prediction Insights</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    The AI analysis shows an overall success rate of 87.5%, which is 3.2% higher than the previous period. 
                    Only 6% of students are currently at high risk, down from 8.1% last period. The Commerce department 
                    continues to excel with a 95% success rate, while the Engineering department needs attention with 
                    a 75% success rate. Key success factors include academic performance (30% weight) and attendance (25% weight). 
                    Recommendation: Implement targeted interventions for the Engineering department and replicate 
                    successful practices from the Commerce department.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="space-y-6">
            <Card title="Department-wise Success Analysis">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Performance (%)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Success Rate (%)
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Risk Level
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students at Risk
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {successData.departmentPerformance.map((dept, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.performance}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.successRate}%</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${getRiskColor(dept.riskLevel)}`}>
                            {dept.riskLevel}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {dept.riskLevel === 'High' ? '15-20%' : dept.riskLevel === 'Medium' ? '8-12%' : '3-5%'}
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
              <Card title="Performance vs Success Rate">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={successData.departmentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="performance" name="Performance (%)" fill="#4f46e5" />
                      <Bar dataKey="successRate" name="Success Rate (%)" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card title="Success Radar">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={successData.departmentPerformance}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="department" />
                      <PolarRadiusAxis angle={30} domain={[70, 100]} />
                      <Radar name="Performance" dataKey="performance" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
                      <Radar name="Success Rate" dataKey="successRate" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-exclamation-triangle text-yellow-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-yellow-800">Department Insights</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    The Engineering department shows the lowest performance (78%) and success rate (75%) with a high risk level. 
                    This correlates with higher absenteeism and lower assignment completion rates. The Commerce department 
                    excels with 91% performance and 95% success rate, indicating effective teaching methods and student engagement. 
                    Recommendation: Conduct a detailed analysis of the Engineering department's challenges and implement 
                    targeted support programs. Consider replicating successful Commerce department practices across other departments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'factors' && (
          <div className="space-y-6">
            <Card title="Key Success Factors">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={successData.successFactors}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="factor" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" name="Factor Score" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {successData.successFactors.map((factor, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <i className="fa-solid fa-star text-blue-600"></i>
                    </div>
                    <h3 className="font-medium text-gray-900">{factor.factor}</h3>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full bg-blue-500" 
                        style={{ width: `${factor.score}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {factor.score}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Weight: {factor.weight}%</span>
                    <span>Impact: {Math.round(factor.score * factor.weight / 100)} pts</span>
                  </div>
                </div>
              ))}
            </div>

            <Card title="Factor Correlation Analysis">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={successData.successFactors}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="factor" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="weight" name="Weight (%)" fill="#f97316" />
                    <Bar dataKey="score" name="Score (%)" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-lightbulb text-blue-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-blue-800">Success Factor Recommendations</h4>
                  <ul className="text-sm text-blue-700 mt-1 list-disc pl-5 space-y-1">
                    <li>Prioritize academic performance (30% weight) and attendance (25% weight) as they have the highest impact</li>
                    <li>Improve participation scores (currently 78%) through more interactive teaching methods</li>
                    <li>Enhance extracurricular engagement (currently 75%) to boost overall student development</li>
                    <li>Maintain high behavior scores (90%) through continued positive reinforcement</li>
                    <li>Focus on assignment completion rates to improve the 15% weight factor</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="space-y-6">
            <Card title="Student Risk Analysis">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={successData.riskAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="atRisk" 
                      stroke="#ef4444" 
                      name="High Risk Students" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="moderateRisk" 
                      stroke="#f97316" 
                      name="Moderate Risk Students" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="lowRisk" 
                      stroke="#10b981" 
                      name="Low Risk Students" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Risk Trend Analysis">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">High Risk</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Moderate Risk</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Low Risk</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {successData.riskAnalysis.map((month, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{month.month}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{month.atRisk}%</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{month.moderateRisk}%</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{month.lowRisk}%</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm ${
                              index > 0 && month.atRisk < successData.riskAnalysis[index-1].atRisk 
                                ? 'text-green-600' 
                                : index > 0 && month.atRisk > successData.riskAnalysis[index-1].atRisk 
                                  ? 'text-red-600' 
                                  : 'text-gray-600'
                            }`}>
                              {index > 0 && month.atRisk < successData.riskAnalysis[index-1].atRisk ? (
                                <><i className="fa-solid fa-arrow-down mr-1"></i> -{successData.riskAnalysis[index-1].atRisk - month.atRisk}%</>
                              ) : index > 0 && month.atRisk > successData.riskAnalysis[index-1].atRisk ? (
                                <><i className="fa-solid fa-arrow-up mr-1"></i> +{month.atRisk - successData.riskAnalysis[index-1].atRisk}%</>
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

              <Card title="Intervention Effectiveness">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={successData.interventionEffectiveness}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="intervention" />
                      <YAxis domain={[50, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="before" name="Before Intervention (%)" fill="#94a3b8" />
                      <Bar dataKey="after" name="After Intervention (%)" fill="#4f46e5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-robot text-blue-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-blue-800">Risk Analysis Insights</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    The AI analysis shows a positive trend with high-risk students decreasing from 15% to 6% over the last 6 months. 
                    The attendance support program showed the highest improvement (17 percentage points), followed by 
                    parent engagement (20 percentage points). All interventions have been effective, with an average 
                    improvement of 18.6 percentage points. 
                    Recommendation: Continue current interventions while scaling successful programs like attendance support 
                    and parent engagement. Monitor the Engineering department closely as it still has the highest risk concentration.
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

export default AIStudentSuccessPredictor;