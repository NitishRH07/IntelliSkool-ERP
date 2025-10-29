import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { analyzeExamPrep } from '../../services/geminiService';

const AIExamPrepAnalyzer: React.FC = () => {
    const [subject, setSubject] = useState('Physics');
    const [strongTopics, setStrongTopics] = useState('Newton\'s Laws, Kinematics');
    const [weakTopics, setWeakTopics] = useState('Work Energy Theorem, Rotational Motion');
    const [isLoading, setIsLoading] = useState(false);
    const [plan, setPlan] = useState('');

    const handleGenerate = async () => {
        setIsLoading(true);
        setPlan('');
        const prepData = `
            Subject: ${subject}
            Topics I feel confident about: ${strongTopics}
            Topics I am struggling with: ${weakTopics}
        `;
        const result = await analyzeExamPrep(prepData);
        setPlan(result);
        setIsLoading(false);
    };

    return (
        <Card title="AI Exam Prep Analyzer" icon="fa-solid fa-chart-pie">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                     <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                        <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)} className="mt-1 block w-full input-style" />
                    </div>
                    <div>
                        <label htmlFor="strongTopics" className="block text-sm font-medium text-gray-700">Topics you know well</label>
                        <textarea id="strongTopics" value={strongTopics} onChange={e => setStrongTopics(e.target.value)} rows={3} className="mt-1 block w-full input-style" />
                    </div>
                     <div>
                        <label htmlFor="weakTopics" className="block text-sm font-medium text-gray-700">Topics you find difficult</label>
                        <textarea id="weakTopics" value={weakTopics} onChange={e => setWeakTopics(e.target.value)} rows={3} className="mt-1 block w-full input-style" />
                    </div>
                    <Button onClick={handleGenerate} isLoading={isLoading} className="w-full">
                        <i className="fa-solid fa-wand-magic-sparkles mr-2"></i> Create My Study Plan
                    </Button>
                </div>
                 <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[300px] overflow-y-auto">
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">Your Personalized Study Plan</h4>
                    {isLoading && <div className="text-center p-8"><span className="text-primary">Generating your plan...</span></div>}
                    {plan && <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">{plan}</pre>}
                    {!isLoading && !plan && <div className="text-center text-gray-500 p-8">Your AI-generated study plan will appear here.</div>}
                </div>
             </div>
        </Card>
    );
};

export default AIExamPrepAnalyzer;
