import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const AIDoubtSolver = () => {
  const [doubt, setDoubt] = useState('');
  const [subject, setSubject] = useState('Physics');
  const [isLoading, setIsLoading] = useState(false);
  const [solution, setSolution] = useState('');
  const [steps, setSteps] = useState<string[]>([]);

  const handleSolve = async (e: any) => {
    e.preventDefault();
    if (!doubt.trim()) return;
    
    setIsLoading(true);
    setSolution('');
    setSteps([]);
    
    // Simulate API call to AI service
    setTimeout(() => {
      setSolution(`This is a simulated solution to your doubt about "${doubt}" in ${subject}. In a real implementation, this would connect to the Gemini API to provide a detailed, step-by-step solution.`);
      setSteps([
        "Step 1: Identify the key concepts involved in the problem",
        "Step 2: Apply the relevant formulas or principles",
        "Step 3: Perform calculations carefully",
        "Step 4: Verify the solution with logical reasoning"
      ]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Card title="AI Doubt Solver" icon="fa-solid fa-lightbulb">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Describe Your Doubt</h3>
          <form onSubmit={handleSolve} className="space-y-4">
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
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Doubt</label>
              <textarea
                value={doubt}
                onChange={(e) => setDoubt(e.target.value)}
                rows={6}
                placeholder="Describe your doubt in detail. For example: 'I don't understand how to apply Newton's second law in problems involving friction'..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            
            <Button type="submit" isLoading={isLoading} disabled={!doubt.trim()}>
              <i className="fa-solid fa-brain mr-2"></i> Solve My Doubt
            </Button>
          </form>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">AI Solution</h3>
          <div className="border border-gray-200 rounded-lg p-4 min-h-[300px] bg-gray-50">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
                <p className="text-gray-600">AI is analyzing your doubt and generating a solution...</p>
                <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
              </div>
            ) : solution ? (
              <div className="space-y-4">
                <div className="prose max-w-none">
                  <p className="text-gray-800">{solution}</p>
                </div>
                
                {steps.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-800 mb-3">Step-by-Step Solution:</h4>
                    <ol className="space-y-2">
                      {steps.map((step, index) => (
                        <li key={index} className="flex items-start">
                          <span className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-2">Related Resources</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Video Tutorial</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Practice Problems</span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Concept Notes</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <i className="fa-solid fa-lightbulb text-4xl mb-4 text-yellow-400"></i>
                <p className="text-lg">Your AI-generated solution will appear here</p>
                <p className="text-sm mt-2">Describe your doubt and click "Solve My Doubt" to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Frequently Asked Doubts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "How to solve projectile motion problems?",
            "What is the difference between speed and velocity?",
            "How to balance chemical equations?",
            "What are the laws of thermodynamics?",
            "How to find the area under a curve?",
            "What is photosynthesis and its importance?"
          ].map((doubt, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => setDoubt(doubt)}
            >
              <p className="text-sm text-gray-700">{doubt}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default AIDoubtSolver;