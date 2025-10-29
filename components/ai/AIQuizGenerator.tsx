
import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { generateQuizFromNotes } from '../../services/geminiService';
import { Quiz } from '../../types';

const AIQuizGenerator: React.FC = () => {
    const [notes, setNotes] = useState('Newton\'s First Law: An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force. This is also known as the law of inertia.\n\nNewton\'s Second Law: The acceleration of an object as produced by a net force is directly proportional to the magnitude of the net force, in the same direction as the net force, and inversely proportional to the mass of the object. The formula is F = ma.\n\nNewton\'s Third Law: For every action, there is an equal and opposite reaction.');
    const [subject, setSubject] = useState('Physics');
    const [numQuestions, setNumQuestions] = useState(4);
    const [isLoading, setIsLoading] = useState(false);
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        setIsLoading(true);
        setQuiz(null);
        setError('');
        const result = await generateQuizFromNotes(notes, subject, numQuestions);
        if (result) {
            setQuiz(result);
        } else {
            setError('Failed to generate quiz. Please try again.');
        }
        setIsLoading(false);
    };

    return (
        <Card title="AI Quiz Generator (from notes)" icon="fa-solid fa-puzzle-piece">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input Form */}
                <div className="space-y-4">
                     <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                        <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Paste Notes / Content Here</label>
                        <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={10} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700">Number of Questions</label>
                        <input type="number" id="numQuestions" value={numQuestions} onChange={e => setNumQuestions(parseInt(e.target.value, 10))} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                    </div>
                    <Button onClick={handleGenerate} isLoading={isLoading} className="w-full">
                        <i className="fa-solid fa-wand-magic-sparkles mr-2"></i> Generate Quiz
                    </Button>
                </div>

                {/* Output Display */}
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[300px] max-h-[500px] overflow-y-auto">
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">Generated Quiz</h4>
                    {isLoading && <div className="text-center p-8"><span className="text-primary">Generating quiz with AI... This may take a moment.</span></div>}
                    {error && <div className="text-center p-8 text-red-600">{error}</div>}
                    {quiz && (
                         <div className="space-y-4">
                            <h3 className="text-xl font-bold">{quiz.title}</h3>
                            {quiz.questions.map((q, index) => (
                                <div key={index} className="p-3 bg-white rounded-md shadow-sm">
                                    <p className="font-semibold">{index + 1}. {q.questionText}</p>
                                    <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                                        {q.options.map((opt, i) => (
                                            <li key={i} className={opt === q.correctAnswer ? 'text-green-600 font-bold' : ''}>
                                                {opt}
                                                {opt === q.correctAnswer && <i className="fa-solid fa-check ml-2"></i>}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                         </div>
                    )}
                    {!isLoading && !quiz && !error && <div className="text-center text-gray-500 p-8">Your generated quiz will appear here.</div>}
                </div>
            </div>
        </Card>
    );
};

export default AIQuizGenerator;
