import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface SubjectGrade {
    subject: string;
    marks: number;
    grade: string;
    teacher: string;
    comments: string;
}

interface ReportCardData {
    studentName: string;
    studentId: string;
    grade: string;
    section: string;
    academicYear: string;
    term: string;
    subjects: SubjectGrade[];
    overallGrade: string;
    attendance: number;
    rank: string;
    classAverage: number;
}

const ParentReportCard: React.FC = () => {
    // Mock data - in a real app, this would come from an API
    const [reportData] = useState<ReportCardData>({
        studentName: 'Alex Morgan',
        studentId: 'S001',
        grade: '10th',
        section: 'A',
        academicYear: '2023-2024',
        term: 'Half-Yearly',
        overallGrade: 'B+',
        attendance: 82,
        rank: '12th',
        classAverage: 78,
        subjects: [
            { subject: 'Mathematics', marks: 85, grade: 'A', teacher: 'Ms. Davis', comments: 'Excellent problem-solving skills. Consistent performance.' },
            { subject: 'Physics', marks: 68, grade: 'C', teacher: 'Mr. Johnson', comments: 'Needs improvement in numerical problems. Regular practice recommended.' },
            { subject: 'Chemistry', marks: 82, grade: 'B', teacher: 'Mr. Brown', comments: 'Good understanding of concepts. Lab work is excellent.' },
            { subject: 'English', marks: 78, grade: 'B', teacher: 'Mrs. Wilson', comments: 'Creative writing skills are good. Grammar needs attention.' },
            { subject: 'Biology', marks: 91, grade: 'A', teacher: 'Dr. Smith', comments: 'Outstanding performance. Active participation in class.' },
        ]
    });

    const [loading, setLoading] = useState(false);

    const handleDownloadPDF = () => {
        setLoading(true);
        // Simulate PDF generation
        setTimeout(() => {
            alert('Report card PDF downloaded successfully!');
            setLoading(false);
        }, 1500);
    };

    const handleDownloadExcel = () => {
        setLoading(true);
        // Simulate Excel generation
        setTimeout(() => {
            alert('Report card Excel file downloaded successfully!');
            setLoading(false);
        }, 1500);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="space-y-6">
            <Card title="Report Card" icon="fa-solid fa-file-certificate">
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-medium">Half-Yearly Report Card</h3>
                        <p className="text-gray-600">Academic Year: 2023-2024</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button onClick={handlePrint} variant="secondary">
                            <i className="fa-solid fa-print mr-2"></i> Print
                        </Button>
                        <Button onClick={handleDownloadPDF} isLoading={loading}>
                            <i className="fa-solid fa-file-pdf mr-2"></i> Download PDF
                        </Button>
                        <Button onClick={handleDownloadExcel} variant="secondary">
                            <i className="fa-solid fa-file-excel mr-2"></i> Download Excel
                        </Button>
                    </div>
                </div>

                {/* Report Card Preview */}
                <div className="bg-white border-2 border-gray-300 rounded-lg p-8 max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">IntelliSkool Academy</h1>
                        <p className="text-gray-600">123 Education Street, Knowledge City, 10001</p>
                        <p className="text-gray-600">Email: info@intelliskool.edu | Phone: (123) 456-7890</p>
                        <div className="border-t border-gray-300 my-4"></div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Academic Report Card</h2>
                    </div>

                    {/* Student Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-bold text-lg mb-3">Student Information</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Student Name:</span>
                                    <span className="font-medium">{reportData.studentName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Student ID:</span>
                                    <span className="font-medium">{reportData.studentId}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Grade & Section:</span>
                                    <span className="font-medium">{reportData.grade} - {reportData.section}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-bold text-lg mb-3">Academic Information</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Academic Year:</span>
                                    <span className="font-medium">{reportData.academicYear}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Term:</span>
                                    <span className="font-medium">{reportData.term}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Report Date:</span>
                                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Performance Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-blue-800">{reportData.overallGrade}</div>
                            <div className="text-blue-700">Overall Grade</div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-green-800">{reportData.attendance}%</div>
                            <div className="text-green-700">Attendance</div>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold text-purple-800">{reportData.rank}</div>
                            <div className="text-purple-700">Class Rank</div>
                        </div>
                    </div>

                    {/* Subject-wise Performance */}
                    <div className="mb-8">
                        <h3 className="font-bold text-lg mb-4">Subject-wise Performance</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {reportData.subjects.map((subject, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subject.subject}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.marks}%</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {subject.grade}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.teacher}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{subject.comments}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-300 pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-bold mb-2">Class Performance</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Class Average:</span>
                                        <span className="font-medium">{reportData.classAverage}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Student Position:</span>
                                        <span className="font-medium">{reportData.rank} out of 35 students</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">Remarks</h4>
                                <p className="text-gray-600 text-sm">
                                    Alex has shown good academic performance overall. While excelling in Biology and Mathematics, 
                                    there's room for improvement in Physics. Regular practice and additional support in weak areas 
                                    will help achieve better results.
                                </p>
                            </div>
                        </div>
                        
                        <div className="mt-8 flex justify-between items-center">
                            <div>
                                <div className="border-t border-gray-400 pt-2 w-48 text-center">
                                    <div className="text-sm text-gray-600">Class Teacher Signature</div>
                                </div>
                            </div>
                            <div>
                                <div className="border-t border-gray-400 pt-2 w-48 text-center">
                                    <div className="text-sm text-gray-600">Principal Signature</div>
                                </div>
                            </div>
                            <div>
                                <div className="border-t border-gray-400 pt-2 w-48 text-center">
                                    <div className="text-sm text-gray-600">Parent Signature</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Actions */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card title="Share Report Card">
                        <div className="space-y-3">
                            <Button variant="secondary" className="w-full">
                                <i className="fa-solid fa-envelope mr-2"></i> Email to Parent
                            </Button>
                            <Button variant="secondary" className="w-full">
                                <i className="fa-solid fa-share-nodes mr-2"></i> Share Link
                            </Button>
                        </div>
                    </Card>
                    
                    <Card title="Previous Reports">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                                <span className="text-sm">Finals 2023</span>
                                <Button variant="secondary" size="sm">
                                    <i className="fa-solid fa-download"></i>
                                </Button>
                            </div>
                            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                                <span className="text-sm">Half-Yearly 2023</span>
                                <Button variant="secondary" size="sm">
                                    <i className="fa-solid fa-download"></i>
                                </Button>
                            </div>
                        </div>
                    </Card>
                    
                    <Card title="AI Analysis">
                        <div className="space-y-3">
                            <Button className="w-full">
                                <i className="fa-solid fa-robot mr-2"></i> Generate AI Insights
                            </Button>
                            <Button variant="secondary" className="w-full">
                                <i className="fa-solid fa-chart-line mr-2"></i> Performance Trends
                            </Button>
                        </div>
                    </Card>
                </div>
            </Card>
        </div>
    );
};

export default ParentReportCard;