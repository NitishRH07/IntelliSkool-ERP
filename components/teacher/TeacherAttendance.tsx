import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface StudentAttendance {
    id: string;
    name: string;
    rollNumber: string;
    present: boolean;
}

interface AttendanceRecord {
    date: string;
    students: StudentAttendance[];
}

const TeacherAttendance: React.FC = () => {
    // Mock data - in a real app, this would come from an API
    const [students] = useState([
        { id: 'S001', name: 'Alice Johnson', rollNumber: '10A01' },
        { id: 'S002', name: 'Bob Smith', rollNumber: '10A02' },
        { id: 'S003', name: 'Charlie Brown', rollNumber: '10A03' },
        { id: 'S004', name: 'Diana Miller', rollNumber: '10A04' },
        { id: 'S005', name: 'Edward Davis', rollNumber: '10A05' },
    ]);

    const [attendanceRecords] = useState<AttendanceRecord[]>([
        { 
            date: '2024-03-11', 
            students: [
                { id: 'S001', name: 'Alice Johnson', rollNumber: '10A01', present: true },
                { id: 'S002', name: 'Bob Smith', rollNumber: '10A02', present: true },
                { id: 'S003', name: 'Charlie Brown', rollNumber: '10A03', present: false },
                { id: 'S004', name: 'Diana Miller', rollNumber: '10A04', present: true },
                { id: 'S005', name: 'Edward Davis', rollNumber: '10A05', present: true },
            ]
        },
        { 
            date: '2024-03-12', 
            students: [
                { id: 'S001', name: 'Alice Johnson', rollNumber: '10A01', present: true },
                { id: 'S002', name: 'Bob Smith', rollNumber: '10A02', present: false },
                { id: 'S003', name: 'Charlie Brown', rollNumber: '10A03', present: true },
                { id: 'S004', name: 'Diana Miller', rollNumber: '10A04', present: true },
                { id: 'S005', name: 'Edward Davis', rollNumber: '10A05', present: true },
            ]
        },
        { 
            date: '2024-03-13', 
            students: [
                { id: 'S001', name: 'Alice Johnson', rollNumber: '10A01', present: true },
                { id: 'S002', name: 'Bob Smith', rollNumber: '10A02', present: true },
                { id: 'S003', name: 'Charlie Brown', rollNumber: '10A03', present: true },
                { id: 'S004', name: 'Diana Miller', rollNumber: '10A04', present: false },
                { id: 'S005', name: 'Edward Davis', rollNumber: '10A05', present: true },
            ]
        },
        { 
            date: '2024-03-14', 
            students: [
                { id: 'S001', name: 'Alice Johnson', rollNumber: '10A01', present: true },
                { id: 'S002', name: 'Bob Smith', rollNumber: '10A02', present: true },
                { id: 'S003', name: 'Charlie Brown', rollNumber: '10A03', present: true },
                { id: 'S004', name: 'Diana Miller', rollNumber: '10A04', present: true },
                { id: 'S005', name: 'Edward Davis', rollNumber: '10A05', present: false },
            ]
        },
        { 
            date: '2024-03-15', 
            students: [
                { id: 'S001', name: 'Alice Johnson', rollNumber: '10A01', present: true },
                { id: 'S002', name: 'Bob Smith', rollNumber: '10A02', present: true },
                { id: 'S003', name: 'Charlie Brown', rollNumber: '10A03', present: false },
                { id: 'S004', name: 'Diana Miller', rollNumber: '10A04', present: true },
                { id: 'S005', name: 'Edward Davis', rollNumber: '10A05', present: true },
            ]
        },
    ]);

    const [selectedDate, setSelectedDate] = useState(attendanceRecords[attendanceRecords.length - 1].date);
    const [attendanceData, setAttendanceData] = useState<{[key: string]: boolean}>({});

    // Initialize attendance data for selected date
    React.useEffect(() => {
        const selectedRecord = attendanceRecords.find(record => record.date === selectedDate);
        if (selectedRecord) {
            const initialData: {[key: string]: boolean} = {};
            selectedRecord.students.forEach(student => {
                initialData[student.id] = student.present;
            });
            setAttendanceData(initialData);
        }
    }, [selectedDate, attendanceRecords]);

    const handleAttendanceChange = (studentId: string, present: boolean) => {
        setAttendanceData({
            ...attendanceData,
            [studentId]: present
        });
    };

    const handleSaveAttendance = () => {
        // In a real app, this would save to an API
        alert('Attendance saved successfully!');
    };

    // Calculate attendance statistics
    const calculateStats = () => {
        const totalDays = attendanceRecords.length;
        const studentStats = students.map(student => {
            const presentCount = attendanceRecords.filter(record => {
                const studentRecord = record.students.find(s => s.id === student.id);
                return studentRecord ? studentRecord.present : false;
            }).length;
            const attendanceRate = totalDays > 0 ? Math.round((presentCount / totalDays) * 100) : 0;
            return { ...student, presentCount, attendanceRate };
        });
        
        return studentStats;
    };

    const studentStats = calculateStats();

    // Prepare data for charts
    const attendanceTrendData = attendanceRecords.map(record => {
        const presentCount = record.students.filter(s => s.present).length;
        const totalCount = record.students.length;
        return {
            date: record.date,
            attendance: totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0
        };
    });

    const monthlyStats = [
        { month: 'Jan', attendance: 92 },
        { month: 'Feb', attendance: 88 },
        { month: 'Mar', attendance: 85 },
    ];

    return (
        <div className="space-y-6">
            <Card title="Attendance Management" icon="fa-solid fa-user-check">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Attendance Entry */}
                    <div className="lg:col-span-2">
                        <Card title="Mark Attendance">
                            <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                                    <select
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                    >
                                        {attendanceRecords.map(record => (
                                            <option key={record.date} value={record.date}>
                                                {record.date}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="secondary">
                                        <i className="fa-solid fa-print mr-2"></i> Print Sheet
                                    </Button>
                                    <Button onClick={handleSaveAttendance}>
                                        <i className="fa-solid fa-save mr-2"></i> Save Attendance
                                    </Button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {students.map((student) => (
                                            <tr key={student.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.rollNumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <label className="inline-flex items-center">
                                                            <input
                                                                type="radio"
                                                                name={`attendance-${student.id}`}
                                                                checked={attendanceData[student.id] === true}
                                                                onChange={() => handleAttendanceChange(student.id, true)}
                                                                className="h-4 w-4 text-primary focus:ring-primary"
                                                            />
                                                            <span className="ml-2 text-sm text-green-600">Present</span>
                                                        </label>
                                                        <label className="inline-flex items-center ml-6">
                                                            <input
                                                                type="radio"
                                                                name={`attendance-${student.id}`}
                                                                checked={attendanceData[student.id] === false}
                                                                onChange={() => handleAttendanceChange(student.id, false)}
                                                                className="h-4 w-4 text-primary focus:ring-primary"
                                                            />
                                                            <span className="ml-2 text-sm text-red-600">Absent</span>
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>

                    {/* Statistics */}
                    <div>
                        <Card title="Class Statistics">
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                    <div className="text-2xl font-bold text-blue-800">
                                        {students.length > 0 ? Math.round(
                                            Object.values(attendanceData).filter(present => present).length / students.length * 100
                                        ) : 0}%
                                    </div>
                                    <div className="text-sm text-blue-700">Today's Attendance</div>
                                </div>
                                
                                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                    <div className="text-2xl font-bold text-green-800">
                                        {studentStats.reduce((sum, stat) => sum + stat.attendanceRate, 0) / studentStats.length || 0}%
                                    </div>
                                    <div className="text-sm text-green-700">Average Attendance</div>
                                </div>
                                
                                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                                    <div className="text-2xl font-bold text-purple-800">
                                        {studentStats.filter(stat => stat.attendanceRate < 80).length}
                                    </div>
                                    <div className="text-sm text-purple-700">Students Needing Attention</div>
                                </div>
                            </div>
                        </Card>

                        <Card title="Attendance Trend" className="mt-6">
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={attendanceTrendData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis domain={[0, 100]} />
                                        <Tooltip />
                                        <Legend />
                                        <Line 
                                            type="monotone" 
                                            dataKey="attendance" 
                                            stroke="#4f46e5" 
                                            name="Attendance %"
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Student-wise Attendance */}
                <div className="mt-6">
                    <Card title="Student-wise Attendance">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Rate</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {studentStats.map((stat) => (
                                        <tr key={stat.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stat.rollNumber}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stat.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="text-sm text-gray-900 mr-2">{stat.attendanceRate}%</div>
                                                    <div className="w-24 bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            className="bg-primary h-2 rounded-full" 
                                                            style={{ width: `${stat.attendanceRate}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    stat.attendanceRate >= 90 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : stat.attendanceRate >= 80 
                                                            ? 'bg-yellow-100 text-yellow-800' 
                                                            : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {stat.attendanceRate >= 90 ? 'Excellent' : stat.attendanceRate >= 80 ? 'Good' : 'Needs Improvement'}
                                                </span>
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

export default TeacherAttendance;