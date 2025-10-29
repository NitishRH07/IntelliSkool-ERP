import React, { useState, useRef } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { generateAdminReport } from '../../services/geminiService';

const AISmartReportGenerator: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [report, setReport] = useState('');
    const [error, setError] = useState('');
    const reportRef = useRef<HTMLDivElement>(null);

    const handleGenerate = async () => {
        setIsLoading(true);
        setReport('');
        setError('');
        try {
            const result = await generateAdminReport();
            setReport(result);
        } catch (err) {
            setError('Failed to generate the report. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownloadPdf = () => {
        window.print();
    };

    return (
        <>
            <style>
                {`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #print-section, #print-section * {
                        visibility: visible;
                    }
                    #print-section {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        padding: 2rem;
                    }
                    .no-print {
                        display: none;
                    }
                }
                `}
            </style>
            <Card title="Smart Report Generator" icon="fa-solid fa-file-invoice" className="no-print">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Controls */}
                    <div className="md:w-1/3 space-y-4">
                        <h4 className="font-semibold text-lg">Generate Weekly Report</h4>
                        <p className="text-sm text-gray-600">
                            Click the button below to generate a comprehensive weekly report
                            summarizing key institutional metrics like academic performance,
                            attendance trends, and key concerns, complete with AI-powered
                            recommendations.
                        </p>
                        <Button onClick={handleGenerate} isLoading={isLoading} className="w-full">
                            <i className="fa-solid fa-wand-magic-sparkles mr-2"></i>
                            Generate Report
                        </Button>
                        {report && (
                             <Button onClick={handleDownloadPdf} variant="secondary" className="w-full">
                                <i className="fa-solid fa-file-pdf mr-2"></i>
                                Download as PDF
                            </Button>
                        )}
                    </div>

                    {/* Report Preview */}
                    <div className="md:w-2/3 border border-gray-200 rounded-lg bg-gray-50 flex flex-col min-h-[500px]">
                        <div className="p-4 border-b">
                            <h4 className="text-lg font-semibold text-gray-800">Report Preview</h4>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1">
                            {isLoading && <div className="text-center p-8 text-primary">AI is analyzing data and writing the report...</div>}
                            {error && <div className="text-center p-8 text-red-600">{error}</div>}
                            {report ? (
                                <div id="print-section" ref={reportRef}>
                                    <div className="text-center mb-6">
                                        <h1 className="text-2xl font-bold text-text-main">IntelliSkool - Weekly Institutional Report</h1>
                                        <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
                                    </div>
                                    <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">{report}</pre>
                                </div>
                            ) : (
                                !isLoading && <div className="text-center text-gray-500 p-8">The generated report will appear here.</div>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default AISmartReportGenerator;