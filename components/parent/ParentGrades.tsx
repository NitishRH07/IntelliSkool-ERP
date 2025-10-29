import React, { useState } from 'react';
import Card from '../ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ParentGrades: React.FC = () => {
    // Mock data - in a real app, this would come from an API
    const [subjects] = useState([
        { name: 'Mathematics', score: 85, grade: 'A', maxScore: 100, minScore: 70 },
        { name: 'Physics', score: 68, grade: 'C', maxScore: 100, minScore: 65 },
        { name: 'Chemistry', score: 82, grade: 'B', maxScore: 100, minScore: 70 },
        { name: 'English', score: 78, grade: 'B', maxScore: 100, minScore: 75 },
        { name: 'Biology', score: 91, grade: 'A', maxScore: 100, minScore: 80 },
    ]);

    const [examHistory] = useState([
        { exam: 'Unit Test 1', Mathematics: 80, Physics: 70, Chemistry: 75, English: 82, Biology: 88 },
        { exam: 'Unit Test 2', Mathematics: 85, Physics: 65, Chemistry: 80, English: 75, Biology: 90 },
        { exam: 'Half-Yearly', Mathematics: 90, Physics: 72, Chemistry: 88, English: 85, Biology: 95 },
        { exam: 'Finals (Mock)', Mathematics: 85, Physics: 68, Chemistry: 82, English: 78, Biology: 91 },
    ]);

    const COLORS = ['#4f46e5', '#f97316', '#10b981', '#8b5cf6', '#ec4899'];

    const calculateOverallStats = () => {
        const totalScore = subjects.reduce((sum, subject) => sum + subject.score, 0);
        const averageScore = subjects.length > 0 ? Math.round(totalScore / subjects.length) : 0;
        
        const highestSubject = subjects.reduce((max, subject) => subject.score > max.score ? subject : max, subjects[0]);
        const lowestSubject = subjects.reduce((min, subject) => subject.score < min.score ? subject : min, subjects[0]);
        
        return { averageScore, highestSubject, lowestSubject };
    };

    const stats = calculateOverallStats();

    return (
        <div className="space-y-6">
            <Card title="Academic Performance" icon="fa-solid fa-chart-line">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="text-2xl font-bold text-blue-800">{stats.averageScore}%</div>
                        <div className="text-sm text-blue-700">Overall Average</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <div className="text-2xl font-bold text-green-800">{stats.highestSubject.name}</div>
                        <div className="text-sm text-green-700">Best Subject ({stats.highestSubject.score}%)</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                        <div className="text-2xl font-bold text-orange-800">{stats.lowestSubject.name}</div>
                        <div className="text-sm text-orange-700">Needs Attention ({stats.lowestSubject.score}%)</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card title="Subject-wise Performance">
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={subjects}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[0, 100]} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="score" name="Student Score" fill="#4f46e5" />
                                    <Bar dataKey="minScore" name="Passing Score" fill="#10b981" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card title="Performance Distribution">
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={subjects}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={true}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="score"
                                        nameKey="name"
                                        label={({ name, score }) => `${name}: ${score}%`}
                                    >
                                        {subjects.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                <div className="mt-6">
                    <Card title="Exam History">
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={examHistory}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="exam" />
                                    <YAxis domain={[0, 100]} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Mathematics" fill="#4f46e5" />
                                    <Bar dataKey="Physics" fill="#f97316" />
                                    <Bar dataKey="Chemistry" fill="#10b981" />
                                    <Bar dataKey="English" fill="#8b5cf6" />
                                    <Bar dataKey="Biology" fill="#ec4899" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                <div className="mt-6">
                    <Card title="Subject Details">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {subjects.map((subject, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subject.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.score}%</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {subject.grade}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    subject.score >= subject.minScore 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {subject.score >= subject.minScore ? 'Pass' : 'Needs Improvement'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {subject.score >= subject.minScore 
                                                    ? 'Good performance, keep it up!' 
                                                    : 'Focus on this subject for better results'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </Card>
        </div>
    );
};

export default ParentGrades;