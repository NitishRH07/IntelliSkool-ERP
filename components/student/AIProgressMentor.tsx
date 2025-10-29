import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { getMentorshipAdvice } from '../../services/geminiService';

const AIProgressMentor: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [advice, setAdvice] = useState('');

    // Mock student data for demonstration
    const studentData = {
        name: 'Alex',
        grades: { 'Math': 85, 'Physics': 72, 'History': 91, 'English': 88 },
        attendance: '92%',
        recentFeedback: 'Struggling with physics formulas but excellent in history essays.'
    };

    const handleGetAdvice = async () => {
        setIsLoading(true);
        setAdvice('');
        const dataString = `
            Name: ${studentData.name}
            Grades: ${JSON.stringify(studentData.grades)}
            Attendance: ${studentData.attendance}
            Teacher Feedback: ${studentData.recentFeedback}
        `;
        const result = await getMentorshipAdvice(dataString);
        setAdvice(result);
        setIsLoading(false);
    };

    return (
        <Card title="AI Progress Mentor" icon="fa-solid fa-user-graduate">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <Card title="Your Current Progress">
                        <ul className="text-sm space-y-2">
                            <li><strong>Name:</strong> {studentData.name}</li>
                            <li><strong>Attendance:</strong> {studentData.attendance}</li>
                            <li><strong>Grades:</strong>
                                <ul className="list-disc list-inside ml-4">
                                    {Object.entries(studentData.grades).map(([subject, grade]) => (
                                        <li key={subject}>{subject}: {grade}%</li>
                                    ))}
                                </ul>
                            </li>
                             <li><strong>Recent Feedback:</strong> {studentData.recentFeedback}</li>
                        </ul>
                    </Card>
                    <Button onClick={handleGetAdvice} isLoading={isLoading} className="w-full">
                        <i className="fa-solid fa-brain mr-2"></i> Get AI Mentorship
                    </Button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[300px]">
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">Your AI Mentor Says...</h4>
                    {isLoading && <div className="text-center p-8"><span className="text-primary">Analyzing your progress...</span></div>}
                    {advice && <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">{advice}</pre>}
                    {!isLoading && !advice && <div className="text-center text-gray-500 p-8">Get personalized advice from your AI mentor.</div>}
                </div>
             </div>
        </Card>
    );
};

export default AIProgressMentor;
