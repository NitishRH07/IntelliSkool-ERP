import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { UserRole } from '../types';
import { TEACHER_MENU } from '../constants';
import StatCard from '../components/ui/StatCard';
import AIQuestionGenerator from '../components/ai/AIQuestionGenerator';
import AIQuizGenerator from '../components/ai/AIQuizGenerator';
import AILessonPlanner from '../components/ai/AILessonPlanner';
import AIRemarksGenerator from '../components/ai/AIRemarksGenerator';
import AIFeedbackGenerator from '../components/ai/AIFeedbackGenerator';
import AIPaperEvaluator from '../components/ai/AIPaperEvaluator';
import PlaceholderContent from '../components/ui/PlaceholderContent';
import VideoGenerator from '../components/ai/VideoGenerator';
import StudentManagement from '../components/teacher/StudentManagement';
import AIGradingAssistant from '../components/teacher/AIGradingAssistant';
import AIStudentPredictor from '../components/teacher/AIStudentPredictor';
import TeacherClasses from '../components/teacher/TeacherClasses';
import TeacherAssignments from '../components/teacher/TeacherAssignments';
import TeacherAttendance from '../components/teacher/TeacherAttendance';
import TeacherCommunication from '../components/teacher/TeacherCommunication';
import TeacherProfile from '../components/teacher/TeacherProfile';

const TeacherDashboard: React.FC<{ setUserRole: (role: UserRole | null) => void }> = ({ setUserRole }) => {
    const [activeView, setActiveView] = useState('dashboard');

    const handleLogout = () => {
        setUserRole(null);
    };

    const renderContent = () => {
        switch (activeView) {
            case 'aiQuestionGen':
                return <AIQuestionGenerator />;
            case 'aiQuizGen':
                return <AIQuizGenerator />;
            case 'aiLessonPlanner':
                return <AILessonPlanner />;
            case 'aiRemarksGen':
                return <AIRemarksGenerator />;
            case 'aiFeedbackGen':
                return <AIFeedbackGenerator />;
            case 'aiPaperEvaluator':
                return <AIPaperEvaluator />;
            case 'videoGenerator': // Added for completeness, can be linked from a menu
                 return <VideoGenerator />;
            case 'studentManagement':
                return <StudentManagement />;
            case 'aiGradingAssistant':
                return <AIGradingAssistant />;
            case 'aiStudentPredictor':
                return <AIStudentPredictor />;
            case 'classes':
                return <TeacherClasses />;
            case 'assignments':
                return <TeacherAssignments />;
            case 'attendance':
                return <TeacherAttendance />;
            case 'communication':
                return <TeacherCommunication />;
            case 'profile':
                return <TeacherProfile />;
            case 'dashboard':
            default:
                return (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold">Welcome, Teacher!</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard title="Active Classes" value="4" icon="fa-solid fa-school" color="bg-blue-500" />
                            <StatCard title="Total Students" value="120" icon="fa-solid fa-users" color="bg-green-500" />
                            <StatCard title="Assignments to Grade" value="15" icon="fa-solid fa-file-pen" color="bg-orange-500" />
                            <StatCard title="Upcoming Lessons" value="3" icon="fa-solid fa-calendar-week" color="bg-indigo-500" />
                        </div>
                    </div>
                );
        }
    };

    return (
        <DashboardLayout
            userRole={UserRole.TEACHER}
            menuItems={TEACHER_MENU}
            activeView={activeView}
            setActiveView={setActiveView}
            onLogout={handleLogout}
        >
            {renderContent()}
        </DashboardLayout>
    );
};

export default TeacherDashboard;