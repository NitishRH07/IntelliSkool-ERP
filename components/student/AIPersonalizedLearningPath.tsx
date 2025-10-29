import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { generateLearningPath } from '../../services/geminiService';

const AIPersonalizedLearningPath: React.FC = () => {
    const [goal, setGoal] = useState('Understand Quantum Physics from scratch');
    const [learningStyle, setLearningStyle] = useState('Visual learner, enjoy practical examples and videos');
    const [time, setTime] = useState('4 weeks, studying 3 hours per week');
    const [isLoading, setIsLoading] = useState(false);
    const [path, setPath] = useState('');

    const handleGenerate = async () => {
        setIsLoading(true);
        setPath('');
        const studentProfile = `
            Learning Goal: ${goal}
            Preferred Learning Style: ${learningStyle}
            Time Commitment: ${time}
        `;
        const result = await generateLearningPath(studentProfile);
        setPath(result);
        setIsLoading(false);
    };

    return (
        <Card title="AI Personalized Learning Path" icon="fa-solid fa-route">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                     <div>
                        <label htmlFor="goal" className="block text-sm font-medium text-gray-700">What is your learning goal?</label>
                        <input type="text" id="goal" value={goal} onChange={e => setGoal(e.target.value)} className="mt-1 block w-full input-style" />
                    </div>
                     <div>
                        <label htmlFor="learningStyle" className="block text-sm font-medium text-gray-700">How do you like to learn?</label>
                        <input type="text" id="learningStyle" value={learningStyle} onChange={e => setLearningStyle(e.target.value)} className="mt-1 block w-full input-style" />
                    </div>
                     <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">How much time can you commit?</label>
                        <input type="text" id="time" value={time} onChange={e => setTime(e.target.value)} className="mt-1 block w-full input-style" />
                    </div>
                    <Button onClick={handleGenerate} isLoading={isLoading} className="w-full">
                        <i className="fa-solid fa-wand-magic-sparkles mr-2"></i> Generate My Path
                    </Button>
                </div>
                <div className="border border-gray-200 rounded-lg bg-gray-50 flex flex-col">
                    <div className="p-4 border-b">
                        <h4 className="text-lg font-semibold text-gray-800">Your Learning Path</h4>
                    </div>
                    <div className="p-6 overflow-y-auto flex-1 min-h-[300px]">
                        {isLoading && <div className="text-center p-8 text-primary">AI is designing your custom learning journey...</div>}
                        {path && <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">{path}</pre>}
                        {!isLoading && !path && <div className="text-center text-gray-500 p-8">Your personalized learning path will appear here.</div>}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AIPersonalizedLearningPath;
