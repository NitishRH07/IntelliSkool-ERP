import React, { useState } from 'react';
import { generateLessonPlan } from '../../services/geminiService';

const AILessonPlanner: React.FC = () => {
    const [inputs, setInputs] = useState({
        grade: '',
        subject: '',
        week: '',
        lastWeekTopics: '',
        performance: ''
    });
    const [lessonPlan, setLessonPlan] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleGeneratePlan = async () => {
        if (!inputs.grade || !inputs.subject || !inputs.week) {
            setError('Please fill in all required fields');
            return;
        }

        setLoading(true);
        setError('');
        setLessonPlan('');

        try {
            const result = await generateLessonPlan(inputs);
            setLessonPlan(result);
        } catch (err) {
            setError('Failed to generate lesson plan: ' + (err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPlan = () => {
        if (!lessonPlan) return;
        
        const element = document.createElement('a');
        const file = new Blob([lessonPlan], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'lesson-plan.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">AI Lesson Planner</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Create Lesson Plan</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                            Grade *
                        </label>
                        <input
                            type="text"
                            id="grade"
                            name="grade"
                            value={inputs.grade}
                            onChange={handleInputChange}
                            placeholder="e.g., 10th Grade"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                            Subject *
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={inputs.subject}
                            onChange={handleInputChange}
                            placeholder="e.g., Mathematics"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="week" className="block text-sm font-medium text-gray-700 mb-2">
                        Current Module/Week *
                    </label>
                    <input
                        type="text"
                        id="week"
                        name="week"
                        value={inputs.week}
                        onChange={handleInputChange}
                        placeholder="e.g., Week 5 - Algebra"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastWeekTopics" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Week's Topics
                    </label>
                    <textarea
                        id="lastWeekTopics"
                        name="lastWeekTopics"
                        value={inputs.lastWeekTopics}
                        onChange={handleInputChange}
                        placeholder="Briefly describe what was covered last week"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        rows={3}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="performance" className="block text-sm font-medium text-gray-700 mb-2">
                        Student Performance Context
                    </label>
                    <textarea
                        id="performance"
                        name="performance"
                        value={inputs.performance}
                        onChange={handleInputChange}
                        placeholder="Describe how students are performing and any specific challenges"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        rows={3}
                    />
                </div>
                <button
                    onClick={handleGeneratePlan}
                    disabled={loading}
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                >
                    {loading ? 'Generating...' : 'Generate Lesson Plan'}
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                    <h3 className="text-red-800 font-medium">Error</h3>
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {lessonPlan && (
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-700">Generated Lesson Plan</h2>
                        <button
                            onClick={handleDownloadPlan}
                            className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            <i className="fas fa-download mr-2"></i>
                            Download Plan
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <pre className="whitespace-pre-wrap text-gray-700">{lessonPlan}</pre>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AILessonPlanner;