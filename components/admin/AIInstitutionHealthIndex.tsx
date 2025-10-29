import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const AIInstitutionHealthIndex: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const [healthData] = useState({
    overallScore: 84,
    categories: [
      { name: 'Academic Performance', score: 87, trend: 'up' },
      { name: 'Student Engagement', score: 82, trend: 'stable' },
      { name: 'Faculty Satisfaction', score: 78, trend: 'down' },
      { name: 'Infrastructure', score: 91, trend: 'up' },
      { name: 'Financial Health', score: 85, trend: 'stable' },
      { name: 'Technology', score: 79, trend: 'stable' },
    ],
    historicalData: [
      { month: 'Jan', score: 80 },
      { month: 'Feb', score: 81 },
      { month: 'Mar', score: 83 },
      { month: 'Apr', score: 82 },
      { month: 'May', score: 84 },
      { month: 'Jun', score: 84 },
    ],
    departmentHealth: [
      { department: 'Science', score: 88 },
      { department: 'Mathematics', score: 76 },
      { department: 'Humanities', score: 82 },
      { department: 'Commerce', score: 89 },
      { department: 'Arts', score: 81 },
    ],
    recommendations: [
      { id: 'R001', priority: 'high', category: 'Faculty Satisfaction', description: 'Implement quarterly feedback sessions with teaching staff', impact: 'Expected to improve satisfaction score by 8-12%' },
      { id: 'R002', priority: 'medium', category: 'Technology', description: 'Upgrade classroom technology in 3 labs', impact: 'Expected to improve technology score by 5-7%' },
      { id: 'R003', priority: 'low', category: 'Student Engagement', description: 'Introduce new extracurricular programs', impact: 'Expected to improve engagement score by 3-5%' },
    ]
  });

  const [timeRange, setTimeRange] = useState('6months');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return 'fa-arrow-trend-up text-green-500';
      case 'down': return 'fa-arrow-trend-down text-red-500';
      case 'stable': return 'fa-minus text-gray-500';
      default: return 'fa-minus text-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleGenerateReport = () => {
    alert('Institution health report generated and sent to your email');
  };

  const handleExportData = () => {
    alert('Health index data exported successfully');
  };

  return (
    <div className="space-y-6">
      <Card title="AI Institution Health Index" icon="fa-solid fa-heart-pulse">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Comprehensive Institutional Health Assessment</h3>
            <p className="text-gray-600 text-sm">AI-powered evaluation of overall institutional performance</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <Card title="Overall Health Score">
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 36 36" className="w-full h-full">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#eee"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={healthData.overallScore >= 90 ? "#10b981" : healthData.overallScore >= 80 ? "#4f46e5" : healthData.overallScore >= 70 ? "#f59e0b" : "#ef4444"}
                      strokeWidth="3"
                      strokeDasharray={`${healthData.overallScore}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-bold ${getStatusColor(healthData.overallScore)}`}>
                      {healthData.overallScore}
                    </span>
                    <span className="text-sm text-gray-500">Health Score</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-lg font-medium text-gray-900">
                    {healthData.overallScore >= 90 ? 'Excellent' : 
                     healthData.overallScore >= 80 ? 'Good' : 
                     healthData.overallScore >= 70 ? 'Fair' : 'Needs Attention'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Based on 6 key performance indicators
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card title="Health Categories">
              <div className="space-y-4">
                {healthData.categories.map((category, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-48 text-sm font-medium text-gray-700">{category.name}</div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              category.score >= 90 ? 'bg-green-500' : 
                              category.score >= 80 ? 'bg-blue-500' : 
                              category.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`} 
                            style={{ width: `${category.score}%` }}
                          ></div>
                        </div>
                        <span className={`ml-2 text-sm font-medium ${getStatusColor(category.score)}`}>
                          {category.score}
                        </span>
                        <i className={`fa-solid ${getTrendIcon(category.trend)} ml-2 text-sm`}></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Historical Trend" className="mt-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthData.historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[75, 95]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#4f46e5" 
                      name="Health Index" 
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card title="Department Health Comparison">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={healthData.departmentHealth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" name="Health Score">
                    {healthData.departmentHealth.map((entry, index) => (
                      <rect 
                        key={`bar-${index}`} 
                        fill={
                          entry.score >= 90 ? "#10b981" : 
                          entry.score >= 80 ? "#4f46e5" : 
                          entry.score >= 70 ? "#f59e0b" : "#ef4444"
                        } 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Health Radar">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={healthData.categories}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar
                    name="Health Index"
                    dataKey="score"
                    stroke="#4f46e5"
                    fill="#4f46e5"
                    fillOpacity={0.3}
                  />
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
              <h4 className="font-medium text-blue-800">AI Health Assessment Summary</h4>
              <p className="text-sm text-blue-700 mt-1">
                The institution's overall health index is 84, indicating a good performance level. 
                Strengths include Infrastructure (91) and Academic Performance (87). Areas requiring 
                attention are Faculty Satisfaction (78) and Technology (79). The health index has 
                remained stable over the past 6 months with a slight upward trend. 
                Recommendation: Focus on faculty engagement initiatives and technology upgrades 
                to improve the overall health index to the target of 88+.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={() => setShowRecommendations(!showRecommendations)} variant="secondary">
            <i className={`fa-solid ${showRecommendations ? 'fa-chevron-up' : 'fa-chevron-down'} mr-2`}></i>
            {showRecommendations ? 'Hide' : 'Show'} AI Recommendations
          </Button>

          {showRecommendations && (
            <Card title="Actionable Recommendations" className="mt-4">
              <div className="space-y-4">
                {healthData.recommendations.map((rec) => (
                  <div key={rec.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900">{rec.category}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                        {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} Priority
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{rec.description}</p>
                    <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                      {rec.impact}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AIInstitutionHealthIndex;