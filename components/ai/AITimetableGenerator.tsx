import React, { useState } from 'react';
import { generateTimetable } from '../../services/geminiService';

const AITimetableGenerator: React.FC = () => {
    const [constraints, setConstraints] = useState('');
    const [timetable, setTimetable] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerateTimetable = async () => {
        if (!constraints.trim()) {
            setError('Please enter timetable constraints');
            return;
        }

        setLoading(true);
        setError('');
        setTimetable('');

        try {
            const result = await generateTimetable(constraints);
            setTimetable(result);
        } catch (err) {
            setError('Failed to generate timetable: ' + (err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadTimetable = () => {
        if (!timetable) return;
        
        const element = document.createElement('a');
        const file = new Blob([timetable], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'timetable.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    // Function to parse timetable text into table format
    const parseTimetableToTable = (timetableText: string) => {
        if (!timetableText) return null;
        
        // Split by lines
        const lines = timetableText.split('\n').filter(line => line.trim() !== '');
        
        // Find table data (lines that contain time slots)
        const tableData: string[][] = [];
        let headers: string[] = [];
        
        lines.forEach(line => {
            // Skip lines that are just headings
            if (line.startsWith('**') || line.startsWith('#') || line.trim() === '') return;
            
            // Split by pipe or tab characters, or just spaces if needed
            const row = line.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
            
            if (row.length > 1) {
                if (headers.length === 0) {
                    headers = row;
                } else {
                    tableData.push(row);
                }
            }
        });
        
        // If we couldn't parse as a table, create a simple table
        if (headers.length === 0) {
            return (
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Generated Timetable</h3>
                    <pre className="whitespace-pre-wrap">{timetableText}</pre>
                </div>
            );
        }
        
        return (
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-primary text-white">
                            {headers.map((header, index) => (
                                <th key={index} className="py-3 px-4 text-left">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, rowIndex) => (
                            <tr 
                                key={rowIndex} 
                                className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                            >
                                {row.map((cell, cellIndex) => (
                                    <td 
                                        key={cellIndex} 
                                        className="py-3 px-4 border-b border-gray-200"
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">AI Timetable Generator</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Generate Timetable</h2>
                <div className="mb-4">
                    <label htmlFor="constraints" className="block text-sm font-medium text-gray-700 mb-2">
                        Enter Timetable Constraints
                    </label>
                    <textarea
                        id="constraints"
                        value={constraints}
                        onChange={(e) => setConstraints(e.target.value)}
                        placeholder="Enter constraints for the timetable (e.g., '5 days a week, 8 periods per day, Math should be in morning slots, Physics and Chemistry should not be on same day, etc.')"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        rows={4}
                    />
                </div>
                <button
                    onClick={handleGenerateTimetable}
                    disabled={loading}
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                >
                    {loading ? 'Generating...' : 'Generate Timetable'}
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                    <h3 className="text-red-800 font-medium">Error</h3>
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {timetable && (
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-700">Generated Timetable</h2>
                        <button
                            onClick={handleDownloadTimetable}
                            className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            <i className="fas fa-download mr-2"></i>
                            Download Timetable
                        </button>
                    </div>
                    {parseTimetableToTable(timetable)}
                </div>
            )}
        </div>
    );
};

export default AITimetableGenerator;