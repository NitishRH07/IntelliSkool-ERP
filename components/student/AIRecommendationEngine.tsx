import { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { getAIAnalysis } from '../../services/geminiService';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  subject: string;
  type: 'video' | 'article' | 'quiz' | 'practice';
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
}

const AIRecommendationEngine = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'high' | 'personalized'>('all');

  // Mock student data - in a real app, this would come from context or props
  const studentData = {
    name: 'Alex Morgan',
    grade: '10th',
    subjects: ['Physics', 'Mathematics', 'Chemistry', 'English'],
    weakSubjects: ['Physics'],
    strongSubjects: ['Mathematics'],
    recentPerformance: {
      Physics: 65,
      Mathematics: 88,
      Chemistry: 72,
      English: 81
    },
    studyGoals: 'Improve Physics grade by end of semester'
  };

  const fetchRecommendations = async () => {
    setIsLoading(true);
    
    // In a real implementation, this would call the AI service
    // For now, we'll simulate with mock data
    const mockRecommendations: Recommendation[] = [
      {
        id: '1',
        title: 'Physics: Newton\'s Laws of Motion',
        description: 'Interactive video explaining the three laws with real-world examples',
        subject: 'Physics',
        type: 'video',
        priority: 'high',
        estimatedTime: '15 mins'
      },
      {
        id: '2',
        title: 'Physics Practice Problems',
        description: 'Set of 20 practice problems on mechanics with detailed solutions',
        subject: 'Physics',
        type: 'practice',
        priority: 'high',
        estimatedTime: '45 mins'
      },
      {
        id: '3',
        title: 'Mathematics: Quadratic Equations',
        description: 'Advanced techniques for solving complex quadratic equations',
        subject: 'Mathematics',
        type: 'article',
        priority: 'medium',
        estimatedTime: '20 mins'
      },
      {
        id: '4',
        title: 'Weekly Quiz: Physics Fundamentals',
        description: 'Test your understanding of basic physics concepts',
        subject: 'Physics',
        type: 'quiz',
        priority: 'high',
        estimatedTime: '30 mins'
      }
    ];
    
    // Simulate API delay
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return 'fa-solid fa-video';
      case 'article': return 'fa-solid fa-file-lines';
      case 'quiz': return 'fa-solid fa-puzzle-piece';
      case 'practice': return 'fa-solid fa-pencil';
      default: return 'fa-solid fa-lightbulb';
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

  const filteredRecommendations = recommendations.filter(rec => {
    if (activeTab === 'all') return true;
    if (activeTab === 'high') return rec.priority === 'high';
    return true; // For personalized, we would filter based on student data
  });

  return (
    <div className="space-y-6">
      <Card title="Smart Recommendation Engine" icon="fa-solid fa-robot">
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-medium">Personalized Learning Recommendations</h3>
              <p className="text-gray-600 text-sm">AI-powered suggestions based on your performance</p>
            </div>
            <Button onClick={fetchRecommendations} isLoading={isLoading}>
              <i className="fa-solid fa-arrows-rotate mr-2"></i> Refresh Recommendations
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Recommendations
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'high' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('high')}
            >
              High Priority
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'personalized' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('personalized')}
            >
              Personalized
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">AI is analyzing your performance...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRecommendations.map(rec => (
                <div key={rec.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all duration-300 hover:border-primary">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-lg mr-4">
                        <i className={`${getTypeIcon(rec.type)} text-primary text-xl`}></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{rec.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{rec.description}</p>
                        <div className="flex items-center mt-3">
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs mr-2">{rec.subject}</span>
                          <span className="text-xs text-gray-500">{rec.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                      {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button variant="secondary" className="text-sm">
                      Start Learning
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredRecommendations.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <i className="fa-solid fa-robot text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-medium text-gray-700">No recommendations available</h3>
              <p className="text-gray-500 mt-2">Try refreshing or check back later for new suggestions</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AIRecommendationEngine;