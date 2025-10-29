import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { generateLessonPlan } from '../../services/geminiService';

const AILessonPlanner: React.FC = () => {
    const [inputs, setInputs] = useState({
        grade: '10th',
        subject: 'Physics',
        week: 'Week 5: Energy & Work',
        lastWeekTopics: 'Completed unit on Laws of Motion. Most students understood Newton\'s Third Law, but some struggled with F=ma calculations.',
        performance: 'Overall class engagement is high, but about 20% of students need extra help with mathematical problems. Practical experiments are very popular.',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [lessonPlan, setLessonPlan] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setInputs(prev => ({ ...prev, [id]: value }));
    };

    const handleGenerate = async () => {
        setIsLoading(true);
        setLessonPlan('');
        setError('');
        try {
            const result = await generateLessonPlan(inputs);
            setLessonPlan(result);
        } catch (err) {
            setError('Failed to generate lesson plan. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card title="AI Lesson Planner" icon="fa-solid fa-calendar-week">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Form */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-lg border-b pb-2">Lesson Configuration</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Grade</label>
                            <select id="grade" value={inputs.grade} onChange={handleInputChange} className="mt-1 block w-full input-style">
                                <option>8th</option><option>9th</option><option>10th</option><option>1st PUC</option><option>2nd PUC</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                            <select id="subject" value={inputs.subject} onChange={handleInputChange} className="mt-1 block w-full input-style">
                                <option>Biology</option><option>Physics</option><option>Chemistry</option><option>Mathematics</option><option>English</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="week" className="block text-sm font-medium text-gray-700">Current Week / Module Title</label>
                        <input type="text" id="week" value={inputs.week} onChange={handleInputChange} className="mt-1 block w-full input-style" />
                    </div>
                    <div>
                        <label htmlFor="lastWeekTopics" className="block text-sm font-medium text-gray-700">Topics Covered Last Week</label>
                        <textarea id="lastWeekTopics" value={inputs.lastWeekTopics} onChange={handleInputChange} rows={3} className="mt-1 block w-full input-style" />
                    </div>
                    <div>
                        <label htmlFor="performance" className="block text-sm font-medium text-gray-700">Student Performance Summary</label>
                        <textarea id="performance" value={inputs.performance} onChange={handleInputChange} rows={4} className="mt-1 block w-full input-style" placeholder="e.g., Students struggled with X, excelled at Y..." />
                    </div>
                    <Button onClick={handleGenerate} isLoading={isLoading} className="w-full">
                        <i className="fa-solid fa-wand-magic-sparkles mr-2"></i> Generate Lesson Plan
                    </Button>
                </div>

                {/* Output Display */}
                <div className="border border-gray-200 rounded-lg bg-gray-50 flex flex-col">
                    <div className="p-4 border-b">
                        <h4 className="text-lg font-semibold text-gray-800">Generated Weekly Plan</h4>
                    </div>
                    <div className="p-6 overflow-y-auto flex-1 min-h-[300px]">
                        {isLoading && <div className="text-center p-8 text-primary">AI is crafting your lesson plan...</div>}
                        {error && <div className="text-center p-8 text-red-600">{error}</div>}
                        {lessonPlan ? (
                            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">{lessonPlan}</pre>
                        ) : (
                            !isLoading && <div className="text-center text-gray-500 p-8">Your generated lesson plan will appear here.</div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AILessonPlanner;
