import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AIFeeDefaulterPredictor: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const [feeData] = useState({
    defaulters: [
      { id: 'S001', name: 'Alice Johnson', grade: '10th', amountDue: 5000, dueDate: '2024-03-10', risk: 'high', lastPayment: '2024-02-15' },
      { id: 'S002', name: 'Bob Williams', grade: '9th', amountDue: 3500, dueDate: '2024-03-15', risk: 'medium', lastPayment: '2024-02-20' },
      { id: 'S003', name: 'Charlie Brown', grade: '11th', amountDue: 7200, dueDate: '2024-03-20', risk: 'high', lastPayment: '2024-01-10' },
      { id: 'S004', name: 'Diana Miller', grade: '12th', amountDue: 2800, dueDate: '2024-03-25', risk: 'low', lastPayment: '2024-03-01' },
      { id: 'S005', name: 'Edward Davis', grade: '10th', amountDue: 4500, dueDate: '2024-03-30', risk: 'medium', lastPayment: '2024-02-28' },
    ],
    riskDistribution: [
      { name: 'Low Risk', value: 65 },
      { name: 'Medium Risk', value: 25 },
      { name: 'High Risk', value: 10 },
    ],
    paymentTrends: [
      { month: 'Jan', onTime: 85, late: 10, default: 5 },
      { month: 'Feb', onTime: 82, late: 12, default: 6 },
      { month: 'Mar', onTime: 78, late: 15, default: 7 },
      { month: 'Apr', onTime: 88, late: 8, default: 4 },
      { month: 'May', onTime: 91, late: 6, default: 3 },
    ],
    collectionEfficiency: 87.5,
    totalDue: 23000,
    collected: 185000,
    predictedDefaults: 2300,
  });

  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [timeRange, setTimeRange] = useState('6months');

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendReminder = (studentId: string) => {
    alert(`Reminder sent to student ${studentId}`);
  };

  const handleGenerateReport = () => {
    alert('Fee defaulter report generated and sent to your email');
  };

  return (
    <div className="space-y-6">
      <Card title="AI Fee Defaulter Predictor" icon="fa-solid fa-money-bill-trend-up">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Financial Risk Assessment</h3>
            <p className="text-gray-600 text-sm">AI-powered prediction of potential fee defaulters</p>
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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-lg p-5">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <i className="fa-solid fa-indian-rupee-sign text-green-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Collected</p>
                <p className="text-xl font-bold text-gray-900">₹{feeData.collected.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <i className="fa-solid fa-money-bill-wave text-blue-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Due</p>
                <p className="text-xl font-bold text-gray-900">₹{feeData.totalDue.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-lg p-5">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <i className="fa-solid fa-chart-line text-purple-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Collection Efficiency</p>
                <p className="text-xl font-bold text-gray-900">{feeData.collectionEfficiency}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-lg p-5">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg mr-4">
                <i className="fa-solid fa-triangle-exclamation text-red-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Predicted Defaults</p>
                <p className="text-xl font-bold text-gray-900">₹{feeData.predictedDefaults.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card title="Potential Defaulters">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Due</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {feeData.defaulters.map((defaulter) => (
                      <tr key={defaulter.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{defaulter.name}</div>
                          <div className="text-sm text-gray-500">ID: {defaulter.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{defaulter.grade}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{defaulter.amountDue.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{defaulter.dueDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskColor(defaulter.risk)}`}>
                            {defaulter.risk.charAt(0).toUpperCase() + defaulter.risk.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => handleSendReminder(defaulter.id)}
                            className="text-primary hover:text-primary-dark mr-3"
                          >
                            <i className="fa-solid fa-bell mr-1"></i> Remind
                          </button>
                          <button 
                            onClick={() => setSelectedStudent(defaulter)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <i className="fa-solid fa-eye mr-1"></i> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card title="Risk Distribution">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={feeData.riskDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {feeData.riskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Payment Trends">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={feeData.paymentTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="onTime" name="On Time" fill="#10b981" />
                    <Bar dataKey="late" name="Late" fill="#f59e0b" />
                    <Bar dataKey="default" name="Default" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
          <div className="flex">
            <i className="fa-solid fa-robot text-blue-500 text-xl mr-3 mt-1"></i>
            <div>
              <h4 className="font-medium text-blue-800">AI Prediction Summary</h4>
              <p className="text-sm text-blue-700 mt-1">
                Based on historical payment patterns, demographic data, and behavioral indicators, the AI model has identified 
                5 students with a high probability of becoming fee defaulters. The overall collection efficiency is at 87.5%, 
                which is above the institutional target. Predicted defaults for this period are ₹2,300. 
                Recommendation: Proactive communication with high-risk students and offering flexible payment plans.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Student Financial Profile</h3>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <i className="fa-solid fa-xmark text-2xl"></i>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Student Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{selectedStudent.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Student ID:</span>
                      <span className="font-medium">{selectedStudent.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Grade:</span>
                      <span className="font-medium">{selectedStudent.grade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Risk Level:</span>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskColor(selectedStudent.risk)}`}>
                        {selectedStudent.risk.charAt(0).toUpperCase() + selectedStudent.risk.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Payment Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount Due:</span>
                      <span className="font-medium">₹{selectedStudent.amountDue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Due Date:</span>
                      <span className="font-medium">{selectedStudent.dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Payment:</span>
                      <span className="font-medium">{selectedStudent.lastPayment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Days Overdue:</span>
                      <span className="font-medium">5 days</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">AI Recommendations</h4>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <ul className="list-disc list-inside space-y-2 text-sm text-blue-800">
                    <li>Send personalized payment reminder via email and SMS</li>
                    <li>Offer installment payment plan to ease financial burden</li>
                    <li>Connect with parents to discuss payment options</li>
                    <li>Consider waiving late fees as a goodwill gesture</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="secondary" onClick={() => setSelectedStudent(null)}>
                  Close
                </Button>
                <Button>
                  <i className="fa-solid fa-paper-plane mr-2"></i> Send Communication
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIFeeDefaulterPredictor;