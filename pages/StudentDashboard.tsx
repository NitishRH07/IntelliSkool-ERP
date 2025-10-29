import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { UserRole } from '../types';
import { STUDENT_MENU, MOCK_STUDENTS } from '../constants';
import StatCard from '../components/ui/StatCard';
import PlaceholderContent from '../components/ui/PlaceholderContent';
import AIStudyAssistant from '../components/ai/AIStudyAssistant';
import AINotesSummarizer from '../components/student/AINotesSummarizer';
import AIFlashcardGenerator from '../components/student/AIFlashcardGenerator';
import AIPersonalizedLearningPath from '../components/student/AIPersonalizedLearningPath';
import AIExamPrepAnalyzer from '../components/student/AIExamPrepAnalyzer';
import AIProgressMentor from '../components/student/AIProgressMentor';
import QuizTaker from '../components/student/QuizTaker';
import ImageAnalyzer from '../components/ai/ImageAnalyzer';
import StudyMaterials from '../components/student/StudyMaterials';
import AIRecommendationEngine from '../components/student/AIRecommendationEngine';
import AIQuestionHelper from '../components/student/AIQuestionHelper';
import AIDoubtSolver from '../components/student/AIDoubtSolver';
import StudentCourses from '../components/student/StudentCourses';
import StudentTimetable from '../components/student/StudentTimetable';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StudentProfile from '../components/student/StudentProfile';
import { getCurrentUser } from '../services/authService';

const StudentDashboard: React.FC<{ setUserRole: (role: UserRole | null) => void }> = ({ setUserRole }) => {
    const [activeView, setActiveView] = useState('dashboard');
    const currentUser = getCurrentUser();
    
    // Find the current student from mock data based on the current user
    const currentStudent = MOCK_STUDENTS.find(student => student.name === currentUser?.name) || MOCK_STUDENTS[0];

    const handleLogout = () => {
        setUserRole(null);
    };

    const renderContent = () => {
        switch (activeView) {
            case 'aiAssistant':
                return <AIStudyAssistant />;
            case 'aiSummarizer':
                return <AINotesSummarizer />;
            case 'aiFlashcards':
                return <AIFlashcardGenerator />;
            case 'aiLearningPath':
                return <AIPersonalizedLearningPath />;
            case 'aiExamPrep':
                return <AIExamPrepAnalyzer />;
            case 'aiMentor':
                return <AIProgressMentor />;
            case 'takeQuiz':
                return <QuizTaker />;
            case 'imageAnalyzer':
                return <ImageAnalyzer />;
            case 'studyMaterials':
                return <StudyMaterials />;
            case 'aiRecommendation':
                return <AIRecommendationEngine />;
            case 'aiQaHelper':
                return <AIQuestionHelper />;
            case 'aiDoubtSolver':
                return <AIDoubtSolver />;
            case 'myCourses':
                return <StudentCourses />;
            case 'timetable':
                return <StudentTimetable />;
            case 'profile':
                return <StudentProfile />;
            case 'dashboard':
            default:
                // Calculate overall grade from student's grades
                const overallGrade = currentStudent ? 
                    (Object.values(currentStudent.grades).reduce((sum, grade) => sum + grade, 0) / Object.keys(currentStudent.grades).length).toFixed(0) + '%' : 
                    'B+';
                    
                return (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold">Welcome, {currentStudent.name}!</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard title="Overall Grade" value={overallGrade} icon="fa-solid fa-graduation-cap" color="bg-blue-500" />
                            <StatCard title="Attendance" value={`${currentStudent.attendance}%`} icon="fa-solid fa-user-check" color="bg-green-500" />
                            <StatCard title="Upcoming Quiz" value="Physics" icon="fa-solid fa-file-alt" color="bg-indigo-500" />
                            <StatCard title="Pending Assignments" value="2" icon="fa-solid fa-list-check" color="bg-orange-500" />
                        </div>
                         <Card title="Quick Actions">
                             <div className="flex flex-wrap gap-4">
                                <Button onClick={() => setActiveView('aiAssistant')}>Ask AI Assistant</Button>
                                <Button onClick={() => setActiveView('takeQuiz')} variant="secondary">Take Practice Quiz</Button>
                                <Button onClick={() => setActiveView('aiSummarizer')}>Summarize Notes</Button>
                                <Button onClick={() => setActiveView('studyMaterials')}>Study Materials</Button>
                             </div>
                         </Card>
                    </div>
                );
        }
    };

    return (
        <DashboardLayout
            userRole={UserRole.STUDENT}
            menuItems={STUDENT_MENU}
            activeView={activeView}
            setActiveView={setActiveView}
            onLogout={handleLogout}
        >
            {renderContent()}
        </DashboardLayout>
    );
};

export default StudentDashboard;