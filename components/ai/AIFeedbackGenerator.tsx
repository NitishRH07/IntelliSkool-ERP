import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { generateFeedbackForAnswer } from '../../services/geminiService';

const AIFeedbackGenerator: React.FC = () => {
    const [inputs, setInputs] = useState({
        question: "Explain Newton's Third Law of Motion and provide one real-world example.",
        answer: "For every action there is a reaction. Like when a rocket pushes gas down, the rocket goes up.",
        criteria: "Clarity of explanation (4 points), correctness of definition (3 points), relevance of example (3 points).",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setInputs(prev => ({ ...prev, [id]: value }));
    };

    const handleGenerate = async () => {
        setIsLoading(true);
        setFeedback('');
        setError('');
        try {
            const { question, answer, criteria } = inputs;
            if (!question || !answer || !criteria) {
                setError("All fields are required.");
                setIsLoading(false);
                return;
            }
            const result = await generateFeedbackForAnswer(question, answer, criteria);
            setFeedback(result);
        } catch (err) {
            setError('Failed to generate feedback. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card title="AI Auto-Grader / Feedback Generator" icon="fa-solid fa-marker">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Form */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="question" className="block text-sm font-medium text-gray-700">Question</label>
                        <textarea id="question" value={inputs.question} onChange={handleInputChange} rows={3} className="mt-1 block w-full input-style" />
                    </div>
                    <div>
                        <label htmlFor="answer" className="block text-sm font-medium text-gray-700">Student's Answer</label>
                        <textarea id="answer" value={inputs.answer} onChange={handleInputChange} rows={5} className="mt-1 block w-full input-style" />
                    </div>
                    <div>
                        <label htmlFor="criteria" className="block text-sm font-medium text-gray-700">Grading Criteria</label>
                        <textarea id="criteria" value={inputs.criteria} onChange={handleInputChange} rows={3} className="mt-1 block w-full input-style" />
                    </div>
                    <Button onClick={handleGenerate} isLoading={isLoading} className="w-full">
                        <i className="fa-solid fa-wand-magic-sparkles mr-2"></i> Generate Feedback
                    </Button>
                </div>

                {/* Output Display */}
                <div className="border border-gray-200 rounded-lg bg-gray-50 flex flex-col">
                    <div className="p-4 border-b">
                        <h4 className="text-lg font-semibold text-gray-800">AI-Generated Feedback</h4>
                    </div>
                    <div className="p-6 overflow-y-auto flex-1 min-h-[300px]">
                        {isLoading && <div className="text-center p-8 text-primary">AI is evaluating the answer...</div>}
                        {error && <div className="text-center p-8 text-red-600">{error}</div>}
                        {feedback ? (
                            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">{feedback}</pre>
                        ) : (
                            !isLoading && <div className="text-center text-gray-500 p-8">The generated feedback and score will appear here.</div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AIFeedbackGenerator;