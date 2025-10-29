import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { getCurrentUser } from '../../services/authService';
import { MOCK_STUDENTS } from '../../constants';

interface StudentProfileData {
    name: string;
    studentId: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    grade: string;
    section: string;
    guardianName: string;
    guardianPhone: string;
    emergencyContact: string;
}

const StudentProfile: React.FC = () => {
    const currentUser = getCurrentUser();
    
    // Find the current student from mock data based on the current user
    const mockStudent = MOCK_STUDENTS.find(student => student.name === currentUser?.name) || MOCK_STUDENTS[0];
    
    // Generate a more realistic student ID based on the mock student ID
    const studentId = mockStudent.id;
    
    // Generate a realistic email based on the student's name
    const email = `${mockStudent.name.toLowerCase().replace(/\s+/g, '.')}@intelliskool.com`;
    
    // Generate realistic phone numbers
    const phone = `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`;
    
    // Generate a realistic date of birth based on grade
    const gradeNumber = parseInt(mockStudent.id.replace('S', '')) % 12 + 10; // Age approximation
    const dobYear = new Date().getFullYear() - gradeNumber;
    const dobMonth = Math.floor(Math.random() * 12) + 1;
    const dobDay = Math.floor(Math.random() * 28) + 1;
    const dateOfBirth = `${dobYear}-${dobMonth.toString().padStart(2, '0')}-${dobDay.toString().padStart(2, '0')}`;
    
    // Generate realistic address
    const address = `${Math.floor(Math.random() * 1000) + 1}, ${['Main Street', 'Park Road', 'Gandhi Nagar', 'MG Road', 'Anna Salai'][Math.floor(Math.random() * 5)]}, ${['Chennai', 'Bangalore', 'Hyderabad', 'Coimbatore', 'Mysore'][Math.floor(Math.random() * 5)]}, Tamil Nadu ${Math.floor(Math.random() * 900000) + 100000}`;
    
    // Generate realistic grade and section
    const gradeMap: { [key: string]: string } = {
        '8th': '8th Grade',
        '9th': '9th Grade', 
        '10th': '10th Grade',
        '1st PUC': '11th Grade',
        '2nd PUC': '12th Grade'
    };
    
    // For demo purposes, we'll assign grades based on student ID
    const gradeKeys = Object.keys(gradeMap);
    const gradeIndex = (parseInt(mockStudent.id.replace('S', '')) % gradeKeys.length);
    const grade = gradeMap[gradeKeys[gradeIndex]];
    const section = String.fromCharCode(65 + (parseInt(mockStudent.id.replace('S', '')) % 5)); // A, B, C, D, E
    
    // Generate realistic guardian information
    const guardianNames = ['Rajesh', 'Lakshmi', 'Suresh', 'Priya', 'Venkat', 'Anitha', 'Kumar', 'Deepa', 'Prakash', 'Sangeetha'];
    const guardianName = `${guardianNames[Math.floor(Math.random() * guardianNames.length)]} ${mockStudent.name.split(' ')[1] || mockStudent.name}`;
    const guardianPhone = `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`;
    const emergencyContact = `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`;

    const [profileData, setProfileData] = useState<StudentProfileData>({
        name: mockStudent.name,
        studentId: studentId,
        email: email,
        phone: phone,
        dateOfBirth: dateOfBirth,
        address: address,
        grade: grade,
        section: section,
        guardianName: guardianName,
        guardianPhone: guardianPhone,
        emergencyContact: emergencyContact
    });
    
    const [isEditing, setIsEditing] = useState(false);
    const [tempProfileData, setTempProfileData] = useState<StudentProfileData>(profileData);

    const handleEdit = () => {
        setTempProfileData(profileData);
        setIsEditing(true);
    };

    const handleSave = () => {
        setProfileData(tempProfileData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempProfileData(profileData);
        setIsEditing(false);
    };

    const handleChange = (field: keyof StudentProfileData, value: string) => {
        setTempProfileData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-6">
            <Card title="My Profile" icon="fa-solid fa-user">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Student Information</h3>
                    {!isEditing ? (
                        <Button onClick={handleEdit} variant="secondary">
                            <i className="fa-solid fa-pen mr-2"></i> Edit Profile
                        </Button>
                    ) : (
                        <div className="space-x-2">
                            <Button onClick={handleSave}>
                                <i className="fa-solid fa-save mr-2"></i> Save
                            </Button>
                            <Button onClick={handleCancel} variant="secondary">
                                <i className="fa-solid fa-times mr-2"></i> Cancel
                            </Button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={tempProfileData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                />
                            ) : (
                                <p className="text-gray-900">{profileData.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                            <p className="text-gray-900">{profileData.studentId}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={tempProfileData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                />
                            ) : (
                                <p className="text-gray-900">{profileData.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    value={tempProfileData.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                />
                            ) : (
                                <p className="text-gray-900">{profileData.phone}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                            {isEditing ? (
                                <input
                                    type="date"
                                    value={tempProfileData.dateOfBirth}
                                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                />
                            ) : (
                                <p className="text-gray-900">{profileData.dateOfBirth}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            {isEditing ? (
                                <textarea
                                    value={tempProfileData.address}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                    rows={3}
                                />
                            ) : (
                                <p className="text-gray-900">{profileData.address}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Grade & Section</label>
                            <p className="text-gray-900">{profileData.grade}, Section {profileData.section}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={tempProfileData.guardianName}
                                    onChange={(e) => handleChange('guardianName', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                />
                            ) : (
                                <p className="text-gray-900">{profileData.guardianName}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Phone</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    value={tempProfileData.guardianPhone}
                                    onChange={(e) => handleChange('guardianPhone', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                />
                            ) : (
                                <p className="text-gray-900">{profileData.guardianPhone}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    value={tempProfileData.emergencyContact}
                                    onChange={(e) => handleChange('emergencyContact', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                />
                            ) : (
                                <p className="text-gray-900">{profileData.emergencyContact}</p>
                            )}
                        </div>
                    </div>
                </div>
            </Card>

            <Card title="Academic Summary" icon="fa-solid fa-graduation-cap">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="text-2xl font-bold text-blue-800">
                            {Math.round(Object.values(mockStudent.grades).reduce((sum, grade) => sum + grade, 0) / Object.keys(mockStudent.grades).length)}%
                        </div>
                        <div className="text-sm text-blue-700">Overall Grade</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <div className="text-2xl font-bold text-green-800">{mockStudent.attendance}%</div>
                        <div className="text-sm text-green-700">Attendance</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <div className="text-2xl font-bold text-purple-800">{Object.keys(mockStudent.grades).length}</div>
                        <div className="text-sm text-purple-700">Subjects</div>
                    </div>
                </div>
                
                <div className="mt-6">
                    <h4 className="font-semibold text-lg mb-3">Subject Grades</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {Object.entries(mockStudent.grades).map(([subject, grade]) => (
                            <div key={subject} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                                <span className="font-medium">{subject}</span>
                                <span className={`font-bold ${grade >= 80 ? 'text-green-600' : grade >= 60 ? 'text-blue-600' : 'text-orange-600'}`}>
                                    {grade}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default StudentProfile;