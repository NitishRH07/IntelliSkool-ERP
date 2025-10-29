import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const AIAuditReportGenerator: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const [auditData] = useState({
    overallCompliance: 92,
    sections: [
      { name: 'Academic Standards', compliance: 95, issues: 2 },
      { name: 'Financial Procedures', compliance: 88, issues: 5 },
      { name: 'Student Safety', compliance: 98, issues: 1 },
      { name: 'Staff Qualifications', compliance: 91, issues: 3 },
      { name: 'Infrastructure', compliance: 89, issues: 4 },
      { name: 'Data Privacy', compliance: 93, issues: 2 },
    ],
    recentAudits: [
      { id: 'AUD001', date: '2024-03-15', type: 'Internal', scope: 'Academic Department', status: 'completed', findings: 3 },
      { id: 'AUD002', date: '2024-02-28', type: 'External', scope: 'Financial Compliance', status: 'completed', findings: 5 },
      { id: 'AUD003', date: '2024-01-20', type: 'Internal', scope: 'Student Safety', status: 'completed', findings: 1 },
      { id: 'AUD004', date: '2023-12-15', type: 'External', scope: 'Infrastructure', status: 'completed', findings: 4 },
    ],
    findings: [
      { id: 'F001', auditId: 'AUD002', category: 'Financial Procedures', severity: 'medium', description: 'Missing documentation for 3 expense approvals over $1000', status: 'open', dueDate: '2024-04-15' },
      { id: 'F002', auditId: 'AUD001', category: 'Academic Standards', severity: 'low', description: 'Incomplete grading rubrics for 2 assignments', status: 'resolved', dueDate: '2024-03-30' },
      { id: 'F003', auditId: 'AUD004', category: 'Infrastructure', severity: 'high', description: 'Fire safety equipment not inspected in 3 buildings', status: 'open', dueDate: '2024-04-05' },
      { id: 'F004', auditId: 'AUD003', category: 'Student Safety', severity: 'low', description: 'Missing emergency contact information for 5 students', status: 'resolved', dueDate: '2024-02-25' },
      { id: 'F005', auditId: 'AUD002', category: 'Financial Procedures', severity: 'medium', description: 'Payroll records not properly archived for 2023', status: 'in-progress', dueDate: '2024-05-01' },
    ]
  });

  const [reportType, setReportType] = useState('compliance');
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedAudit, setSelectedAudit] = useState<any>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGenerateReport = () => {
    alert(`Audit report for ${reportType} generated and sent to your email`);
  };

  const handleExportReport = () => {
    alert('Audit report exported successfully');
  };

  const handleViewAudit = (audit: any) => {
    setSelectedAudit(audit);
  };

  return (
    <div className="space-y-6">
      <Card title="AI Audit Report Generator" icon="fa-solid fa-file-contract">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Automated Compliance & Audit Reporting</h3>
            <p className="text-gray-600 text-sm">AI-powered generation of institutional audit reports</p>
          </div>
          <div className="flex space-x-2">
            <select
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="compliance">Compliance Report</option>
              <option value="financial">Financial Audit</option>
              <option value="safety">Safety Audit</option>
              <option value="academic">Academic Standards</option>
              <option value="infrastructure">Infrastructure Audit</option>
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="1month">Last 1 Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last 1 Year</option>
            </select>
            <Button onClick={handleGenerateReport}>
              <i className="fa-solid fa-file-pdf mr-2"></i> Generate Report
            </Button>
            <Button variant="secondary" onClick={handleExportReport}>
              <i className="fa-solid fa-download mr-2"></i> Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <i className="fa-solid fa-clipboard-check text-blue-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Overall Compliance</p>
                <p className="text-2xl font-bold text-gray-900">{auditData.overallCompliance}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-lg p-5">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <i className="fa-solid fa-check-circle text-green-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Resolved Issues</p>
                <p className="text-2xl font-bold text-gray-900">
                  {auditData.findings.filter(f => f.status === 'resolved').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-100 rounded-lg p-5">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                <i className="fa-solid fa-clock text-yellow-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {auditData.findings.filter(f => f.status === 'in-progress').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 rounded-lg p-5">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg mr-4">
                <i className="fa-solid fa-exclamation-triangle text-red-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Open Issues</p>
                <p className="text-2xl font-bold text-gray-900">
                  {auditData.findings.filter(f => f.status === 'open').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card title="Compliance by Section">
            <div className="space-y-4">
              {auditData.sections.map((section, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-48 text-sm font-medium text-gray-700">{section.name}</div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            section.compliance >= 95 ? 'bg-green-500' : 
                            section.compliance >= 90 ? 'bg-blue-500' : 
                            section.compliance >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} 
                          style={{ width: `${section.compliance}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {section.compliance}%
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        ({section.issues} issues)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Recent Audits">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audit ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scope</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Findings</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {auditData.recentAudits.map((audit) => (
                    <tr key={audit.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{audit.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{audit.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          audit.type === 'Internal' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {audit.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{audit.scope}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{audit.findings}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleViewAudit(audit)}
                          className="text-primary hover:text-primary-dark"
                        >
                          <i className="fa-solid fa-eye mr-1"></i> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <Card title="Open Audit Findings">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Finding ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {auditData.findings.filter(f => f.status !== 'resolved').map((finding) => (
                  <tr key={finding.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{finding.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{finding.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">{finding.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(finding.severity)}`}>
                        {finding.severity.charAt(0).toUpperCase() + finding.severity.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(finding.status)}`}>
                        {finding.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{finding.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary hover:text-primary-dark mr-3">
                        <i className="fa-solid fa-edit mr-1"></i> Update
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <i className="fa-solid fa-comment-dots mr-1"></i> Comment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mt-6">
          <div className="flex">
            <i className="fa-solid fa-robot text-blue-500 text-xl mr-3 mt-1"></i>
            <div>
              <h4 className="font-medium text-blue-800">AI Audit Summary</h4>
              <p className="text-sm text-blue-700 mt-1">
                The AI audit analysis shows an overall compliance rate of 92%, which is above the institutional target of 90%. 
                The main areas of concern are Financial Procedures (88%) and Infrastructure (89%), both with open high-priority issues. 
                Recommendation: Address the fire safety equipment inspection issue immediately and review financial approval processes. 
                The next scheduled external audit is in Q3 2024.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Audit Detail Modal */}
      {selectedAudit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Audit Details</h3>
                <button
                  onClick={() => setSelectedAudit(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <i className="fa-solid fa-xmark text-2xl"></i>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Audit Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Audit ID:</span>
                      <span className="font-medium">{selectedAudit.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{selectedAudit.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedAudit.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Scope:</span>
                      <span className="font-medium">{selectedAudit.scope}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Findings Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Findings:</span>
                      <span className="font-medium">{selectedAudit.findings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">High Severity:</span>
                      <span className="font-medium text-red-600">
                        {auditData.findings.filter(f => f.auditId === selectedAudit.id && f.severity === 'high').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Medium Severity:</span>
                      <span className="font-medium text-yellow-600">
                        {auditData.findings.filter(f => f.auditId === selectedAudit.id && f.severity === 'medium').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Low Severity:</span>
                      <span className="font-medium text-green-600">
                        {auditData.findings.filter(f => f.auditId === selectedAudit.id && f.severity === 'low').length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Related Findings</h4>
                <div className="space-y-3">
                  {auditData.findings.filter(f => f.auditId === selectedAudit.id).map(finding => (
                    <div key={finding.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-900">{finding.description}</span>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(finding.severity)}`}>
                          {finding.severity.charAt(0).toUpperCase() + finding.severity.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-gray-600">Due: {finding.dueDate}</span>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(finding.status)}`}>
                          {finding.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="secondary" onClick={() => setSelectedAudit(null)}>
                  Close
                </Button>
                <Button>
                  <i className="fa-solid fa-file-pdf mr-2"></i> Generate Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAuditReportGenerator;