import { MenuItem, Quiz, Student, UserRole } from './types';

// MENU ITEMS
export const ADMIN_MENU: MenuItem[] = [
    { label: 'Dashboard', icon: 'fa-solid fa-tachometer-alt', view: 'dashboard' },
    {
        label: 'AI Tools', icon: 'fa-solid fa-robot', submenu: [
            { label: 'Timetable Generator', icon: 'fa-solid fa-calendar-days', view: 'aiTimetable' },
            { label: 'Dropout Predictor', icon: 'fa-solid fa-user-slash', view: 'aiDropout' },
            { label: 'Smart Reports', icon: 'fa-solid fa-file-invoice', view: 'aiSmartReport' },
            { label: 'Admission Predictor', icon: 'fa-solid fa-chart-line', view: 'aiAdmissionPredictor' },
            { label: 'Performance Insights', icon: 'fa-solid fa-chart-line', view: 'aiPerformanceInsights' },
            { label: 'Fee Defaulter Predictor', icon: 'fa-solid fa-money-bill-trend-up', view: 'aiFeeDefaulter' },
            { label: 'Communication Bot', icon: 'fa-solid fa-robot', view: 'aiCommunicationBot' },
            { label: 'Staff Load Balancer', icon: 'fa-solid fa-balance-scale', view: 'aiStaffLoadBalancer' },
            { label: 'Result Analyzer', icon: 'fa-solid fa-chart-pie', view: 'aiResultAnalyzer' },
            { label: 'Institution Health', icon: 'fa-solid fa-heart-pulse', view: 'aiInstitutionHealth' },
            { label: 'Audit Report Generator', icon: 'fa-solid fa-file-contract', view: 'aiAuditReport' },
        ]
    },
    {
        label: 'User Management', icon: 'fa-solid fa-users-cog', submenu: [
            { label: 'User Directory', icon: 'fa-solid fa-users-gear', view: 'userManagement' },
            { label: 'Add Student', icon: 'fa-solid fa-user-plus', view: 'addStudent' },
            { label: 'Add Teacher', icon: 'fa-solid fa-user-plus', view: 'addTeacher' },
        ]
    },
    { label: 'Courses', icon: 'fa-solid fa-book', view: 'courses' },
    { label: 'Communication', icon: 'fa-solid fa-bullhorn', view: 'communication' },
    { label: 'Settings', icon: 'fa-solid fa-cogs', view: 'settings' },
];

export const TEACHER_MENU: MenuItem[] = [
    { label: 'Dashboard', icon: 'fa-solid fa-tachometer-alt', view: 'dashboard' },
    {
        label: 'Students', icon: 'fa-solid fa-users', submenu: [
            { label: 'Student Management', icon: 'fa-solid fa-users-gear', view: 'studentManagement' },
        ]
    },
    {
        label: 'AI Teaching Tools', icon: 'fa-solid fa-robot', submenu: [
            { label: 'Question Paper Gen', icon: 'fa-solid fa-file-alt', view: 'aiQuestionGen' },
            { label: 'Quiz Generator', icon: 'fa-solid fa-puzzle-piece', view: 'aiQuizGen' },
            { label: 'Lesson Planner', icon: 'fa-solid fa-calendar-week', view: 'aiLessonPlanner' },
            { label: 'Remarks Generator', icon: 'fa-solid fa-feather-pointed', view: 'aiRemarksGen' },
            { label: 'Feedback Generator', icon: 'fa-solid fa-marker', view: 'aiFeedbackGen' },
            { label: 'Paper Evaluator', icon: 'fa-solid fa-file-signature', view: 'aiPaperEvaluator' },
            { label: 'Video Generator', icon: 'fa-solid fa-video', view: 'videoGenerator' },
            { label: 'Grading Assistant', icon: 'fa-solid fa-file-pen', view: 'aiGradingAssistant' },
            { label: 'Performance Predictor', icon: 'fa-solid fa-chart-line', view: 'aiStudentPredictor' },
        ]
    },
    { label: 'My Classes', icon: 'fa-solid fa-school', view: 'classes' },
    { label: 'Assignments', icon: 'fa-solid fa-file-pen', view: 'assignments' },
    { label: 'Attendance', icon: 'fa-solid fa-user-check', view: 'attendance' },
    { label: 'Communication', icon: 'fa-solid fa-bullhorn', view: 'communication' },
    { label: 'Profile', icon: 'fa-solid fa-user', view: 'profile' },
];

export const STUDENT_MENU: MenuItem[] = [
    { label: 'Dashboard', icon: 'fa-solid fa-tachometer-alt', view: 'dashboard' },
    {
        label: 'Resources', icon: 'fa-solid fa-book', submenu: [
            { label: 'Study Materials', icon: 'fa-solid fa-book-open', view: 'studyMaterials' },
        ]
    },
    {
        label: 'AI Study Tools', icon: 'fa-solid fa-robot', submenu: [
            { label: 'Study Assistant', icon: 'fa-solid fa-comments', view: 'aiAssistant' },
            { label: 'Notes Summarizer', icon: 'fa-solid fa-file-lines', view: 'aiSummarizer' },
            { label: 'Flashcard Generator', icon: 'fa-solid fa-layer-group', view: 'aiFlashcards' },
            { label: 'Personalized Path', icon: 'fa-solid fa-route', view: 'aiLearningPath' },
            { label: 'Exam Prep Analyzer', icon: 'fa-solid fa-chart-pie', view: 'aiExamPrep' },
            { label: 'Image Analyzer', icon: 'fa-solid fa-image', view: 'imageAnalyzer' },
            { label: 'Doubt Solver', icon: 'fa-solid fa-lightbulb', view: 'aiDoubtSolver' },
            { label: 'Recommendation Engine', icon: 'fa-solid fa-robot', view: 'aiRecommendation' },
        ]
    },
    {
        label: 'Assessments', icon: 'fa-solid fa-pen-to-square', submenu: [
            { label: 'Take a Quiz', icon: 'fa-solid fa-puzzle-piece', view: 'takeQuiz' },
        ]
    },
    {
        label: 'Performance', icon: 'fa-solid fa-chart-line', submenu: [
             { label: 'Progress Mentor', icon: 'fa-solid fa-user-graduate', view: 'aiMentor' },
        ]
    },
    { label: 'My Courses', icon: 'fa-solid fa-book-open-reader', view: 'myCourses' },
    { label: 'Timetable', icon: 'fa-solid fa-calendar-alt', view: 'timetable' },
    { label: 'My Profile', icon: 'fa-solid fa-user', view: 'profile' },
];


export const PARENT_MENU: MenuItem[] = [
    { label: 'Dashboard', icon: 'fa-solid fa-tachometer-alt', view: 'dashboard' },
    { label: 'Performance Prediction', icon: 'fa-solid fa-arrow-trend-up', view: 'aiPrediction' },
    { label: 'Attendance', icon: 'fa-solid fa-user-check', view: 'attendance' },
    { label: 'Grades', icon: 'fa-solid fa-percent', view: 'grades' },
    { label: 'Fees', icon: 'fa-solid fa-money-bill-wave', view: 'fees' },
    { label: 'Communicate', icon: 'fa-solid fa-comments', view: 'communicate' },
    { label: 'Report Card', icon: 'fa-solid fa-file-certificate', view: 'reportCard' },
    { label: 'My Profile', icon: 'fa-solid fa-user', view: 'profile' },
];

export const MANAGEMENT_MENU: MenuItem[] = [
    { label: 'Dashboard', icon: 'fa-solid fa-tachometer-alt', view: 'dashboard' },
    {
        label: 'AI Intelligence Hub', icon: 'fa-solid fa-robot', submenu: [
            { label: 'Department Performance', icon: 'fa-solid fa-sitemap', view: 'aiDeptPerformance' },
            { label: 'Performance Insights', icon: 'fa-solid fa-chart-line', view: 'aiPerformanceInsights' },
            { label: 'Financial Forecasting', icon: 'fa-solid fa-chart-line', view: 'aiFinancialForecasting' },
            { label: 'Staff Efficiency', icon: 'fa-solid fa-user-tie', view: 'aiStaffEfficiency' },
            { label: 'Student Success', icon: 'fa-solid fa-graduation-cap', view: 'aiStudentSuccess' },
            { label: 'Decision Support', icon: 'fa-solid fa-brain', view: 'aiDecisionSupport' },
            { label: 'Report Summarizer', icon: 'fa-solid fa-file-contract', view: 'aiReportSummarizer' },
            { label: 'Budget Optimizer', icon: 'fa-solid fa-money-bill-trend-up', view: 'aiBudgetOptimizer' },
        ]
    },
    { label: 'Financials', icon: 'fa-solid fa-chart-pie', view: 'financials' },
    { label: 'Admissions', icon: 'fa-solid fa-user-plus', view: 'admissions' },
    { label: 'Staffing', icon: 'fa-solid fa-users-cog', view: 'staffing' },
];

// MOCK DATA WITH SOUTH INDIAN NAMES
// South Indian names for students, teachers, and parents
const SOUTH_INDIAN_STUDENT_NAMES = [
    // Tamil names
    "Arjun", "Priya", "Kavin", "Meera", "Dinesh", "Lakshmi", "Suresh", "Anitha", "Rajesh", "Kavitha",
    "Vijay", "Deepa", "Karthik", "Nithya", "Prakash", "Sangeetha", "Ramesh", "Revathi", "Mohan", "Sharmila",
    "Ganesh", "Poornima", "Selvaraj", "Kala", "Balaji", "Indhu", "Ravi", "Suganya", "Manoj", "Preethi",
    "Senthil", "Ranjani", "Naveen", "Chitra", "Ashok", "Geetha", "Vinod", "Saranya", "Prabhu", "Anu",
    "Sakthi", "Divya", "Raj", "Swetha", "Kumar", "Nandhini", "Rajkumar", "Pavithra", "Siva", "Madhavi",
    "Krishna", "Sivakami", "Venkat", "Tamilselvi", "Bala", "Kanimozhi", "Thiru", "Jayanthi", "Muthu", "Vanitha",
    
    // Telugu names
    "Sai", "Lakshmi", "Kiran", "Anjali", "Raju", "Swapna", "Prasad", "Radha", "Suresh", "Padma",
    "Ravi", "Sita", "Krishna", "Geetha", "Venkat", "Latha", "Ramesh", "Saritha", "Mohan", "Kavitha",
    "Ganesh", "Bhavani", "Srinivas", "Sujatha", "Rajesh", "Jyothi", "Prakash", "Suneetha", "Vijay", "Sailaja",
    "Arjun", "Sreedevi", "Kalyan", "Chandrika", "Suman", "Roja", "Rajendra", "Anuradha", "Raghav", "Indira",
    "Sudheer", "Sandhya", "Rajkumar", "Savithri", "Rajasekhar", "Pushpa", "Srinivas", "Radhika", "Raj", "Sneha",
    "Karthik", "Sravani", "Praveen", "Nirmala", "Rajeev", "Sujani", "Sandeep", "Sowmya", "Rajkiran", "Saritha",
    
    // Kannada names
    "Raj", "Priya", "Kumar", "Anitha", "Suresh", "Deepa", "Ramesh", "Lakshmi", "Prakash", "Sangeetha",
    "Vinod", "Savitha", "Mohan", "Shilpa", "Ganesh", "Radhika", "Ravi", "Sunita", "Srinivas", "Nandini",
    "Arjun", "Supreetha", "Karthik", "Sneha", "Rajesh", "Divya", "Praveen", "Sowmya", "Sudheer", "Swetha",
    "Rajkumar", "Shruthi", "Vijay", "Pavithra", "Rajendra", "Saritha", "Srinivas", "Savithri", "Raj", "Nithya",
    "Kiran", "Sujatha", "Rajasekhar", "Pushpa", "Raghav", "Suneetha", "Sandeep", "Sujani", "Rajkiran", "Sandhya",
    "Prasad", "Sravani", "Rajeev", "Roja", "Srinivas", "Sreedevi", "Rajendra", "Chandrika", "Rajkumar", "Sujatha",
    
    // Malayalam names
    "Ajith", "Anjali", "Suresh", "Deepa", "Rajesh", "Lakshmi", "Prakash", "Sangeetha", "Vinod", "Savitha",
    "Mohan", "Shilpa", "Ganesh", "Radhika", "Ravi", "Sunita", "Srinivas", "Nandini", "Arjun", "Supreetha",
    "Karthik", "Sneha", "Rajesh", "Divya", "Praveen", "Sowmya", "Sudheer", "Swetha", "Rajkumar", "Shruthi",
    "Vijay", "Pavithra", "Rajendra", "Saritha", "Srinivas", "Savithri", "Raj", "Nithya", "Kiran", "Sujatha",
    "Rajasekhar", "Pushpa", "Raghav", "Suneetha", "Sandeep", "Sujani", "Rajkiran", "Sandhya", "Prasad", "Sravani",
    "Rajeev", "Roja", "Srinivas", "Sreedevi", "Rajendra", "Chandrika", "Rajkumar", "Sujatha", "Ajith", "Anjali"
];

const SOUTH_INDIAN_TEACHER_NAMES = [
    "Dr. Ramanathan", "Dr. Lakshmi", "Prof. Krishnan", "Dr. Priya", "Prof. Venkatesh", "Dr. Anitha",
    "Dr. Suresh", "Prof. Meena", "Dr. Rajesh", "Prof. Kavitha", "Dr. Vijay", "Prof. Deepa",
    "Dr. Prakash", "Dr. Sangeetha", "Prof. Ramesh", "Dr. Revathi", "Prof. Mohan", "Dr. Sharmila",
    "Dr. Ganesh", "Prof. Poornima", "Dr. Selvaraj", "Prof. Kala", "Dr. Balaji", "Prof. Indhu",
    "Dr. Ravi", "Dr. Suganya", "Prof. Manoj", "Dr. Preethi", "Prof. Senthil", "Dr. Ranjani"
];

const SOUTH_INDIAN_PARENT_NAMES = [
    "Mr. Raman", "Mrs. Lakshmi", "Mr. Krishnan", "Mrs. Priya", "Mr. Venkatesh", "Mrs. Anitha",
    "Mr. Suresh", "Mrs. Meena", "Mr. Rajesh", "Mrs. Kavitha", "Mr. Vijay", "Mrs. Deepa",
    "Mr. Prakash", "Mrs. Sangeetha", "Mr. Ramesh", "Mrs. Revathi", "Mr. Mohan", "Mrs. Sharmila",
    "Mr. Ganesh", "Mrs. Poornima", "Mr. Selvaraj", "Mrs. Kala", "Mr. Balaji", "Mrs. Indhu",
    "Mr. Ravi", "Mrs. Suganya", "Mr. Manoj", "Mrs. Preethi", "Mr. Senthil", "Mrs. Ranjani"
];

// Generate mock students for all classes (8th, 9th, 10th, 1st PUC, 2nd PUC)
// Each class has 60 students
const generateMockStudents = (): Student[] => {
    const students: Student[] = [];
    const classes = ['8th', '9th', '10th', '1st PUC', '2nd PUC'];
    const subjects = {
        '8th': ['Math', 'Science', 'English', 'Social Science', 'Hindi'],
        '9th': ['Math', 'Physics', 'Chemistry', 'English', 'Social Science'],
        '10th': ['Math', 'Physics', 'Chemistry', 'English', 'Social Science'],
        '1st PUC': ['Math', 'Physics', 'Chemistry', 'English', 'Biology'],
        '2nd PUC': ['Math', 'Physics', 'Chemistry', 'English', 'Biology']
    };
    
    let idCounter = 1;
    
    classes.forEach((className, classIndex) => {
        for (let i = 1; i <= 60; i++) {
            const studentName = SOUTH_INDIAN_STUDENT_NAMES[(classIndex * 60 + i - 1) % SOUTH_INDIAN_STUDENT_NAMES.length];
            const studentId = `S${String(idCounter++).padStart(3, '0')}`;
            
            // Generate random grades for subjects
            const grades: { [subject: string]: number } = {};
            subjects[className as keyof typeof subjects].forEach(subject => {
                grades[subject] = Math.floor(Math.random() * 41) + 60; // Random grade between 60-100
            });
            
            // Random attendance between 70-100
            const attendance = Math.floor(Math.random() * 31) + 70;
            
            students.push({
                id: studentId,
                name: studentName,
                role: UserRole.STUDENT,
                grades,
                attendance
            });
        }
    });
    
    return students;
};

export const MOCK_STUDENTS: Student[] = generateMockStudents();

export const MOCK_QUIZ: Quiz = {
    title: 'Physics Fun: Laws of Motion',
    questions: [
        {
            questionText: "Which of Newton's laws is also known as the law of inertia?",
            options: ["First Law", "Second Law", "Third Law", "Law of Gravitation"],
            correctAnswer: "First Law",
        },
        {
            questionText: "What is the formula derived from Newton's Second Law?",
            options: ["E=mc^2", "F=ma", "a^2 + b^2 = c^2", "PV=nRT"],
            correctAnswer: "F=ma",
        },
        {
            questionText: "A rocket moving upwards is a classic example of which law?",
            options: ["First Law", "Second Law", "Third Law", "All of the above"],
            correctAnswer: "Third Law",
        }
    ]
};

// CHART DATA
export const GRADE_TREND_DATA = [
    { name: 'Jan', Math: 65, Physics: 70 },
    { name: 'Feb', Math: 70, Physics: 68 },
    { name: 'Mar', Math: 80, Physics: 75 },
    { name: 'Apr', Math: 75, Physics: 68 },
];

export const ATTENDANCE_DATA = [
    { name: 'Science', percentage: 91 },
    { name: 'Arts', percentage: 88 },
    { name: 'Commerce', percentage: 94 },
    { name: 'Engineering', percentage: 85 },
];