import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { generateReportRemarks } from '../../services/geminiService';
import { MOCK_STUDENTS } from '../../constants';
import { Student } from '../../types';

const AIRemarksGenerator: React.FC = () => {
    const [selectedStudentId, setSelectedStudentId] = useState<string>(MOCK_STUDENTS[0].id);
    const [isLoading, setIsLoading] = useState(false);
    const [remarks, setRemarks] = useState('');

    const selectedStudent = MOCK_STUDENTS.find(s => s.id === selectedStudentId) as Student;

    const handleGenerate = async () => {
        setIsLoading(true);
        setRemarks('');
        const studentData = `
            Name: ${selectedStudent.name}
            Grades: ${JSON.stringify(selectedStudent.grades)}
            Attendance: ${selectedStudent.attendance}%
            General Participation: Good, asks questions occasionally.
        `;
        const result = await generateReportRemarks(studentData);
        setRemarks(result);
        setIsLoading(false);
    };

    return (
        <Card title="Auto Report / Remarks Generator" icon="fa-solid fa-feather-pointed">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input and Student Info */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="student-select" className="block text-sm font-medium text-gray-700">Select Student</label>
                        <select
                            id="student-select"
                            value={selectedStudentId}
                            onChange={e => {
                                setSelectedStudentId(e.target.value)
                                setRemarks('');
                            }}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        >
                            {MOCK_STUDENTS.map(student => (
                                <option key={student.id} value={student.id}>{student.name}</option>
                            ))}
                        </select>
                    </div>
                    {selectedStudent && (
                        <Card title="Student Performance Data">
                            <ul className="text-sm space-y-2">
                                <li><strong>Name:</strong> {selectedStudent.name}</li>
                                <li><strong>Attendance:</strong> {selectedStudent.attendance}%</li>
                                <li><strong>Grades:</strong>
                                    <ul className="list-disc list-inside ml-4">
                                        {Object.entries(selectedStudent.grades).map(([subject, grade]) => (
                                            <li key={subject}>{subject}: {grade}%</li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </Card>
                    )}
                    <Button onClick={handleGenerate} isLoading={isLoading} className="w-full">
                        <i className="fa-solid fa-wand-magic-sparkles mr-2"></i> Generate Remarks
                    </Button>
                </div>

                {/* Output Display */}
                <div className="space-y-4">
                     <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">Generated Remarks (Editable)</label>
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[300px]">
                       
                        {isLoading && <div className="text-center p-8"><span className="text-primary">Generating remarks with AI...</span></div>}
                        
                        <textarea
                            id="remarks"
                            value={remarks}
                            onChange={e => setRemarks(e.target.value)}
                            rows={12}
                            className="w-full p-2 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                            placeholder={!isLoading ? "Generated remarks will appear here. You can edit them directly." : ""}
                            readOnly={isLoading}
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AIRemarksGenerator;
