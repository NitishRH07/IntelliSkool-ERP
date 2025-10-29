
import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { getDropoutRiskAnalysis } from '../../services/geminiService';
import { MOCK_STUDENTS } from '../../constants';
import { Student } from '../../types';

const AIDropoutPredictor: React.FC = () => {
    const [selectedStudentId, setSelectedStudentId] = useState<string>(MOCK_STUDENTS[0].id);
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState('');
    
    const selectedStudent = MOCK_STUDENTS.find(s => s.id === selectedStudentId) as Student;

    const handleGenerate = async () => {
        setIsLoading(true);
        setAnalysis('');
        const studentData = `
            Student ID: ${selectedStudent.id}
            Name: ${selectedStudent.name}
            Recent Grades: ${JSON.stringify(selectedStudent.grades)}
            Overall Attendance: ${selectedStudent.attendance}%
            Recent Behavior Notes: No major issues reported, but participation has decreased in Physics class.
        `;
        const result = await getDropoutRiskAnalysis(studentData);
        setAnalysis(result);
        setIsLoading(false);
    };

    return (
        <Card title="Dropout Alert System" icon="fa-solid fa-user-slash">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Selection and Data Display */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="student-select" className="block text-sm font-medium text-gray-700">Select Student for Analysis</label>
                        <select
                            id="student-select"
                            value={selectedStudentId}
                            onChange={e => {
                                setSelectedStudentId(e.target.value)
                                setAnalysis('');
                            }}
                            className="mt-1 block w-full input-style"
                        >
                            {MOCK_STUDENTS.map(student => (
                                <option key={student.id} value={student.id}>{student.name}</option>
                            ))}
                        </select>
                    </div>
                     {selectedStudent && (
                        <Card title="Student Snapshot">
                            <ul className="text-sm space-y-2">
                                <li><strong>Name:</strong> {selectedStudent.name}</li>
                                <li><strong>Attendance:</strong> <span className={selectedStudent.attendance < 80 ? 'text-red-600 font-bold' : ''}>{selectedStudent.attendance}%</span></li>
                                <li><strong>Grades:</strong>
                                    <ul className="list-disc list-inside ml-4">
                                        {Object.entries(selectedStudent.grades).map(([subject, grade]) => (
                                            <li key={subject}>{subject}: <span className={grade < 60 ? 'text-red-600 font-bold' : ''}>{grade}%</span></li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </Card>
                    )}
                    <Button onClick={handleGenerate} isLoading={isLoading} className="w-full">
                        <i className="fa-solid fa-brain mr-2"></i> Analyze Dropout Risk
                    </Button>
                </div>

                {/* Analysis Output */}
                 <div className="border border-gray-200 rounded-lg bg-gray-50 flex flex-col">
                    <div className="p-4 border-b">
                        <h4 className="text-lg font-semibold text-gray-800">AI Risk Analysis & Intervention Plan</h4>
                    </div>
                    <div className="p-6 overflow-y-auto flex-1 min-h-[300px]">
                        {isLoading && <div className="text-center p-8 text-primary">AI is analyzing student trends...</div>}
                        {analysis ? (
                            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">{analysis}</pre>
                        ) : (
                            !isLoading && <div className="text-center text-gray-500 p-8">The AI-generated risk analysis will appear here.</div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AIDropoutPredictor;
