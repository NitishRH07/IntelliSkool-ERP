import React, { useState } from 'react';
import Card from '../ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ParentAttendance: React.FC = () => {
    // Mock data - in a real app, this would come from an API
    const [attendanceData] = useState([
        { date: '2024-03-01', attendance: 100 },
        { date: '2024-03-02', attendance: 100 },
        { date: '2024-03-03', attendance: 0 }, // Sunday
        { date: '2024-03-04', attendance: 100 },
        { date: '2024-03-05', attendance: 100 },
        { date: '2024-03-06', attendance: 100 },
        { date: '2024-03-07', attendance: 0 }, // Absent
        { date: '2024-03-08', attendance: 100 },
        { date: '2024-03-09', attendance: 100 },
        { date: '2024-03-10', attendance: 0 }, // Sunday
        { date: '2024-03-11', attendance: 100 },
        { date: '2024-03-12', attendance: 100 },
        { date: '2024-03-13', attendance: 100 },
        { date: '2024-03-14', attendance: 100 },
        { date: '2024-03-15', attendance: 0 }, // Absent
    ]);

    const [monthlyData] = useState([
        { month: 'Jan', attendance: 92 },
        { month: 'Feb', attendance: 88 },
        { month: 'Mar', attendance: 82 },
        { month: 'Apr', attendance: 0 },
        { month: 'May', attendance: 0 },
        { month: 'Jun', attendance: 0 },
    ]);

    const calculateStats = () => {
        const totalDays = attendanceData.length;
        const presentDays = attendanceData.filter(day => day.attendance === 100).length;
        const absentDays = attendanceData.filter(day => day.attendance === 0).length;
        const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
        
        return { totalDays, presentDays, absentDays, attendanceRate };
    };

    const stats = calculateStats();

    return (
        <div className="space-y-6">
            <Card title="Attendance Overview" icon="fa-solid fa-calendar-check">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="text-2xl font-bold text-blue-800">{stats.attendanceRate}%</div>
                        <div className="text-sm text-blue-700">Attendance Rate</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <div className="text-2xl font-bold text-green-800">{stats.presentDays}</div>
                        <div className="text-sm text-green-700">Days Present</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                        <div className="text-2xl font-bold text-red-800">{stats.absentDays}</div>
                        <div className="text-sm text-red-700">Days Absent</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="text-2xl font-bold text-gray-800">{stats.totalDays}</div>
                        <div className="text-sm text-gray-700">Total Days</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card title="Daily Attendance">
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={attendanceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
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

                    <Card title="Monthly Trend">
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis domain={[0, 100]} />
                                    <Tooltip />
                                    <Legend />
                                    <Line 
                                        type="monotone" 
                                        dataKey="attendance" 
                                        stroke="#10b981" 
                                        name="Monthly Attendance %"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                <div className="mt-6">
                    <Card title="Attendance Details">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {attendanceData.map((day, index) => (
                                        <tr key={index} className={day.attendance === 0 ? "bg-red-50" : ""}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{day.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    day.attendance === 100 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {day.attendance === 100 ? 'Present' : 'Absent'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {day.attendance === 0 ? 'Fever' : 'Regular attendance'}
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

export default ParentAttendance;