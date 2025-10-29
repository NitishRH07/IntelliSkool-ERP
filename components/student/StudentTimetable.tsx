import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface TimetableEntry {
    id: string;
    day: string;
    time: string;
    subject: string;
    teacher: string;
    room: string;
    type: 'lecture' | 'lab' | 'tutorial';
}

const StudentTimetable: React.FC = () => {
    // Mock data - in a real app, this would come from an API
    const [timetable] = useState<TimetableEntry[]>([
        { id: 'T001', day: 'Monday', time: '09:00 - 10:00', subject: 'Physics', teacher: 'Dr. Sarah Johnson', room: 'Room 101', type: 'lecture' },
        { id: 'T002', day: 'Monday', time: '10:00 - 11:00', subject: 'Mathematics', teacher: 'Prof. Michael Chen', room: 'Room 205', type: 'lecture' },
        { id: 'T003', day: 'Monday', time: '11:15 - 12:15', subject: 'Chemistry Lab', teacher: 'Dr. Emily Wilson', room: 'Lab 301', type: 'lab' },
        { id: 'T004', day: 'Monday', time: '12:15 - 13:15', subject: 'English', teacher: 'Ms. Jessica Brown', room: 'Room 105', type: 'lecture' },
        { id: 'T005', day: 'Monday', time: '14:00 - 15:00', subject: 'Biology', teacher: 'Dr. Robert Davis', room: 'Room 108', type: 'lecture' },
        
        { id: 'T006', day: 'Tuesday', time: '09:00 - 10:00', subject: 'Mathematics', teacher: 'Prof. Michael Chen', room: 'Room 205', type: 'lecture' },
        { id: 'T007', day: 'Tuesday', time: '10:00 - 11:00', subject: 'Physics Lab', teacher: 'Dr. Sarah Johnson', room: 'Lab 302', type: 'lab' },
        { id: 'T008', day: 'Tuesday', time: '11:15 - 12:15', subject: 'Chemistry', teacher: 'Dr. Emily Wilson', room: 'Room 103', type: 'lecture' },
        { id: 'T009', day: 'Tuesday', time: '12:15 - 13:15', subject: 'English', teacher: 'Ms. Jessica Brown', room: 'Room 105', type: 'lecture' },
        
        { id: 'T010', day: 'Wednesday', time: '09:00 - 10:00', subject: 'Biology Lab', teacher: 'Dr. Robert Davis', room: 'Lab 303', type: 'lab' },
        { id: 'T011', day: 'Wednesday', time: '10:00 - 11:00', subject: 'Mathematics', teacher: 'Prof. Michael Chen', room: 'Room 205', type: 'lecture' },
        { id: 'T012', day: 'Wednesday', time: '11:15 - 12:15', subject: 'Physics', teacher: 'Dr. Sarah Johnson', room: 'Room 101', type: 'lecture' },
        { id: 'T013', day: 'Wednesday', time: '12:15 - 13:15', subject: 'Chemistry', teacher: 'Dr. Emily Wilson', room: 'Room 103', type: 'lecture' },
        
        { id: 'T014', day: 'Thursday', time: '09:00 - 10:00', subject: 'English', teacher: 'Ms. Jessica Brown', room: 'Room 105', type: 'lecture' },
        { id: 'T015', day: 'Thursday', time: '10:00 - 11:00', subject: 'Biology', teacher: 'Dr. Robert Davis', room: 'Room 108', type: 'lecture' },
        { id: 'T016', day: 'Thursday', time: '11:15 - 12:15', subject: 'Mathematics Tutorial', teacher: 'Prof. Michael Chen', room: 'Room 201', type: 'tutorial' },
        { id: 'T017', day: 'Thursday', time: '12:15 - 13:15', subject: 'Physics', teacher: 'Dr. Sarah Johnson', room: 'Room 101', type: 'lecture' },
        
        { id: 'T018', day: 'Friday', time: '09:00 - 10:00', subject: 'Chemistry', teacher: 'Dr. Emily Wilson', room: 'Room 103', type: 'lecture' },
        { id: 'T019', day: 'Friday', time: '10:00 - 11:00', subject: 'Biology', teacher: 'Dr. Robert Davis', room: 'Room 108', type: 'lecture' },
        { id: 'T020', day: 'Friday', time: '11:15 - 12:15', subject: 'English', teacher: 'Ms. Jessica Brown', room: 'Room 105', type: 'lecture' },
    ]);

    const [currentDay, setCurrentDay] = useState<string>('Monday');
    const [showAIRecommendation, setShowAIRecommendation] = useState(false);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    const getTypeColor = (type: string) => {
        switch (type) {
            case 'lecture': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'lab': return 'bg-green-100 text-green-800 border-green-200';
            case 'tutorial': return 'bg-purple-100 text-purple-800 border-purple-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const filteredTimetable = timetable.filter(entry => entry.day === currentDay);

    const getNextClass = () => {
        const today = new Date();
        const todayName = days[today.getDay() === 0 ? 6 : today.getDay() - 1]; // Adjust for JS Sunday=0
        const todayEntries = timetable.filter(entry => entry.day === todayName);
        
        // In a real app, you would compare with current time
        return todayEntries.length > 0 ? todayEntries[0] : null;
    };

    const nextClass = getNextClass();

    return (
        <div className="space-y-6">
            <Card title="Weekly Timetable" icon="fa-solid fa-calendar-alt">
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-medium">Class Schedule</h3>
                        <p className="text-gray-600 text-sm">Your weekly academic timetable</p>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={() => setShowAIRecommendation(true)}>
                            <i className="fa-solid fa-robot mr-2"></i> AI Optimize
                        </Button>
                        <Button variant="secondary">
                            <i className="fa-solid fa-download mr-2"></i> Download
                        </Button>
                    </div>
                </div>

                {nextClass && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg">
                        <div className="flex items-center">
                            <i className="fa-solid fa-bell text-blue-500 text-xl mr-3"></i>
                            <div>
                                <div className="font-medium text-blue-800">Next Class</div>
                                <div className="text-sm text-blue-700">
                                    {nextClass.subject} with {nextClass.teacher} at {nextClass.time} in {nextClass.room}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                        {days.slice(0, 5).map(day => (
                            <button
                                key={day}
                                onClick={() => setCurrentDay(day)}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    currentDay === day
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredTimetable.map((entry) => (
                                <tr key={entry.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.time}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.subject}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.teacher}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.room}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getTypeColor(entry.type)}`}>
                                            {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredTimetable.length === 0 && (
                    <div className="text-center py-12">
                        <i className="fa-solid fa-calendar-xmark text-4xl text-gray-300 mb-4"></i>
                        <h3 className="text-xl font-medium text-gray-700">No classes scheduled</h3>
                        <p className="text-gray-500 mt-2">Enjoy your day off!</p>
                    </div>
                )}
            </Card>

            {/* Weekly Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Weekly Overview">
                    <div className="space-y-4">
                        {days.slice(0, 5).map(day => {
                            const dayEntries = timetable.filter(entry => entry.day === day);
                            return (
                                <div key={day} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                    <div className="w-20 font-medium text-gray-700">{day}</div>
                                    <div className="flex-1">
                                        <div className="text-sm text-gray-600">
                                            {dayEntries.length} class{dayEntries.length !== 1 ? 'es' : ''}
                                        </div>
                                        {dayEntries.length > 0 && (
                                            <div className="text-xs text-gray-500 mt-1">
                                                {dayEntries[0].time} - {dayEntries[dayEntries.length - 1].time}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-sm font-medium">
                                        {dayEntries.length > 0 ? dayEntries[0].subject : 'Free'}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>

                <Card title="Subject Distribution">
                    <div className="space-y-4">
                        {['Physics', 'Mathematics', 'Chemistry', 'Biology', 'English'].map(subject => {
                            const subjectEntries = timetable.filter(entry => entry.subject.includes(subject));
                            const hours = subjectEntries.length;
                            return (
                                <div key={subject} className="flex items-center">
                                    <div className="w-24 text-sm font-medium text-gray-700">{subject}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="bg-primary h-2 rounded-full" 
                                                    style={{ width: `${(hours / 10) * 100}%` }}
                                                ></div>
                                            </div>
                                            <div className="ml-2 text-sm text-gray-600 w-10">{hours}h</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>

            {/* AI Recommendation Modal */}
            {showAIRecommendation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">AI Timetable Optimization</h3>
                                <button 
                                    onClick={() => setShowAIRecommendation(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            
                            <div className="mb-6">
                                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                                    <div className="flex">
                                        <i className="fa-solid fa-robot text-blue-500 text-xl mr-3 mt-1"></i>
                                        <div>
                                            <h4 className="font-medium text-blue-800">AI Analysis Complete</h4>
                                            <p className="text-sm text-blue-700 mt-1">
                                                Based on your performance data and preferences, here are some optimization suggestions:
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-4 space-y-3">
                                    <div className="flex items-start p-3 bg-green-50 rounded-lg border border-green-100">
                                        <i className="fa-solid fa-lightbulb text-green-500 mt-1 mr-3"></i>
                                        <div>
                                            <h4 className="font-medium text-green-800">Optimal Study Time</h4>
                                            <p className="text-sm text-green-700">
                                                Your focus peaks between 9-11 AM. Consider requesting morning slots for challenging subjects.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                                        <i className="fa-solid fa-clock text-yellow-500 mt-1 mr-3"></i>
                                        <div>
                                            <h4 className="font-medium text-yellow-800">Break Optimization</h4>
                                            <p className="text-sm text-yellow-700">
                                                You have back-to-back classes on Wednesday. Adding a 15-min break would improve retention.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start p-3 bg-purple-50 rounded-lg border border-purple-100">
                                        <i className="fa-solid fa-flask text-purple-500 mt-1 mr-3"></i>
                                        <div>
                                            <h4 className="font-medium text-purple-800">Lab Scheduling</h4>
                                            <p className="text-sm text-purple-700">
                                                Chemistry and Physics labs are on consecutive days. Spreading them out would reduce fatigue.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-end space-x-3">
                                <Button variant="secondary" onClick={() => setShowAIRecommendation(false)}>
                                    Close
                                </Button>
                                <Button>
                                    <i className="fa-solid fa-message mr-2"></i> Send to Advisor
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentTimetable;