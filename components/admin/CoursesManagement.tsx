import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  department: string;
  instructor: string;
  semester: string;
  status: 'active' | 'inactive';
}

const CoursesManagement: React.FC = () => {
  const [courses] = useState<Course[]>([
    {
      id: 'C001',
      name: 'Physics - Laws of Motion',
      code: 'PHY101',
      credits: 4,
      department: 'Science',
      instructor: 'Dr. Sarah Johnson',
      semester: 'Spring 2024',
      status: 'active'
    },
    {
      id: 'C002',
      name: 'Mathematics - Algebra',
      code: 'MATH101',
      credits: 3,
      department: 'Mathematics',
      instructor: 'Prof. Michael Chen',
      semester: 'Spring 2024',
      status: 'active'
    },
    {
      id: 'C003',
      name: 'Chemistry - Periodic Table',
      code: 'CHEM101',
      credits: 4,
      department: 'Science',
      instructor: 'Dr. Emily Wilson',
      semester: 'Spring 2024',
      status: 'active'
    },
    {
      id: 'C004',
      name: 'English Literature',
      code: 'ENG101',
      credits: 3,
      department: 'Humanities',
      instructor: 'Ms. Jessica Brown',
      semester: 'Spring 2024',
      status: 'inactive'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const departments = ['All', 'Science', 'Mathematics', 'Humanities', 'Arts', 'Commerce'];
  const statuses = ['All', 'active', 'inactive'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'All' || course.department === filterDepartment;
    const matchesStatus = filterStatus === 'All' || course.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card title="Courses Management" icon="fa-solid fa-book">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                ))}
              </select>
            </div>
            <Button>
              <i className="fa-solid fa-plus mr-2"></i> Add New Course
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{course.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.instructor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.credits}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.semester}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(course.status)}`}>
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primary-dark mr-3">
                      Edit
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      View
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      {course.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <i className="fa-solid fa-book text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-medium text-gray-700">No courses found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}

        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredCourses.length}</span> of <span className="font-medium">{courses.length}</span> courses
          </div>
          <div className="flex space-x-2">
            <Button variant="secondary" size="sm">
              Previous
            </Button>
            <Button variant="secondary" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CoursesManagement;