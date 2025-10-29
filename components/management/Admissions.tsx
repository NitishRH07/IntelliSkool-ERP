import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Admissions: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const [admissionData] = useState({
    applications: [
      { month: 'Jan', applications: 120, accepted: 95, rejected: 25 },
      { month: 'Feb', applications: 135, accepted: 105, rejected: 30 },
      { month: 'Mar', applications: 150, accepted: 120, rejected: 30 },
      { month: 'Apr', applications: 140, accepted: 110, rejected: 30 },
      { month: 'May', applications: 160, accepted: 125, rejected: 35 },
      { month: 'Jun', applications: 175, accepted: 140, rejected: 35 },
    ],
    demographics: [
      { category: 'Science', applications: 220, accepted: 175 },
      { category: 'Arts', applications: 180, accepted: 145 },
      { category: 'Commerce', applications: 250, accepted: 200 },
      { category: 'Engineering', applications: 190, accepted: 155 },
    ],
    sources: [
      { source: 'Online Portal', count: 450 },
      { source: 'Referral', count: 180 },
      { source: 'Advertisement', count: 120 },
      { source: 'Walk-in', count: 90 },
    ],
    conversion: [
      { stage: 'Application', count: 840 },
      { stage: 'Document Verification', count: 780 },
      { stage: 'Entrance Test', count: 650 },
      { stage: 'Interview', count: 520 },
      { stage: 'Accepted', count: 675 },
    ]
  });

  const [timeRange, setTimeRange] = useState('6months');
  const [activeTab, setActiveTab] = useState('overview');

  const COLORS = ['#4f46e5', '#f97316', '#10b981', '#8b5cf6', '#ec4899'];

  const handleGenerateReport = () => {
    alert('Admissions report generated and sent to your email');
  };

  const handleExportData = () => {
    alert('Admissions data exported successfully');
  };

  const handlePredictAdmissions = () => {
    alert('AI admission prediction in progress. This may take a few moments...');
  };

  return (
    <div className="space-y-6">
      <Card title="Admissions Management" icon="fa-solid fa-user-plus">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Student Applications & Enrollment</h3>
            <p className="text-gray-600 text-sm">Track admissions process and analyze trends</p>
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
            <Button onClick={handlePredictAdmissions}>
              <i className="fa-solid fa-brain mr-2"></i> AI Prediction
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
              Admissions Overview
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'trends'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Application Trends
            </button>
            <button
              onClick={() => setActiveTab('demographics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'demographics'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Demographics
            </button>
            <button
              onClick={() => setActiveTab('conversion')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'conversion'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Conversion Funnel
            </button>
          </nav>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-file-alt text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Applications</p>
                    <p className="text-xl font-bold text-gray-900">840</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-check-circle text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Accepted</p>
                    <p className="text-xl font-bold text-gray-900">675</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-red-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-times-circle text-red-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Rejected</p>
                    <p className="text-xl font-bold text-gray-900">165</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-percent text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Acceptance Rate</p>
                    <p className="text-xl font-bold text-gray-900">80.4%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Applications Trend">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={admissionData.applications}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="applications" stroke="#4f46e5" name="Applications" strokeWidth={2} />
                      <Line type="monotone" dataKey="accepted" stroke="#10b981" name="Accepted" strokeWidth={2} />
                      <Line type="monotone" dataKey="rejected" stroke="#ef4444" name="Rejected" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card title="Application Sources">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={admissionData.sources}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="source"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {admissionData.sources.map((entry, index) => (
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

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-robot text-blue-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-blue-800">AI Admission Insights</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    The AI analysis shows a 12% increase in applications compared to the same period last year. 
                    The acceptance rate is stable at 80.4%, which is within the target range of 75-85%. 
                    The most effective application source is the online portal (54% of applications). 
                    Recommendation: Increase marketing efforts for the Engineering program which has a lower 
                    acceptance rate than other departments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-6">
            <Card title="Monthly Applications">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={admissionData.applications}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="applications" name="Applications" fill="#4f46e5" />
                    <Bar dataKey="accepted" name="Accepted" fill="#10b981" />
                    <Bar dataKey="rejected" name="Rejected" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Acceptance Rate Trend">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={admissionData.applications.map(app => ({
                      month: app.month,
                      rate: Math.round((app.accepted / app.applications) * 100)
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[70, 90]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="rate" 
                        stroke="#8b5cf6" 
                        name="Acceptance Rate (%)" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card title="Application Growth">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={admissionData.applications.map((app, index, arr) => ({
                      month: app.month,
                      growth: index === 0 ? 0 : Math.round(((app.applications - arr[index-1].applications) / arr[index-1].applications) * 100)
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="growth" name="Growth (%)" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'demographics' && (
          <div className="space-y-6">
            <Card title="Department-wise Applications">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={admissionData.demographics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="applications" name="Applications" fill="#4f46e5" />
                    <Bar dataKey="accepted" name="Accepted" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Acceptance Rate by Department">
                <div className="space-y-4">
                  {admissionData.demographics.map((dept, index) => {
                    const acceptanceRate = Math.round((dept.accepted / dept.applications) * 100);
                    return (
                      <div key={index} className="flex items-center">
                        <div className="w-32 text-sm font-medium text-gray-700">{dept.category}</div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  acceptanceRate >= 85 ? 'bg-green-500' : 
                                  acceptanceRate >= 75 ? 'bg-blue-500' : 'bg-yellow-500'
                                }`} 
                                style={{ width: `${acceptanceRate}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-700">
                              {acceptanceRate}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card title="Department Distribution">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={admissionData.demographics}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="applications"
                        nameKey="category"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {admissionData.demographics.map((entry, index) => (
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
          </div>
        )}

        {activeTab === 'conversion' && (
          <div className="space-y-6">
            <Card title="Admission Conversion Funnel">
              <div className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <i className="fa-solid fa-funnel text-4xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500">Conversion funnel visualization would appear here</p>
                </div>
              </div>
            </Card>

            <Card title="Funnel Stages">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion Rate</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drop-off</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {admissionData.conversion.map((stage, index, arr) => {
                      const conversionRate = index === 0 ? 100 : Math.round((stage.count / arr[0].count) * 100);
                      const dropOff = index === 0 ? 0 : arr[index-1].count - stage.count;
                      const dropOffRate = index === 0 ? 0 : Math.round((dropOff / arr[index-1].count) * 100);
                      
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stage.stage}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stage.count}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{conversionRate}%</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {index === 0 ? '-' : `${dropOff} (${dropOffRate}%)`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-exclamation-triangle text-yellow-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-yellow-800">Conversion Funnel Insights</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    The largest drop-off occurs between the Entrance Test and Interview stages (23% drop-off rate). 
                    This suggests that the entrance test may be too challenging or that additional support is needed 
                    for students preparing for the interview. Recommendation: Review the entrance test difficulty 
                    and provide preparation resources to improve the conversion rate.
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

export default Admissions;