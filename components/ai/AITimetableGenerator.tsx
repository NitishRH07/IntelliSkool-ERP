
import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { generateTimetable } from '../../services/geminiService';

const AITimetableGenerator: React.FC = () => {
    const [constraints, setConstraints] = useState(
        `Teachers: Mr. Smith (Physics), Mrs. Jones (Math), Ms. Davis (English).
Classes: Grade 9, Grade 10.
Subjects: Physics (4 hours/week), Math (5 hours/week), English (4 hours/week).
Rules:
- No class can have more than 2 consecutive hours of the same subject.
- School hours are 9 AM to 3 PM with a lunch break at 12 PM.
- Mr. Smith is unavailable on Friday afternoons.`
    );
    const [isLoading, setIsLoading] = useState(false);
    const [timetable, setTimetable] = useState('');
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        setIsLoading(true);
        setTimetable('');
        setError('');
        try {
            const result = await generateTimetable(constraints);
            setTimetable(result);
        } catch (err) {
            setError('Failed to generate timetable. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card title="AI Timetable Generator" icon="fa-solid fa-robot">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Form */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="constraints" className="block text-sm font-medium text-gray-700">Enter Constraints</label>
                        <textarea
                            id="constraints"
                            value={constraints}
                            onChange={e => setConstraints(e.target.value)}
                            rows={15}
                            className="mt-1 block w-full input-style"
                            placeholder="List teachers, subjects, classes, and rules..."
                        />
                    </div>
                    <Button onClick={handleGenerate} isLoading={isLoading} className="w-full">
                        <i className="fa-solid fa-wand-magic-sparkles mr-2"></i> Generate Timetable
                    </Button>
                </div>

                {/* Output Display */}
                <div className="border border-gray-200 rounded-lg bg-gray-50 flex flex-col">
                    <div className="p-4 border-b">
                        <h4 className="text-lg font-semibold text-gray-800">Generated Timetable Proposal</h4>
                    </div>
                    <div className="p-6 overflow-y-auto flex-1 min-h-[300px]">
                        {isLoading && <div className="text-center p-8 text-primary">AI is solving the schedule puzzle...</div>}
                        {error && <div className="text-center p-8 text-red-600">{error}</div>}
                        {timetable ? (
                            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">{timetable}</pre>
                        ) : (
                            !isLoading && <div className="text-center text-gray-500 p-8">The generated timetable will appear here.</div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AITimetableGenerator;
