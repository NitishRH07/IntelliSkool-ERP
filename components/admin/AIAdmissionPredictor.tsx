import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface AdmissionPrediction {
  year: number;
  currentEnrollment: number;
  predictedEnrollment: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  factors: string[];
  recommendations: string[];
}

const AIAdmissionPredictor = () => {
  const [predictions] = useState<AdmissionPrediction[]>([
    {
      year: 2024,
      currentEnrollment: 1250,
      predictedEnrollment: 1320,
      confidence: 85,
      trend: 'up',
      factors: [
        'Increased marketing effectiveness (+15%)',
        'Improved campus facilities',
        'Higher retention rates from previous year'
      ],
      recommendations: [
        'Hire 3 additional faculty members',
        'Prepare 20 extra seats in popular programs',
        'Allocate budget for additional classroom resources'
      ]
    },
    {
      year: 2025,
      currentEnrollment: 1320,
      predictedEnrollment: 1380,
      confidence: 78,
      trend: 'up',
      factors: [
        'Growing regional population',
        'New program offerings',
        'Positive alumni feedback'
      ],
      recommendations: [
        'Plan infrastructure expansion',
        'Develop new course materials',
        'Enhance student support services'
      ]
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2024);

  const selectedPrediction = predictions.find(p => p.year === selectedYear) || predictions[0];

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return 'fa-arrow-trend-up text-green-500';
      case 'down': return 'fa-arrow-trend-down text-red-500';
      case 'stable': return 'fa-minus text-gray-500';
      default: return 'fa-minus text-gray-500';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-500';
    if (confidence >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <Card title="AI Admission Predictor" icon="fa-solid fa-chart-line">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Enrollment Forecast</h3>
            <p className="text-gray-600 text-sm">AI-powered predictions for future admissions</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {predictions.map(prediction => (
                <option key={prediction.year} value={prediction.year}>
                  {prediction.year} Forecast
                </option>
              ))}
            </select>
            <Button onClick={handleRefresh} isLoading={isLoading}>
              <i className="fa-solid fa-arrows-rotate mr-2"></i> Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Summary Cards */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <i className="fa-solid fa-users text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current Enrollment</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedPrediction.currentEnrollment}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-lg p-5">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <i className="fa-solid fa-rocket text-green-600 text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Predicted Enrollment</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedPrediction.predictedEnrollment}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-lg p-5">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <i className={`fa-solid ${getTrendIcon(selectedPrediction.trend)} text-xl`}></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trend</p>
                  <p className="text-lg font-bold text-gray-900 capitalize">{selectedPrediction.trend}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Detailed Analysis */}
          <div className="lg:col-span-2">
            <Card title="Prediction Analysis">
              <div className="mb-5">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Prediction Confidence</span>
                  <span>{selectedPrediction.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${getConfidenceColor(selectedPrediction.confidence)}`} 
                    style={{ width: `${selectedPrediction.confidence}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Key Influencing Factors</h4>
                  <ul className="space-y-2">
                    {selectedPrediction.factors.map((factor, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fa-solid fa-circle-check text-green-500 mt-1 mr-2 text-xs"></i>
                        <span className="text-sm">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">AI Recommendations</h4>
                  <ul className="space-y-2">
                    {selectedPrediction.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fa-solid fa-lightbulb text-yellow-500 mt-1 mr-2 text-xs"></i>
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Historical Comparison</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">2022-2023 Actual Enrollment</span>
                    <span className="font-medium">1,180</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">2023-2024 Actual Enrollment</span>
                    <span className="font-medium">1,250</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">2024-2025 Predicted</span>
                    <span className="font-medium text-primary">{selectedPrediction.predictedEnrollment}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        <div className="mt-8">
          <Card title="Resource Planning Summary">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">+{selectedPrediction.predictedEnrollment - selectedPrediction.currentEnrollment}</div>
                <div className="text-sm text-gray-600">Additional Students</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">Faculty Needed</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">20</div>
                <div className="text-sm text-gray-600">Extra Seats</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">$15K</div>
                <div className="text-sm text-gray-600">Budget Allocation</div>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default AIAdmissionPredictor;