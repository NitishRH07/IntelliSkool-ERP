import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface TeacherProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    classes: string[];
    qualification: string;
    experience: number;
    joiningDate: string;
    address: string;
    emergencyContact: string;
    bio: string;
}

const TeacherProfile: React.FC = () => {
    // Mock data - in a real app, this would come from an API
    const [profile, setProfile] = useState<TeacherProfile>({
        id: 'T001',
        name: 'Dr. Sarah Johnson',
        email: 'sarah.j@intelliskool.edu',
        phone: '+1 (555) 123-4567',
        subject: 'Physics',
        classes: ['10th A', '10th B', '11th A'],
        qualification: 'Ph.D. in Physics, M.Sc. in Applied Physics',
        experience: 12,
        joiningDate: '2012-08-15',
        address: '123 Education Street, Knowledge City, KC 10001',
        emergencyContact: 'Michael Johnson (Husband) - +1 (555) 987-6543',
        bio: 'Passionate physics educator with over a decade of experience in teaching and curriculum development. Specializes in making complex concepts accessible through hands-on experiments and real-world applications. Advocate for STEM education and student-centered learning approaches.'
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState<TeacherProfile>(profile);

    const handleSave = () => {
        // In a real app, this would save to an API
        setProfile(editedProfile);
        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    const handleCancel = () => {
        setEditedProfile(profile);
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <Card title="My Profile" icon="fa-solid fa-user">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Picture and Basic Info */}
                    <div className="lg:col-span-1">
                        <Card title="Profile Picture">
                            <div className="flex flex-col items-center">
                                <div className="relative">
                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 flex items-center justify-center">
                                        <i className="fa-solid fa-user text-4xl text-gray-400"></i>
                                    </div>
                                    {isEditing && (
                                        <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 shadow-lg">
                                            <i className="fa-solid fa-camera"></i>
                                        </button>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold mt-4">{profile.name}</h3>
                                <p className="text-gray-600">{profile.subject} Teacher</p>
                                <div className="mt-4 flex space-x-2">
                                    {!isEditing ? (
                                        <Button onClick={() => setIsEditing(true)}>
                                            <i className="fa-solid fa-edit mr-2"></i> Edit Profile
                                        </Button>
                                    ) : (
                                        <>
                                            <Button variant="secondary" onClick={handleCancel}>
                                                Cancel
                                            </Button>
                                            <Button onClick={handleSave}>
                                                Save Changes
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Card>

                        <Card title="Contact Information" className="mt-6">
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <i className="fa-solid fa-envelope text-primary mt-1 mr-3"></i>
                                    <div>
                                        <div className="text-sm text-gray-500">Email</div>
                                        <div className="text-sm">{profile.email}</div>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <i className="fa-solid fa-phone text-primary mt-1 mr-3"></i>
                                    <div>
                                        <div className="text-sm text-gray-500">Phone</div>
                                        <div className="text-sm">{profile.phone}</div>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <i className="fa-solid fa-location-dot text-primary mt-1 mr-3"></i>
                                    <div>
                                        <div className="text-sm text-gray-500">Address</div>
                                        <div className="text-sm">{profile.address}</div>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <i className="fa-solid fa-triangle-exclamation text-primary mt-1 mr-3"></i>
                                    <div>
                                        <div className="text-sm text-gray-500">Emergency Contact</div>
                                        <div className="text-sm">{profile.emergencyContact}</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Profile Details */}
                    <div className="lg:col-span-2">
                        <Card title="Personal Information">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedProfile.name}
                                            onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        />
                                    ) : (
                                        <div className="text-gray-900">{profile.name}</div>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={editedProfile.email}
                                            onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        />
                                    ) : (
                                        <div className="text-gray-900">{profile.email}</div>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={editedProfile.phone}
                                            onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        />
                                    ) : (
                                        <div className="text-gray-900">{profile.phone}</div>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    {isEditing ? (
                                        <select
                                            value={editedProfile.subject}
                                            onChange={(e) => setEditedProfile({...editedProfile, subject: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        >
                                            <option>Physics</option>
                                            <option>Chemistry</option>
                                            <option>Mathematics</option>
                                            <option>English</option>
                                            <option>Biology</option>
                                        </select>
                                    ) : (
                                        <div className="text-gray-900">{profile.subject}</div>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedProfile.qualification}
                                            onChange={(e) => setEditedProfile({...editedProfile, qualification: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        />
                                    ) : (
                                        <div className="text-gray-900">{profile.qualification}</div>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            value={editedProfile.experience}
                                            onChange={(e) => setEditedProfile({...editedProfile, experience: parseInt(e.target.value) || 0})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                            min="0"
                                        />
                                    ) : (
                                        <div className="text-gray-900">{profile.experience} years</div>
                                    )}
                                </div>
                            </div>
                        </Card>

                        <Card title="Professional Details" className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Classes Teaching</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedProfile.classes.join(', ')}
                                            onChange={(e) => setEditedProfile({...editedProfile, classes: e.target.value.split(', ')})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                            placeholder="e.g., 10th A, 10th B, 11th A"
                                        />
                                    ) : (
                                        <div className="text-gray-900">{profile.classes.join(', ')}</div>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            value={editedProfile.joiningDate}
                                            onChange={(e) => setEditedProfile({...editedProfile, joiningDate: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        />
                                    ) : (
                                        <div className="text-gray-900">{profile.joiningDate}</div>
                                    )}
                                </div>
                                
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    {isEditing ? (
                                        <textarea
                                            value={editedProfile.address}
                                            onChange={(e) => setEditedProfile({...editedProfile, address: e.target.value})}
                                            rows={2}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        />
                                    ) : (
                                        <div className="text-gray-900">{profile.address}</div>
                                    )}
                                </div>
                                
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedProfile.emergencyContact}
                                            onChange={(e) => setEditedProfile({...editedProfile, emergencyContact: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                            placeholder="Name (Relationship) - Phone Number"
                                        />
                                    ) : (
                                        <div className="text-gray-900">{profile.emergencyContact}</div>
                                    )}
                                </div>
                            </div>
                        </Card>

                        <Card title="About Me" className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                            {isEditing ? (
                                <textarea
                                    value={editedProfile.bio}
                                    onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                    placeholder="Tell us about yourself..."
                                />
                            ) : (
                                <div className="text-gray-700 whitespace-pre-line">{profile.bio}</div>
                            )}
                        </Card>
                    </div>
                </div>

                {/* Account Settings */}
                <div className="mt-6">
                    <Card title="Account Settings">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                                <div className="flex items-center">
                                    <i className="fa-solid fa-key text-xl text-blue-500 mr-3"></i>
                                    <div>
                                        <h4 className="font-medium">Change Password</h4>
                                        <p className="text-sm text-gray-500">Update your password</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                                <div className="flex items-center">
                                    <i className="fa-solid fa-bell text-xl text-green-500 mr-3"></i>
                                    <div>
                                        <h4 className="font-medium">Notification Settings</h4>
                                        <p className="text-sm text-gray-500">Manage alerts</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                                <div className="flex items-center">
                                    <i className="fa-solid fa-shield text-xl text-purple-500 mr-3"></i>
                                    <div>
                                        <h4 className="font-medium">Privacy Settings</h4>
                                        <p className="text-sm text-gray-500">Control data sharing</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </Card>
        </div>
    );
};

export default TeacherProfile;