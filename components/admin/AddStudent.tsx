import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface StudentFormData {
    name: string;
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

const AddStudent: React.FC = () => {
    const [formData, setFormData] = useState<StudentFormData>({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        grade: '8th',
        section: 'A',
        guardianName: '',
        guardianPhone: '',
        emergencyContact: ''
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage('');
        setErrorMessage('');
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // In a real application, this would be an API call
            console.log('Adding student:', formData);
            
            setSuccessMessage('Student added successfully!');
            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                dateOfBirth: '',
                address: '',
                grade: '8th',
                section: 'A',
                guardianName: '',
                guardianPhone: '',
                emergencyContact: ''
            });
        } catch (error) {
            setErrorMessage('Failed to add student. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card title="Add New Student" icon="fa-solid fa-user-plus">
            {successMessage && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                    <i className="fa-solid fa-check-circle mr-2"></i>
                    {successMessage}
                </div>
            )}
            
            {errorMessage && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                    <i className="fa-solid fa-exclamation-circle mr-2"></i>
                    {errorMessage}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">Grade *</label>
                                <select
                                    id="grade"
                                    name="grade"
                                    value={formData.grade}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                    required
                                >
                                    <option value="8th">8th Grade</option>
                                    <option value="9th">9th Grade</option>
                                    <option value="10th">10th Grade</option>
                                    <option value="1st PUC">1st PUC</option>
                                    <option value="2nd PUC">2nd PUC</option>
                                </select>
                            </div>
                            
                            <div>
                                <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-1">Section *</label>
                                <select
                                    id="section"
                                    name="section"
                                    value={formData.section}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                    required
                                >
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                </select>
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700 mb-1">Guardian Name *</label>
                            <input
                                type="text"
                                id="guardianName"
                                name="guardianName"
                                value={formData.guardianName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="guardianPhone" className="block text-sm font-medium text-gray-700 mb-1">Guardian Phone</label>
                            <input
                                type="tel"
                                id="guardianPhone"
                                name="guardianPhone"
                                value={formData.guardianPhone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                            <input
                                type="tel"
                                id="emergencyContact"
                                name="emergencyContact"
                                value={formData.emergencyContact}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                    <Button type="button" variant="secondary" onClick={() => setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        dateOfBirth: '',
                        address: '',
                        grade: '8th',
                        section: 'A',
                        guardianName: '',
                        guardianPhone: '',
                        emergencyContact: ''
                    })}>
                        Reset
                    </Button>
                    <Button type="submit" isLoading={isSubmitting}>
                        <i className="fa-solid fa-plus mr-2"></i> Add Student
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default AddStudent;