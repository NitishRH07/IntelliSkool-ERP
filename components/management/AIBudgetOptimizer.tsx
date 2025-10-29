import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';

const AIBudgetOptimizer: React.FC = () => {
  // Mock data - in a real app, this would come from an API or ML model
  const [budgetData] = useState({
    currentAllocation: [
      { category: 'Salaries', amount: 500000, percentage: 60 },
      { category: 'Infrastructure', amount: 150000, percentage: 18 },
      { category: 'Technology', amount: 80000, percentage: 10 },
      { category: 'Research', amount: 50000, percentage: 6 },
      { category: 'Administration', amount: 50000, percentage: 6 },
    ],
    optimizedAllocation: [
      { category: 'Salaries', amount: 480000, percentage: 58 },
      { category: 'Infrastructure', amount: 140000, percentage: 17 },
      { category: 'Technology', amount: 120000, percentage: 14 },
      { category: 'Research', amount: 60000, percentage: 7 },
      { category: 'Administration', amount: 40000, percentage: 4 },
      { category: 'Student Programs', amount: 20000, percentage: 2 },
      { category: 'Faculty Development', amount: 15000, percentage: 2 },
    ],
    impactProjection: [
      { metric: 'Academic Performance', current: 85, optimized: 92, improvement: 7 },
      { metric: 'Student Satisfaction', current: 82, optimized: 88, improvement: 6 },
      { metric: 'Faculty Retention', current: 89, optimized: 93, improvement: 4 },
      { metric: 'Research Output', current: 75, optimized: 85, improvement: 10 },
      { metric: 'Operational Efficiency', current: 78, optimized: 85, improvement: 7 },
    ],
    costBenefitAnalysis: [
      { initiative: 'Technology Upgrade', cost: 40000, benefit: 85000, roi: 112.5 },
      { initiative: 'Faculty Development', cost: 15000, benefit: 35000, roi: 133.3 },
      { initiative: 'Student Programs', cost: 20000, benefit: 45000, roi: 125.0 },
      { initiative: 'Research Enhancement', cost: 10000, benefit: 25000, roi: 150.0 },
    ]
  });

  const [timeRange, setTimeRange] = useState('1year');
  const [activeTab, setActiveTab] = useState('optimizer');
  const [optimizationLevel, setOptimizationLevel] = useState('balanced');

  const COLORS = ['#4f46e5', '#f97316', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#f43f5e'];

  const handleGenerateReport = () => {
    alert('AI Budget Optimization report generated and sent to your email');
  };

  const handleExportData = () => {
    alert('Budget optimization data exported successfully');
  };

  const handleRunOptimization = () => {
    alert('Running advanced budget optimization analysis. This may take a few moments...');
  };

  const handleApplyOptimization = () => {
    alert('Budget optimization recommendations applied. Please review and confirm changes.');
  };

  return (
    <div className="space-y-6">
      <Card title="AI Budget Optimizer" icon="fa-solid fa-money-bill-trend-up">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Recommends Best Fund Allocations Based on Usage and Impact</h3>
            <p className="text-gray-600 text-sm">AI-powered budget optimization for maximum institutional impact</p>
          </div>
          <div className="flex space-x-2">
            <select
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="6months">Next 6 Months</option>
              <option value="1year">Next 1 Year</option>
              <option value="2years">Next 2 Years</option>
              <option value="5years">Next 5 Years</option>
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={optimizationLevel}
              onChange={(e) => setOptimizationLevel(e.target.value)}
            >
              <option value="conservative">Conservative</option>
              <option value="balanced">Balanced</option>
              <option value="aggressive">Aggressive</option>
            </select>
            <Button onClick={handleRunOptimization}>
              <i className="fa-solid fa-brain mr-2"></i> Run Optimization
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
              onClick={() => setActiveTab('optimizer')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'optimizer'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Budget Optimization
            </button>
            <button
              onClick={() => setActiveTab('allocation')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'allocation'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Allocation Analysis
            </button>
            <button
              onClick={() => setActiveTab('projection')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'projection'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Impact Projection
            </button>
            <button
              onClick={() => setActiveTab('roi')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'roi'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ROI Analysis
            </button>
          </nav>
        </div>

        {activeTab === 'optimizer' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-indian-rupee-sign text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Budget</p>
                    <p className="text-xl font-bold text-gray-900">₹8,30,000</p>
                    <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 5% increase</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-chart-line text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Projected ROI</p>
                    <p className="text-xl font-bold text-gray-900">128%</p>
                    <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 15% improvement</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-lightbulb text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Optimization Score</p>
                    <p className="text-xl font-bold text-gray-900">87/100</p>
                    <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 8 pts increase</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Current Budget Allocation">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={budgetData.currentAllocation}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                        nameKey="category"
                        label={({ name, percent }) => `${name}: ${(Number(percent) * 100).toFixed(0)}%`}
                      >
                        {budgetData.currentAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Amount']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card title="AI-Optimized Allocation">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={budgetData.optimizedAllocation}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                        nameKey="category"
                        label={({ name, percent }) => `${name}: ${(Number(percent) * 100).toFixed(0)}%`}
                      >
                        {budgetData.optimizedAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Amount']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="flex justify-center my-4">
              <Button onClick={handleApplyOptimization} variant="primary">
                <i className="fa-solid fa-check-circle mr-2"></i> Apply Optimization Recommendations
              </Button>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="fa-solid fa-lightbulb text-yellow-400"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>AI Recommendation:</strong> Shifting 2% of budget from Salaries to Technology and adding Student Programs allocation could improve research output by 10% and operational efficiency by 7%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'allocation' && (
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Allocation</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Optimized Allocation</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {budgetData.optimizedAllocation.map((item, index) => {
                    const currentItem = budgetData.currentAllocation.find(i => i.category === item.category);
                    const change = currentItem ? item.amount - currentItem.amount : item.amount;
                    const changePercent = currentItem ? ((change / currentItem.amount) * 100) : 100;
                    
                    return (
                      <tr key={item.category}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{currentItem ? currentItem.amount.toLocaleString() : '0'} 
                          ({currentItem ? currentItem.percentage : 0}%)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{item.amount.toLocaleString()} ({item.percentage}%)
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {change >= 0 ? '+' : ''}{change.toLocaleString()} 
                          ({changePercent.toFixed(1)}%)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Positive
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  
                  {/* Handle categories that exist in current but not in optimized */}
                  {budgetData.currentAllocation.filter(item => !budgetData.optimizedAllocation.some(i => i.category === item.category)).map(item => (
                    <tr key={item.category}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{item.amount.toLocaleString()} ({item.percentage}%)
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹0 (0%)</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">-₹{item.amount.toLocaleString()} (-100%)</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Review Needed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'projection' && (
          <div className="space-y-6">
            <Card title="Performance Impact Projection">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={budgetData.impactProjection}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" name="Current State" fill="#8884d8" />
                    <Bar dataKey="optimized" name="After Optimization" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {budgetData.impactProjection.map((item, index) => (
                <div key={item.metric} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.metric}</h4>
                      <p className="text-2xl font-bold mt-2">{item.optimized}<span className="text-sm font-normal text-gray-600">/{item.current}</span></p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.improvement > 5 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      +{item.improvement} pts
                    </span>
                  </div>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" 
                      style={{ width: `${(item.optimized / 100) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'roi' && (
          <div className="space-y-6">
            <Card title="Cost-Benefit Analysis of Recommended Initiatives">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={budgetData.costBenefitAnalysis}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="initiative" type="category" scale="band" />
                    <Tooltip formatter={(value, name) => name === 'roi' ? [`${value}%`, 'ROI'] : [`₹${Number(value).toLocaleString()}`, name === 'cost' ? 'Cost' : 'Benefit']} />
                    <Legend />
                    <Bar dataKey="cost" name="Investment Cost" fill="#ff6b6b" />
                    <Bar dataKey="benefit" name="Expected Benefit" fill="#4ecdc4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="ROI Summary">
                <div className="space-y-4">
                  {budgetData.costBenefitAnalysis.map((item, index) => (
                    <div key={item.initiative} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.initiative}</h4>
                        <p className="text-sm text-gray-600">ROI: {item.roi}%</p>
                      </div>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className={`h-2 rounded-full ${item.roi > 130 ? 'bg-green-500' : item.roi > 100 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                            style={{ width: `${Math.min(item.roi, 200) / 2}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${
                          item.roi > 130 ? 'text-green-600' : item.roi > 100 ? 'text-blue-600' : 'text-yellow-600'
                        }`}>
                          {item.roi > 130 ? 'Excellent' : item.roi > 100 ? 'Good' : 'Fair'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card title="Investment Priority Matrix">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid />
                      <XAxis type="number" dataKey="cost" name="Cost" />
                      <YAxis type="number" dataKey="roi" name="ROI (%)" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Scatter name="Initiatives" data={budgetData.costBenefitAnalysis} fill="#8884d8">
                        {budgetData.costBenefitAnalysis.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={
                            entry.roi > 130 ? '#10b981' : 
                            entry.roi > 100 ? '#3b82f6' : '#f59e0b'
                          } />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-xs">High ROI (&gt;130%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-xs">Good ROI (100-130%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-xs">Fair ROI (&lt;100%)</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AIBudgetOptimizer;
