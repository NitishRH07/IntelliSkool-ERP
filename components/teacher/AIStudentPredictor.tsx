import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface StudentPrediction {
  id: string;
  name: string;
  currentGrade: string;
  predictedGrade: string;
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high';
  factors: string[];
  recommendations: string[];
}

const AIStudentPredictor = () => {
  const [predictions] = useState<StudentPrediction[]>([
    {
      id: 'S001',
      name: 'Alice Johnson',
      currentGrade: 'B+',
      predictedGrade: 'A-',
      confidence: 85,
      riskLevel: 'low',
      factors: [
        'Consistent attendance (95%)',
        'Strong performance in recent assessments',
        'Active class participation'
      ],
      recommendations: [
        'Encourage participation in advanced problem-solving sessions',
        'Recommend additional challenging materials'
      ]
    },
    {
      id: 'S002',
      name: 'Bob Smith',
      currentGrade: 'C',
      predictedGrade: 'C+',
      confidence: 70,
      riskLevel: 'medium',
      factors: [
        'Irregular attendance (82%)',
        'Average test scores with improvement trend',
        'Submitted most assignments on time'
      ],
      recommendations: [
        'Schedule one-on-one mentoring sessions',
        'Provide additional practice materials for weak topics',
        'Encourage regular study group participation'
      ]
    },
    {
      id: 'S003',
      name: 'Charlie Brown',
      currentGrade: 'D',
      predictedGrade: 'C',
      confidence: 65,
      riskLevel: 'high',
      factors: [
        'Poor attendance (78%)',
        'Consistently low test scores',
        'Late submission of assignments'
      ],
      recommendations: [
        'Immediate parent-teacher conference recommended',
        'Create individualized learning plan',
        'Monitor progress with weekly check-ins'
      ]
    }
  ]);

  const [selectedStudent, setSelectedStudent] = useState<StudentPrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyzeAll = async () => {
    setIsLoading(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-500';
    if (confidence >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <Card title="AI Student Performance Predictor" icon="fa-solid fa-chart-line">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Student Performance Forecast</h3>
            <p className="text-gray-600 text-sm">AI-powered predictions based on current performance trends</p>
          </div>
          <Button onClick={handleAnalyzeAll} isLoading={isLoading}>
            <i className="fa-solid fa-brain mr-2"></i> Refresh All Predictions
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {predictions.map(student => (
                <div 
                  key={student.id} 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedStudent?.id === student.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedStudent(student)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">{student.name}</h4>
                      <p className="text-sm text-gray-600">{student.currentGrade} → {student.predictedGrade}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(student.riskLevel)}`}>
                      {student.riskLevel.charAt(0).toUpperCase() + student.riskLevel.slice(1)} Risk
                    </span>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Confidence</span>
                      <span>{student.confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getConfidenceColor(student.confidence)}`} 
                        style={{ width: `${student.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-xs text-gray-500">Key Factors:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {student.factors.slice(0, 2).map((factor, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {factor}
                        </span>
                      ))}
                      {student.factors.length > 2 && (
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          +{student.factors.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Detailed View */}
          <div className="lg:col-span-1">
            {selectedStudent ? (
              <div className="border border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                    <p className="text-gray-600">
                      Current: <span className="font-medium">{selectedStudent.currentGrade}</span> → 
                      Predicted: <span className="font-medium">{selectedStudent.predictedGrade}</span>
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(selectedStudent.riskLevel)}`}>
                    {selectedStudent.riskLevel.charAt(0).toUpperCase() + selectedStudent.riskLevel.slice(1)} Risk
                  </span>
                </div>
                
                <div className="mb-5">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Prediction Confidence</span>
                    <span>{selectedStudent.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${getConfidenceColor(selectedStudent.confidence)}`} 
                      style={{ width: `${selectedStudent.confidence}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mb-5">
                  <h4 className="font-medium text-gray-900 mb-2">Key Performance Factors</h4>
                  <ul className="space-y-2">
                    {selectedStudent.factors.map((factor, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fa-solid fa-circle-check text-green-500 mt-1 mr-2 text-xs"></i>
                        <span className="text-sm">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">AI Recommendations</h4>
                  <ul className="space-y-2">
                    {selectedStudent.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fa-solid fa-lightbulb text-yellow-500 mt-1 mr-2 text-xs"></i>
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Button variant="secondary" className="w-full">
                    <i className="fa-solid fa-file-export mr-2"></i> Export Report
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg p-8 text-center text-gray-500">
                <i className="fa-solid fa-user-graduate text-3xl mb-3"></i>
                <h3 className="text-lg font-medium text-gray-700">Select a student</h3>
                <p className="text-sm mt-1">Click on a student card to view detailed predictions</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8">
          <Card title="Class Performance Overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="text-2xl font-bold text-green-800">1</div>
                <div className="text-sm text-green-700">Students Likely to Excel</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <div className="text-2xl font-bold text-yellow-800">1</div>
                <div className="text-sm text-yellow-700">Students Needing Support</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="text-2xl font-bold text-red-800">1</div>
                <div className="text-sm text-red-700">Students at Risk</div>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default AIStudentPredictor;