import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Financials: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const [financialData] = useState({
    revenue: [
      { month: 'Jan', tuition: 120000, donations: 15000, grants: 25000, other: 8000 },
      { month: 'Feb', tuition: 115000, donations: 12000, grants: 30000, other: 7000 },
      { month: 'Mar', tuition: 125000, donations: 18000, grants: 20000, other: 9000 },
      { month: 'Apr', tuition: 130000, donations: 14000, grants: 22000, other: 10000 },
      { month: 'May', tuition: 128000, donations: 16000, grants: 28000, other: 8500 },
      { month: 'Jun', tuition: 135000, donations: 20000, grants: 25000, other: 9500 },
    ],
    expenses: [
      { month: 'Jan', salaries: 80000, utilities: 15000, maintenance: 10000, supplies: 8000, other: 7000 },
      { month: 'Feb', salaries: 82000, utilities: 14000, maintenance: 12000, supplies: 7500, other: 6500 },
      { month: 'Mar', salaries: 85000, utilities: 16000, maintenance: 11000, supplies: 8500, other: 7500 },
      { month: 'Apr', salaries: 83000, utilities: 15500, maintenance: 13000, supplies: 9000, other: 8000 },
      { month: 'May', salaries: 84000, utilities: 14500, maintenance: 12500, supplies: 8200, other: 7200 },
      { month: 'Jun', salaries: 86000, utilities: 16500, maintenance: 14000, supplies: 9500, other: 8500 },
    ],
    feeCollection: [
      { department: 'Science', collected: 95000, target: 100000 },
      { department: 'Arts', collected: 78000, target: 80000 },
      { department: 'Commerce', collected: 120000, target: 115000 },
      { department: 'Engineering', collected: 85000, target: 90000 },
    ],
    budgetAllocation: [
      { category: 'Salaries', amount: 500000, percentage: 60 },
      { category: 'Infrastructure', amount: 150000, percentage: 18 },
      { category: 'Technology', amount: 80000, percentage: 10 },
      { category: 'Research', amount: 50000, percentage: 6 },
      { category: 'Administration', amount: 50000, percentage: 6 },
    ]
  });

  const [timeRange, setTimeRange] = useState('6months');
  const [activeTab, setActiveTab] = useState('overview');

  const COLORS = ['#4f46e5', '#f97316', '#10b981', '#8b5cf6', '#ec4899'];

  const handleGenerateReport = () => {
    alert('Financial report generated and sent to your email');
  };

  const handleExportData = () => {
    alert('Financial data exported successfully');
  };

  return (
    <div className="space-y-6">
      <Card title="Financial Management" icon="fa-solid fa-chart-pie">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Revenue, Expenses & Budget Analysis</h3>
            <p className="text-gray-600 text-sm">Comprehensive financial overview and reporting</p>
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
              Financial Overview
            </button>
            <button
              onClick={() => setActiveTab('revenue')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'revenue'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Revenue Analysis
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'expenses'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Expense Tracking
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'budget'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Budget Allocation
            </button>
          </nav>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-indian-rupee-sign text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-xl font-bold text-gray-900">₹7,48,000</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-red-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-money-bill-wave text-red-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Expenses</p>
                    <p className="text-xl font-bold text-gray-900">₹5,16,000</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-chart-line text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Net Profit</p>
                    <p className="text-xl font-bold text-gray-900">₹2,32,000</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-percent text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Profit Margin</p>
                    <p className="text-xl font-bold text-gray-900">31.0%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Revenue vs Expenses Trend">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={financialData.revenue.map((rev, index) => ({
                      month: rev.month,
                      revenue: rev.tuition + rev.donations + rev.grants + rev.other,
                      expenses: financialData.expenses[index].salaries + financialData.expenses[index].utilities + 
                               financialData.expenses[index].maintenance + financialData.expenses[index].supplies + 
                               financialData.expenses[index].other
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#10b981" name="Revenue" strokeWidth={2} />
                      <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Expenses" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card title="Budget Allocation">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={financialData.budgetAllocation}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                        nameKey="category"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {financialData.budgetAllocation.map((entry, index) => (
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

        {activeTab === 'revenue' && (
          <div className="space-y-6">
            <Card title="Revenue Breakdown">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financialData.revenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="tuition" name="Tuition Fees" fill="#4f46e5" />
                    <Bar dataKey="donations" name="Donations" fill="#f97316" />
                    <Bar dataKey="grants" name="Grants" fill="#10b981" />
                    <Bar dataKey="other" name="Other Income" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Department-wise Fee Collection">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collected</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Achievement</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {financialData.feeCollection.map((dept, index) => {
                      const achievement = Math.round((dept.collected / dept.target) * 100);
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.department}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{dept.collected.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{dept.target.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{achievement}%</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    achievement >= 100 ? 'bg-green-500' : 
                                    achievement >= 90 ? 'bg-blue-500' : 
                                    achievement >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`} 
                                  style={{ width: `${Math.min(100, achievement)}%` }}
                                ></div>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                achievement >= 100 ? 'bg-green-100 text-green-800' : 
                                achievement >= 90 ? 'bg-blue-100 text-blue-800' : 
                                achievement >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {achievement >= 100 ? 'Exceeded' : achievement >= 90 ? 'On Track' : 'Needs Attention'}
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="space-y-6">
            <Card title="Expense Breakdown">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financialData.expenses}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="salaries" name="Salaries" fill="#4f46e5" />
                    <Bar dataKey="utilities" name="Utilities" fill="#f97316" />
                    <Bar dataKey="maintenance" name="Maintenance" fill="#10b981" />
                    <Bar dataKey="supplies" name="Supplies" fill="#8b5cf6" />
                    <Bar dataKey="other" name="Other Expenses" fill="#ec4899" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Expense Categories">
                <div className="space-y-4">
                  {[
                    { name: 'Salaries', amount: 500000, percentage: 60 },
                    { name: 'Infrastructure', amount: 150000, percentage: 18 },
                    { name: 'Technology', amount: 80000, percentage: 10 },
                    { name: 'Research', amount: 50000, percentage: 6 },
                    { name: 'Administration', amount: 50000, percentage: 6 },
                  ].map((category, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-32 text-sm font-medium text-gray-700">{category.name}</div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full bg-blue-500" 
                              style={{ width: `${category.percentage}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            ₹{category.amount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Monthly Expense Trend">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={financialData.expenses.map(exp => ({
                      month: exp.month,
                      total: exp.salaries + exp.utilities + exp.maintenance + exp.supplies + exp.other
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="total" 
                        stroke="#ef4444" 
                        name="Total Expenses" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="space-y-6">
            <Card title="Budget Allocation">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={financialData.budgetAllocation}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                      nameKey="category"
                      label={({ name, value }) => `${name}: ₹${value.toLocaleString()}`}
                    >
                      {financialData.budgetAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Amount']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Budget vs Actual Spending">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budgeted</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variance</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { category: 'Salaries', budgeted: 500000, actual: 495000 },
                      { category: 'Infrastructure', budgeted: 150000, actual: 155000 },
                      { category: 'Technology', budgeted: 80000, actual: 75000 },
                      { category: 'Research', budgeted: 50000, actual: 52000 },
                      { category: 'Administration', budgeted: 50000, actual: 48000 },
                    ].map((item, index) => {
                      const variance = item.actual - item.budgeted;
                      const variancePercentage = Math.round((variance / item.budgeted) * 100);
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.budgeted.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.actual.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={variance >= 0 ? 'text-red-600' : 'text-green-600'}>
                              {variance >= 0 ? '+' : ''}{variancePercentage}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              variance <= 0 ? 'bg-green-100 text-green-800' : 
                              variance <= (item.budgeted * 0.05) ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {variance <= 0 ? 'Under Budget' : 
                               variance <= (item.budgeted * 0.05) ? 'Within Threshold' : 'Over Budget'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
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

export default Financials;