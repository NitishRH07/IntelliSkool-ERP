import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { UserRole } from '../types';
import { PARENT_MENU, GRADE_TREND_DATA, MOCK_STUDENTS } from '../constants';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAIAnalysis } from '../services/geminiService';
import Button from '../components/ui/Button';
import ParentAttendance from '../components/parent/ParentAttendance';
import ParentGrades from '../components/parent/ParentGrades';
import ParentFees from '../components/parent/ParentFees';
import ParentCommunication from '../components/parent/ParentCommunication';
import ParentReportCard from '../components/parent/ParentReportCard';
import ParentProfile from '../components/parent/ParentProfile';
import { getCurrentUser } from '../services/authService';
import PlaceholderContent from '../components/ui/PlaceholderContent';

const ParentDashboard: React.FC<{ setUserRole: (role: UserRole | null) => void }> = ({ setUserRole }) => {
    const [activeView, setActiveView] = useState('dashboard');
    const [prediction, setPrediction] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const currentUser = getCurrentUser();
    
    // Find the current student from mock data based on the current user
    // For demo purposes, we'll associate parents with students by name matching
    const currentStudent = MOCK_STUDENTS.find(student => 
        student.name.split(' ')[1] === currentUser?.name.split(' ')[1]) || MOCK_STUDENTS[0];

    const handleLogout = () => {
        setUserRole(null);
    };

    const fetchPrediction = async () => {
        setIsLoading(true);
        const prompt = `Based on this student's recent performance (Math: 75%, Physics: 68%, Chemistry: 85%) and attendance of 82%, predict their potential end-of-semester outcome. Provide a brief, encouraging analysis for a parent.`;
        const result = await getAIAnalysis(prompt);
        setPrediction(result);
        setIsLoading(false);
    };

    const renderContent = () => {
        switch (activeView) {
            case 'aiPrediction':
                return (
                    <Card title="AI Performance Prediction" icon="fa-solid fa-arrow-trend-up">
                        <p className="mb-4 text-gray-600">Our AI analyzes your child's recent performance to provide a forecast of their semester outcome, helping you stay informed.</p>
                        <Button onClick={fetchPrediction} isLoading={isLoading}>
                             <i className="fa-solid fa-chart-line mr-2"></i> Predict Performance
                        </Button>
                        {isLoading && <p className="mt-4 text-primary">AI is analyzing data... Please wait.</p>}
                        {prediction && (
                            <div className="mt-6 bg-gray-50 p-4 rounded-md">
                                <h4 className="font-semibold text-lg mb-2">AI Forecast:</h4>
                                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">{prediction}</pre>
                            </div>
                        )}
                    </Card>
                );
            case 'attendance':
                return <ParentAttendance />;
            case 'grades':
                return <ParentGrades />;
            case 'fees':
                return <ParentFees />;
            case 'communicate':
                return <ParentCommunication />;
            case 'reportCard':
                return <ParentReportCard />;
            case 'profile':
                return <ParentProfile />;
            default:
                // Handle missing components with placeholders
                if (activeView !== 'dashboard') {
                    return <PlaceholderContent title={activeView.replace(/([A-Z])/g, ' $1').trim()} message="This feature is under development." />;
                }
                // Calculate overall grade from student's grades
                const overallGrade = currentStudent ? 
                    (Object.values(currentStudent.grades).reduce((sum, grade) => sum + grade, 0) / Object.keys(currentStudent.grades).length).toFixed(0) + '%' : 
                    'B';
                    
                return (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold">Child's Progress: {currentStudent.name}</h3>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard title="Attendance" value={`${currentStudent.attendance}%`} icon="fa-solid fa-calendar-day" color="bg-red-500" />
                            <StatCard title="Overall Grade" value={overallGrade} icon="fa-solid fa-percent" color="bg-blue-500" />
                            <StatCard title="Fees Paid" value="Yes" icon="fa-solid fa-check-circle" color="bg-green-500" />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card title="Grade Trend" icon="fa-solid fa-chart-line">
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={GRADE_TREND_DATA}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="Math" stroke="#8884d8" />
                                        <Line type="monotone" dataKey="Physics" stroke="#82ca9d" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card>
                             <Card title="AI Alerts" icon="fa-solid fa-bell">
                                <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-md">
                                    <p><i className="fa-solid fa-triangle-exclamation mr-2"></i>Alert: Your child's performance is dropping in Physics. Attendance has also fallen by 10% this month.</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                );
        }
    };

    return (
        <DashboardLayout
            userRole={UserRole.PARENT}
            menuItems={PARENT_MENU}
            activeView={activeView}
            setActiveView={setActiveView}
            onLogout={handleLogout}
        >
            {renderContent()}
        </DashboardLayout>
    );
};

export default ParentDashboard;