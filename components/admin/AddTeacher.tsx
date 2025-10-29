import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface TeacherFormData {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    department: string;
    qualification: string;
    experience: string;
    subjects: string;
}

const AddTeacher: React.FC = () => {
    const [formData, setFormData] = useState<TeacherFormData>({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        department: 'Mathematics',
        qualification: '',
        experience: '',
        subjects: ''
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
            console.log('Adding teacher:', formData);
            
            setSuccessMessage('Teacher added successfully!');
            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                dateOfBirth: '',
                address: '',
                department: 'Mathematics',
                qualification: '',
                experience: '',
                subjects: ''
            });
        } catch (error) {
            setErrorMessage('Failed to add teacher. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card title="Add New Teacher" icon="fa-solid fa-chalkboard-user">
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
                        <div>
                            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                            <select
                                id="department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                required
                            >
                                <option value="Mathematics">Mathematics</option>
                                <option value="Physics">Physics</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="Biology">Biology</option>
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Social Science">Social Science</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Arts">Arts</option>
                                <option value="Physical Education">Physical Education</option>
                            </select>
                        </div>
                        
                        <div>
                            <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-1">Qualification *</label>
                            <input
                                type="text"
                                id="qualification"
                                name="qualification"
                                value={formData.qualification}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                placeholder="e.g., M.Sc, B.Ed"
                                required
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                            <input
                                type="number"
                                id="experience"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                min="0"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="subjects" className="block text-sm font-medium text-gray-700 mb-1">Subjects Taught</label>
                            <input
                                type="text"
                                id="subjects"
                                name="subjects"
                                value={formData.subjects}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                placeholder="e.g., Physics, Chemistry"
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
                        department: 'Mathematics',
                        qualification: '',
                        experience: '',
                        subjects: ''
                    })}>
                        Reset
                    </Button>
                    <Button type="submit" isLoading={isSubmitting}>
                        <i className="fa-solid fa-plus mr-2"></i> Add Teacher
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default AddTeacher;