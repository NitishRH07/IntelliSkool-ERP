import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Submission {
  id: string;
  studentName: string;
  subject: string;
  assignmentTitle: string;
  submittedDate: string;
  status: 'pending' | 'graded' | 'in-progress';
  score?: number;
  maxScore: number;
}

const AIGradingAssistant = () => {
  const [submissions] = useState<Submission[]>([
    {
      id: 'SUB001',
      studentName: 'Alice Johnson',
      subject: 'Physics',
      assignmentTitle: 'Laws of Motion Problems',
      submittedDate: '2024-03-15',
      status: 'pending',
      maxScore: 100
    },
    {
      id: 'SUB002',
      studentName: 'Bob Smith',
      subject: 'Mathematics',
      assignmentTitle: 'Quadratic Equations',
      submittedDate: '2024-03-14',
      status: 'in-progress',
      score: 75,
      maxScore: 100
    },
    {
      id: 'SUB003',
      studentName: 'Charlie Brown',
      subject: 'Chemistry',
      assignmentTitle: 'Periodic Table Quiz',
      submittedDate: '2024-03-13',
      status: 'graded',
      score: 88,
      maxScore: 100
    }
  ]);

  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGradeSubmission = async (submission: Submission) => {
    setSelectedSubmission(submission);
    setFeedback('');
  };

  const handleAutoGrade = async () => {
    if (!selectedSubmission) return;
    
    setIsLoading(true);
    
    // Simulate AI grading
    setTimeout(() => {
      setFeedback(`This is a simulated AI-generated feedback for ${selectedSubmission.studentName}'s assignment. In a real implementation, this would analyze the student's work and provide detailed, personalized feedback based on their responses.`);
      setIsLoading(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'graded': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card title="AI Grading Assistant" icon="fa-solid fa-robot">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submissions List */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-medium mb-4">Pending Submissions</h3>
            <div className="space-y-3">
              {submissions.map(submission => (
                <div 
                  key={submission.id} 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedSubmission?.id === submission.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleGradeSubmission(submission)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{submission.assignmentTitle}</h4>
                      <p className="text-sm text-gray-600">{submission.studentName}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                      {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>{submission.subject}</span>
                    <span>{submission.submittedDate}</span>
                  </div>
                  {submission.status === 'graded' && submission.score && (
                    <div className="mt-2">
                      <span className="text-sm font-medium">
                        Score: {submission.score}/{submission.maxScore}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Grading Panel */}
          <div className="lg:col-span-2">
            {selectedSubmission ? (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{selectedSubmission.assignmentTitle}</h3>
                    <p className="text-gray-600">
                      {selectedSubmission.studentName} • {selectedSubmission.subject}
                    </p>
                  </div>
                  <Button onClick={handleAutoGrade} isLoading={isLoading}>
                    <i className="fa-solid fa-wand-magic-sparkles mr-2"></i>
                    {selectedSubmission.status === 'graded' ? 'Re-grade' : 'Auto Grade'}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card title="Submission Details">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Submitted Date:</span>
                        <span>{selectedSubmission.submittedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max Score:</span>
                        <span>{selectedSubmission.maxScore}</span>
                      </div>
                      {selectedSubmission.score && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Current Score:</span>
                          <span className="font-bold">{selectedSubmission.score}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedSubmission.status)}`}>
                          {selectedSubmission.status.charAt(0).toUpperCase() + selectedSubmission.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </Card>
                  
                  <Card title="AI Grading Options">
                    <div className="space-y-3">
                      <Button variant="secondary" className="w-full">
                        <i className="fa-solid fa-file-import mr-2"></i>
                        Import Student Work
                      </Button>
                      <Button variant="secondary" className="w-full">
                        <i className="fa-solid fa-camera mr-2"></i>
                        Grade from Photo
                      </Button>
                      <Button variant="secondary" className="w-full">
                        <i className="fa-solid fa-file-pdf mr-2"></i>
                        Grade PDF Submission
                      </Button>
                    </div>
                  </Card>
                </div>
                
                <Card title="AI-Generated Feedback">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
                      <p className="text-gray-600">AI is analyzing the submission...</p>
                    </div>
                  ) : feedback ? (
                    <div className="prose max-w-none">
                      <p>{feedback}</p>
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Grading Suggestions:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Consider giving partial credit for Question 3</li>
                          <li>Student showed good understanding of core concepts</li>
                          <li>Suggest reviewing basic calculation errors</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <i className="fa-solid fa-comment-dots text-3xl mb-3"></i>
                      <p>Click "Auto Grade" to generate AI-powered feedback</p>
                    </div>
                  )}
                </Card>
                
                <div className="flex justify-end space-x-3">
                  <Button variant="secondary">
                    <i className="fa-solid fa-download mr-2"></i>
                    Export Feedback
                  </Button>
                  <Button>
                    <i className="fa-solid fa-paper-plane mr-2"></i>
                    Send to Student
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center text-gray-500">
                <i className="fa-solid fa-file-circle-question text-4xl mb-4"></i>
                <h3 className="text-xl font-medium text-gray-700">No submission selected</h3>
                <p className="mt-2">Select a submission from the list to begin grading</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIGradingAssistant;