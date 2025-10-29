import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AIFinancialForecasting: React.FC = () => {
  // Mock data - in a real app, this would come from an API or ML model
  const [forecastData] = useState({
    revenueForecast: [
      { month: 'Jul 2024', actual: null, forecast: 140000, lower: 130000, upper: 150000 },
      { month: 'Aug 2024', actual: null, forecast: 145000, lower: 135000, upper: 155000 },
      { month: 'Sep 2024', actual: null, forecast: 150000, lower: 140000, upper: 160000 },
      { month: 'Oct 2024', actual: null, forecast: 155000, lower: 145000, upper: 165000 },
      { month: 'Nov 2024', actual: null, forecast: 160000, lower: 150000, upper: 170000 },
      { month: 'Dec 2024', actual: null, forecast: 165000, lower: 155000, upper: 175000 },
      { month: 'Jan 2025', actual: null, forecast: 170000, lower: 160000, upper: 180000 },
    ],
    expenseForecast: [
      { month: 'Jul 2024', actual: null, forecast: 90000, lower: 85000, upper: 95000 },
      { month: 'Aug 2024', actual: null, forecast: 92000, lower: 87000, upper: 97000 },
      { month: 'Sep 2024', actual: null, forecast: 94000, lower: 89000, upper: 99000 },
      { month: 'Oct 2024', actual: null, forecast: 96000, lower: 91000, upper: 101000 },
      { month: 'Nov 2024', actual: null, forecast: 98000, lower: 93000, upper: 103000 },
      { month: 'Dec 2024', actual: null, forecast: 100000, lower: 95000, upper: 105000 },
      { month: 'Jan 2025', actual: null, forecast: 102000, lower: 97000, upper: 107000 },
    ],
    cashFlowForecast: [
      { month: 'Jul 2024', revenue: 140000, expenses: 90000, cashFlow: 50000 },
      { month: 'Aug 2024', revenue: 145000, expenses: 92000, cashFlow: 53000 },
      { month: 'Sep 2024', revenue: 150000, expenses: 94000, cashFlow: 56000 },
      { month: 'Oct 2024', revenue: 155000, expenses: 96000, cashFlow: 59000 },
      { month: 'Nov 2024', revenue: 160000, expenses: 98000, cashFlow: 62000 },
      { month: 'Dec 2024', revenue: 165000, expenses: 100000, cashFlow: 65000 },
      { month: 'Jan 2025', revenue: 170000, expenses: 102000, cashFlow: 68000 },
    ],
    scenarioAnalysis: [
      { scenario: 'Optimistic', revenue: 190000, expenses: 95000, profit: 95000 },
      { scenario: 'Expected', revenue: 165000, expenses: 100000, profit: 65000 },
      { scenario: 'Pessimistic', revenue: 140000, expenses: 105000, profit: 35000 },
    ],
    keyMetrics: {
      projectedRevenue: 165000,
      projectedExpenses: 100000,
      projectedProfit: 65000,
      profitMargin: 39.4,
      cashReserves: 250000,
      breakEvenPoint: 120000,
    }
  });

  const [timeRange, setTimeRange] = useState('6months');
  const [activeTab, setActiveTab] = useState('forecast');
  const [confidenceInterval, setConfidenceInterval] = useState(95);

  const COLORS = ['#4f46e5', '#f97316', '#10b981', '#8b5cf6', '#ec4899'];

  const handleGenerateReport = () => {
    alert('AI Financial Forecast report generated and sent to your email');
  };

  const handleExportData = () => {
    alert('Forecast data exported successfully');
  };

  const handleRunAnalysis = () => {
    alert('Running advanced financial forecasting analysis. This may take a few moments...');
  };

  return (
    <div className="space-y-6">
      <Card title="AI Financial Forecasting" icon="fa-solid fa-chart-line">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Predicts Future Revenue, Expenses, and Cash Flow Using ML Models</h3>
            <p className="text-gray-600 text-sm">AI-powered financial projections with confidence intervals</p>
          </div>
          <div className="flex space-x-2">
            <select
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="3months">Next 3 Months</option>
              <option value="6months">Next 6 Months</option>
              <option value="1year">Next 1 Year</option>
              <option value="2years">Next 2 Years</option>
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={confidenceInterval}
              onChange={(e) => setConfidenceInterval(Number(e.target.value))}
            >
              <option value={80}>80% Confidence</option>
              <option value={90}>90% Confidence</option>
              <option value={95}>95% Confidence</option>
              <option value={99}>99% Confidence</option>
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
              onClick={() => setActiveTab('forecast')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'forecast'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Financial Forecast
            </button>
            <button
              onClick={() => setActiveTab('cashflow')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'cashflow'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Cash Flow Analysis
            </button>
            <button
              onClick={() => setActiveTab('scenarios')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'scenarios'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Scenario Analysis
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'metrics'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Key Metrics
            </button>
          </nav>
        </div>

        {activeTab === 'forecast' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-indian-rupee-sign text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Projected Revenue</p>
                    <p className="text-xl font-bold text-gray-900">₹{forecastData.keyMetrics.projectedRevenue.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 8.2% growth</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-red-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-money-bill-wave text-red-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Projected Expenses</p>
                    <p className="text-xl font-bold text-gray-900">₹{forecastData.keyMetrics.projectedExpenses.toLocaleString()}</p>
                    <p className="text-xs text-red-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 5.3% increase</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-chart-line text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Projected Profit</p>
                    <p className="text-xl font-bold text-gray-900">₹{forecastData.keyMetrics.projectedProfit.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 12.4% growth</p>
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
                    <p className="text-xl font-bold text-gray-900">{forecastData.keyMetrics.profitMargin}%</p>
                    <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 2.1 pts improvement</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Revenue Forecast with Confidence Intervals">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={forecastData.revenueForecast}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="forecast" 
                        stroke="#4f46e5" 
                        name="Revenue Forecast" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="lower" 
                        stroke="#94a3b8" 
                        name="Lower Bound" 
                        strokeDasharray="3 3"
                        strokeWidth={1}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="upper" 
                        stroke="#94a3b8" 
                        name="Upper Bound" 
                        strokeDasharray="3 3"
                        strokeWidth={1}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card title="Expense Forecast">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={forecastData.expenseForecast}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="forecast" 
                        stroke="#f97316" 
                        name="Expense Forecast" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="lower" 
                        stroke="#94a3b8" 
                        name="Lower Bound" 
                        strokeDasharray="3 3"
                        strokeWidth={1}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="upper" 
                        stroke="#94a3b8" 
                        name="Upper Bound" 
                        strokeDasharray="3 3"
                        strokeWidth={1}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-robot text-blue-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-blue-800">AI Financial Insights</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    The AI forecasting model predicts a steady 8.2% revenue growth over the next 6 months with controlled 
                    expense increases of 5.3%. This results in a 12.4% profit growth and a 2.1 percentage point improvement 
                    in profit margin. The model has a 95% confidence interval with a standard deviation of 5%. 
                    Recommendation: Focus on maintaining current growth trajectories while exploring new revenue streams 
                    to accelerate the positive trend.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cashflow' && (
          <div className="space-y-6">
            <Card title="Cash Flow Forecast">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={forecastData.cashFlowForecast}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="#4f46e5" />
                    <Bar dataKey="expenses" name="Expenses" fill="#f97316" />
                    <Bar dataKey="cashFlow" name="Net Cash Flow" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card title="Cash Reserves">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-piggy-bank text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Reserves</p>
                    <p className="text-2xl font-bold text-gray-900">₹{forecastData.keyMetrics.cashReserves.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Utilization</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </Card>

              <Card title="Break-even Analysis">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-balance-scale text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Break-even Point</p>
                    <p className="text-2xl font-bold text-gray-900">₹{forecastData.keyMetrics.breakEvenPoint.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    Current monthly revenue of ₹165,000 is <span className="text-green-600 font-medium">40% above</span> break-even
                  </p>
                </div>
              </Card>

              <Card title="Liquidity Ratio">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <i className="fa-solid fa-droplet text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Ratio</p>
                    <p className="text-2xl font-bold text-gray-900">2.75:1</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    <span className="text-green-600">Healthy</span> liquidity position
                  </p>
                </div>
              </Card>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-exclamation-triangle text-yellow-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-yellow-800">Cash Flow Insights</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    The forecast shows consistent positive cash flow growth, reaching ₹68,000 by January 2025. 
                    Current cash reserves of ₹250,000 provide a strong buffer for 4-5 months of operations. 
                    The break-even point is ₹120,000, with current revenue 40% above this threshold. 
                    Recommendation: Maintain current cash management practices while considering strategic investments 
                    in growth initiatives that can further improve cash flow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scenarios' && (
          <div className="space-y-6">
            <Card title="Scenario Analysis">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={forecastData.scenarioAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="scenario" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="#4f46e5" />
                    <Bar dataKey="expenses" name="Expenses" fill="#f97316" />
                    <Bar dataKey="profit" name="Profit" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-green-200 rounded-lg p-5 bg-green-50">
                <h3 className="font-medium text-green-800 mb-2">Optimistic Scenario</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Revenue:</span>
                    <span className="text-sm font-medium">₹1,90,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Expenses:</span>
                    <span className="text-sm font-medium">₹95,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Profit:</span>
                    <span className="text-sm font-medium text-green-600">₹95,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Profit Margin:</span>
                    <span className="text-sm font-medium">50.0%</span>
                  </div>
                </div>
                <p className="text-xs text-green-700 mt-3">
                  Achieved through 15% revenue growth and 5% expense control
                </p>
              </div>

              <div className="border border-blue-200 rounded-lg p-5 bg-blue-50">
                <h3 className="font-medium text-blue-800 mb-2">Expected Scenario</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Revenue:</span>
                    <span className="text-sm font-medium">₹1,65,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Expenses:</span>
                    <span className="text-sm font-medium">₹1,00,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Profit:</span>
                    <span className="text-sm font-medium text-blue-600">₹65,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Profit Margin:</span>
                    <span className="text-sm font-medium">39.4%</span>
                  </div>
                </div>
                <p className="text-xs text-blue-700 mt-3">
                  Based on current trends and moderate growth assumptions
                </p>
              </div>

              <div className="border border-orange-200 rounded-lg p-5 bg-orange-50">
                <h3 className="font-medium text-orange-800 mb-2">Pessimistic Scenario</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Revenue:</span>
                    <span className="text-sm font-medium">₹1,40,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Expenses:</span>
                    <span className="text-sm font-medium">₹1,05,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Profit:</span>
                    <span className="text-sm font-medium text-orange-600">₹35,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Profit Margin:</span>
                    <span className="text-sm font-medium">25.0%</span>
                  </div>
                </div>
                <p className="text-xs text-orange-700 mt-3">
                  Resulting from 8% revenue decline and 5% expense increase
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
              <div className="flex">
                <i className="fa-solid fa-lightbulb text-blue-500 text-xl mr-3 mt-1"></i>
                <div>
                  <h4 className="font-medium text-blue-800">Scenario Planning Recommendations</h4>
                  <ul className="text-sm text-blue-700 mt-1 list-disc pl-5 space-y-1">
                    <li>Prepare contingency plans for the pessimistic scenario, focusing on expense reduction strategies</li>
                    <li>Identify opportunities to achieve the optimistic scenario through targeted marketing and operational efficiency</li>
                    <li>Maintain current strategies to realize the expected scenario while monitoring key performance indicators</li>
                    <li>Establish early warning systems to detect deviations from the expected scenario</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5">
                <div className="text-center">
                  <div className="bg-blue-100 p-3 rounded-lg inline-block mb-3">
                    <i className="fa-solid fa-chart-simple text-blue-600 text-xl"></i>
                  </div>
                  <h4 className="font-medium text-gray-900">Revenue Growth Rate</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">8.2%</p>
                  <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 1.5% from last period</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-lg p-5">
                <div className="text-center">
                  <div className="bg-green-100 p-3 rounded-lg inline-block mb-3">
                    <i className="fa-solid fa-percent text-green-600 text-xl"></i>
                  </div>
                  <h4 className="font-medium text-gray-900">Expense Growth Rate</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">5.3%</p>
                  <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-down mr-1"></i> 0.8% from last period</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-lg p-5">
                <div className="text-center">
                  <div className="bg-purple-100 p-3 rounded-lg inline-block mb-3">
                    <i className="fa-solid fa-arrow-trend-up text-purple-600 text-xl"></i>
                  </div>
                  <h4 className="font-medium text-gray-900">Profit Growth Rate</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">12.4%</p>
                  <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 3.2% from last period</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 rounded-lg p-5">
                <div className="text-center">
                  <div className="bg-cyan-100 p-3 rounded-lg inline-block mb-3">
                    <i className="fa-solid fa-scale-balanced text-cyan-600 text-xl"></i>
                  </div>
                  <h4 className="font-medium text-gray-900">Operating Margin</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">39.4%</p>
                  <p className="text-xs text-green-600 mt-1"><i className="fa-solid fa-arrow-up mr-1"></i> 2.1 pts from last period</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Key Performance Indicators">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div>
                      <h4 className="font-medium text-gray-900">Return on Investment (ROI)</h4>
                      <p className="text-sm text-gray-600">Annualized return on capital invested</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">18.5%</p>
                      <p className="text-xs text-green-600"><i className="fa-solid fa-arrow-up mr-1"></i> 2.3%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div>
                      <h4 className="font-medium text-gray-900">Debt-to-Equity Ratio</h4>
                      <p className="text-sm text-gray-600">Financial leverage indicator</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">0.45</p>
                      <p className="text-xs text-green-600"><i className="fa-solid fa-arrow-down mr-1"></i> 0.05</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div>
                      <h4 className="font-medium text-gray-900">Accounts Receivable Turnover</h4>
                      <p className="text-sm text-gray-600">Efficiency of collection process</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">12.4x</p>
                      <p className="text-xs text-green-600"><i className="fa-solid fa-arrow-up mr-1"></i> 1.2x</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-900">Inventory Turnover</h4>
                      <p className="text-sm text-gray-600">Efficiency of inventory management</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">8.7x</p>
                      <p className="text-xs text-red-600"><i className="fa-solid fa-arrow-down mr-1"></i> 0.3x</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Financial Health Indicators">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Current Assets', value: 65 },
                          { name: 'Fixed Assets', value: 25 },
                          { name: 'Liabilities', value: 10 }
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
                        <Cell key="cell-0" fill="#4f46e5" />
                        <Cell key="cell-1" fill="#10b981" />
                        <Cell key="cell-2" fill="#f97316" />
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
                  <h4 className="font-medium text-blue-800">AI Financial Metrics Insights</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    The AI analysis shows strong financial performance with an 8.2% revenue growth rate and controlled 
                    expense growth of 5.3%, resulting in a 12.4% profit growth. The operating margin of 39.4% is healthy 
                    and improving. The ROI of 18.5% indicates effective capital utilization. The debt-to-equity ratio 
                    of 0.45 shows conservative financial leverage. Recommendation: Continue current financial strategies 
                    while exploring opportunities to improve inventory turnover and maintain strong cash flow management.
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

export default AIFinancialForecasting;