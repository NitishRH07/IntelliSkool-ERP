
import Card from '../ui/Card';
import Button from '../ui/Button';

const AIQuestionHelper = () => {
  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('Physics');
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsLoading(true);
    setAnswer('');
    
    // Simulate API call to AI service
    setTimeout(() => {
      setAnswer(`This is a simulated answer to your question about "${question}" in ${subject}. In a real implementation, this would connect to the Gemini API to provide an accurate, subject-specific response.`);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card title="AI Q&A Helper" icon="fa-solid fa-circle-question">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Ask a Question</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option>Physics</option>
                <option>Mathematics</option>
                <option>Chemistry</option>
                <option>Biology</option>
                <option>English</option>
                <option>History</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Question</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={5}
                placeholder="Enter your question here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            
            <Button type="submit" isLoading={isLoading} disabled={!question.trim()}>
              <i className="fa-solid fa-paper-plane mr-2"></i> Get Answer
            </Button>
          </form>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">AI Response</h3>
          <div className="border border-gray-200 rounded-lg p-4 min-h-[200px] bg-gray-50">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-3"></div>
                <p className="text-gray-600">AI is generating a response...</p>
              </div>
            ) : answer ? (
              <div className="prose max-w-none">
                <p>{answer}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <i className="fa-solid fa-robot text-3xl mb-3"></i>
                <p>Your AI-generated answer will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Recent Questions</h3>
        <div className="space-y-3">
          <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
            <div className="flex justify-between">
              <h4 className="font-medium">What is Newton's First Law of Motion?</h4>
              <span className="text-sm text-gray-500">Physics</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Answer: Newton's First Law states that an object at rest stays at rest and an object in motion stays in motion...</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
            <div className="flex justify-between">
              <h4 className="font-medium">How to solve quadratic equations?</h4>
              <span className="text-sm text-gray-500">Mathematics</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Answer: Quadratic equations can be solved using factoring, completing the square, or the quadratic formula...</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AIQuestionHelper;