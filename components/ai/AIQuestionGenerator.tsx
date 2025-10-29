import React, { useState, useRef, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { generateQuestionPaper } from '../../services/geminiService';

interface QuestionStructure {
    id: string;
    type: string;
    count: number;
    marks: number;
}

const AIQuestionGenerator: React.FC = () => {
    const [config, setConfig] = useState({
        institution: 'IntelliSkool High',
        title: 'Mid-Term Examination 2024',
        grade: '10th',
        medium: 'English',
        subject: 'Physics',
        topics: 'Kinematics, Laws of Motion, Work Energy Power',
        difficulty: 'Medium',
        marks: '70',
    });
    const [questionStructures, setQuestionStructures] = useState<QuestionStructure[]>([
        { id: '1', type: 'Multiple Choice Questions', count: 10, marks: 1 },
        { id: '2', type: 'Short Answer Questions', count: 5, marks: 2 },
        { id: '3', type: 'Long Answer Questions', count: 3, marks: 5 }
    ]);
    const [logo, setLogo] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paper, setPaper] = useState('');
    const paperRef = useRef<HTMLDivElement>(null);

    // Calculate total marks automatically based on question structures
    useEffect(() => {
        const totalMarks = questionStructures.reduce((total, structure) => {
            return total + (structure.count * structure.marks);
        }, 0);
        
        setConfig(prev => ({
            ...prev,
            marks: totalMarks.toString()
        }));
    }, [questionStructures]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setConfig(prev => ({ ...prev, [id]: value }));
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setLogo(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // Handle question structure changes
    const handleStructureChange = (id: string, field: keyof QuestionStructure, value: string | number) => {
        setQuestionStructures(prev => 
            prev.map(structure => 
                structure.id === id 
                    ? { ...structure, [field]: value } 
                    : structure
            )
        );
    };

    // Add a new question structure row
    const addQuestionStructure = () => {
        const newId = Date.now().toString();
        setQuestionStructures(prev => [
            ...prev,
            { id: newId, type: 'Long Answer Questions', count: 1, marks: 5 }
        ]);
    };

    // Remove a question structure row
    const removeQuestionStructure = (id: string) => {
        if (questionStructures.length > 1) {
            setQuestionStructures(prev => prev.filter(structure => structure.id !== id));
        }
    };

    // Function to clean markdown formatting from the generated paper
    const cleanMarkdownFormatting = (text: string): string => {
        return text
            .replace(/###\s*\*\*/g, '')  // Remove ### ** pattern
            .replace(/\*\*/g, '')         // Remove remaining ** 
            .replace(/###/g, '')          // Remove ### 
            .replace(/##/g, '')           // Remove ##
            .replace(/#/g, '')            // Remove #
            .replace(/^\s*[\r\n]/gm, '\n') // Remove empty lines
            .trim();
    };

    const handleGenerate = async () => {
        setIsLoading(true);
        setPaper('');
        
        // Create a prompt that includes question structure information
        const structurePrompt = questionStructures.map(structure => 
            `${structure.count} ${structure.type} of ${structure.marks} marks each`
        ).join(', ');
        
        // Add structure information to the config for the AI service
        const extendedConfig = {
            ...config,
            questionStructure: structurePrompt
        };
        
        const result = await generateQuestionPaper(extendedConfig);
        // Clean the markdown formatting
        const cleanedResult = cleanMarkdownFormatting(result);
        setPaper(cleanedResult);
        setIsLoading(false);
    };

    const handleDownloadWord = () => {
        if (!paperRef.current) return;
        
        // Create styled HTML content for Word document
        const styledContent = `
            <div style="font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5;">
                <div style="text-align: center; margin-bottom: 30px;">
                    ${logo ? `<img src="${logo}" style="max-height: 80px; margin: 0 auto 15px; display: block;" />` : ''}
                    <h1 style="font-size: 18pt; font-weight: bold; margin: 0 0 10px 0;">${config.institution}</h1>
                    <h2 style="font-size: 16pt; margin: 0 0 20px 0;">${config.title}</h2>
                </div>
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <tr>
                        <td style="padding: 8px; border: 1px solid #000;"><strong>Grade:</strong> ${config.grade}</td>
                        <td style="padding: 8px; border: 1px solid #000;"><strong>Subject:</strong> ${config.subject}</td>
                        <td style="padding: 8px; border: 1px solid #000;"><strong>Total Marks:</strong> ${config.marks}</td>
                    </tr>
                </table>
                <div>
                    ${formatPaperContentForExport(paper)}
                </div>
            </div>
        `;
        
        const header = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head>
                <meta charset='utf-8'>
                <title>Export HTML to Word Document</title>
            </head>
            <body>`;
        const footer = "</body></html>";
        const sourceHTML = header + styledContent + footer;

        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = `${config.subject}_${config.grade}_paper.doc`;
        fileDownload.click();
        document.body.removeChild(fileDownload);
    };
    
    // Format paper content for export with proper spacing
    const formatPaperContentForExport = (content: string): string => {
        const lines = content.split('\n');
        let formattedContent = '';
        let inSection = false;
        
        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            
            // Check if line is a section header (all caps or ends with colon)
            const isSectionHeader = trimmedLine.toUpperCase() === trimmedLine && trimmedLine.length > 0 && !trimmedLine.match(/^\d+\./);
            const isQuestion = trimmedLine.match(/^\d+\./);
            
            if (isSectionHeader) {
                // Add section divider before new section (if not the first section)
                if (inSection) {
                    formattedContent += '<div style="border-top: 1px solid #000; margin: 25px 0;"></div>';
                }
                inSection = true;
                formattedContent += `<div style="font-weight: bold; margin: 20px 0 15px 0; text-decoration: underline;">${trimmedLine}</div>`;
            } else if (isQuestion) {
                formattedContent += `<div style="margin: 25px 0;">${trimmedLine}</div>`;
            } else if (trimmedLine.length > 0) {
                // For non-empty lines that are not questions or headers
                formattedContent += `<div style="margin: 15px 0;">${trimmedLine}</div>`;
            } else {
                // For empty lines, preserve spacing
                formattedContent += '<div style="margin: 15px 0;">&nbsp;</div>';
            }
        });
        
        // Add end of paper marker
        formattedContent += '<div style="margin: 40px 0; text-align: center; font-weight: bold;">--- END OF QUESTION PAPER ---</div>';
        
        return formattedContent;
    };
    
    const handleDownloadPdf = () => {
        if (!paperRef.current) return;
        
        // Create a new window for PDF generation
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>${config.subject} Question Paper</title>
                        <style>
                            body {
                                font-family: 'Times New Roman', Times, serif;
                                margin: 20px;
                                padding: 20px;
                                font-size: 12pt;
                                line-height: 1.5;
                            }
                            .question-paper {
                                max-width: 800px;
                                margin: 0 auto;
                            }
                            .header {
                                text-align: center;
                                margin-bottom: 30px;
                            }
                            .logo {
                                max-height: 80px;
                                margin: 0 auto 15px;
                            }
                            .info-table {
                                width: 100%;
                                border-collapse: collapse;
                                margin: 20px 0;
                            }
                            .info-table td {
                                padding: 8px;
                                border: 1px solid #000;
                            }
                            .section {
                                margin: 20px 0;
                            }
                            .section-title {
                                font-weight: bold;
                                margin: 20px 0 15px 0;
                                text-decoration: underline;
                            }
                            .question {
                                margin: 15px 0;
                                padding-left: 10px;
                            }
                            .question-with-space {
                                margin: 25px 0;
                            }
                            .section-divider {
                                border-top: 1px solid #000;
                                margin: 25px 0;
                            }
                            .end-marker {
                                margin: 40px 0;
                                text-align: center;
                                font-weight: bold;
                            }
                            @media print {
                                body {
                                    margin: 0;
                                    padding: 20px;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="question-paper">
                            ${paperRef.current.innerHTML}
                        </div>
                        <script>
                            window.onload = function() {
                                window.print();
                                // Close the window after printing
                                window.onafterprint = function() {
                                    window.close();
                                };
                            };
                        </script>
                    </body>
                </html>
            `);
            printWindow.document.close();
        }
    };

    return (
        <>
        <Card title="AI Question Paper Generator" icon="fa-solid fa-robot" className="no-print">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Form */}
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-lg border-b pb-2 mb-4">Paper Configuration</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="institution" className="block text-sm font-medium text-gray-700">Institution Name</label>
                                <input type="text" id="institution" value={config.institution} onChange={handleInputChange} className="mt-1 block w-full input-style" />
                            </div>
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Paper Title</label>
                                <input type="text" id="title" value={config.title} onChange={handleInputChange} className="mt-1 block w-full input-style" />
                            </div>
                            <div>
                                <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Grade</label>
                                <select id="grade" value={config.grade} onChange={handleInputChange} className="mt-1 block w-full input-style">
                                    <option>8th</option><option>9th</option><option>10th</option><option>1st PUC</option><option>2nd PUC</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="medium" className="block text-sm font-medium text-gray-700">Medium</label>
                                <select id="medium" value={config.medium} onChange={handleInputChange} className="mt-1 block w-full input-style">
                                    <option>English</option><option>Kannada</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Institution Logo</label>
                                <input type="file" id="logo" accept="image/*" onChange={handleLogoChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"/>
                            </div>
                            <div>
                                <label htmlFor="marks" className="block text-sm font-medium text-gray-700">Total Marks</label>
                                <input type="number" id="marks" value={config.marks} onChange={handleInputChange} className="mt-1 block w-full input-style" readOnly />
                                <p className="text-xs text-gray-500 mt-1">Calculated automatically based on question structure</p>
                            </div>
                        </div>
                    </div>
                    <div>
                         <h4 className="font-semibold text-lg border-b pb-2 mb-4">Content Details</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                                <select id="subject" value={config.subject} onChange={handleInputChange} className="mt-1 block w-full input-style">
                                    <option>Biology</option><option>Physics</option><option>Chemistry</option><option>Mathematics</option><option>English</option><option>Kannada</option><option>Hindi</option><option>Computer Sc</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty</label>
                                <select id="difficulty" value={config.difficulty} onChange={handleInputChange} className="mt-1 block w-full input-style">
                                    <option>Easy</option><option>Medium</option><option>Hard</option>
                                </select>
                            </div>
                         </div>
                         <div className="mt-4">
                            <label htmlFor="topics" className="block text-sm font-medium text-gray-700">Topics (comma-separated)</label>
                            <textarea id="topics" value={config.topics} onChange={handleInputChange} rows={3} className="mt-1 block w-full input-style" />
                        </div>
                    </div>
                    
                    {/* Question Structure Section */}
                    <div>
                        <h4 className="font-semibold text-lg border-b pb-2 mb-4">Question Structure</h4>
                        <div className="space-y-3">
                            {questionStructures.map((structure, index) => (
                                <div key={structure.id} className="grid grid-cols-12 gap-2 items-end">
                                    <div className="col-span-5">
                                        <label className="block text-sm font-medium text-gray-700">Question Type</label>
                                        <select 
                                            value={structure.type}
                                            onChange={(e) => handleStructureChange(structure.id, 'type', e.target.value)}
                                            className="mt-1 block w-full input-style"
                                        >
                                            <option>Multiple Choice Questions</option>
                                            <option>Short Answer Questions</option>
                                            <option>Long Answer Questions</option>
                                            <option>Very Short Answer Questions</option>
                                            <option>Fill in the Blanks</option>
                                            <option>True or False</option>
                                            <option>Match the Following</option>
                                            <option>Assertion and Reason</option>
                                        </select>
                                    </div>
                                    <div className="col-span-3">
                                        <label className="block text-sm font-medium text-gray-700">Count</label>
                                        <input 
                                            type="number" 
                                            min="1"
                                            value={structure.count}
                                            onChange={(e) => handleStructureChange(structure.id, 'count', parseInt(e.target.value) || 0)}
                                            className="mt-1 block w-full input-style"
                                        />
                                    </div>
                                    <div className="col-span-3">
                                        <label className="block text-sm font-medium text-gray-700">Marks</label>
                                        <input 
                                            type="number" 
                                            min="1"
                                            value={structure.marks}
                                            onChange={(e) => handleStructureChange(structure.id, 'marks', parseInt(e.target.value) || 0)}
                                            className="mt-1 block w-full input-style"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <Button 
                                            onClick={() => removeQuestionStructure(structure.id)}
                                            variant="secondary"
                                            className="p-2"
                                            disabled={questionStructures.length <= 1}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <Button onClick={addQuestionStructure} variant="secondary" className="w-full">
                                <i className="fa-solid fa-plus mr-2"></i> Add Question Type
                            </Button>
                        </div>
                    </div>
                    
                    <Button onClick={handleGenerate} isLoading={isLoading} className="w-full">
                        <i className="fa-solid fa-wand-magic-sparkles mr-2"></i> Generate Paper
                    </Button>
                </div>

                {/* Output Display */}
                <div className="border border-gray-200 rounded-lg bg-gray-50 flex flex-col">
                    <div className="p-4 border-b">
                        <h4 className="text-lg font-semibold text-gray-800">Generated Paper Preview</h4>
                        {paper && (
                             <div className="flex space-x-2 mt-2">
                                <Button onClick={handleDownloadPdf} variant="secondary" className="text-sm">
                                    <i className="fa-solid fa-file-pdf mr-2"></i> Download as PDF
                                </Button>
                                 <Button onClick={handleDownloadWord} className="text-sm">
                                    <i className="fa-solid fa-file-word mr-2"></i> Download as Word
                                </Button>
                            </div>
                        )}
                    </div>
                    <div id="print-section" ref={paperRef} className="p-6 overflow-y-auto flex-1 min-h-[300px]">
                        {isLoading && <div className="text-center p-8"><span className="text-primary">Generating with AI... Please wait.</span></div>}
                        {paper ? (
                            <div className="bg-white p-8 shadow-lg" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                                <header className="text-center mb-6">
                                    {logo && <img src={logo} alt="Institution Logo" className="mx-auto h-20 w-20 object-contain mb-4"/>}
                                    <h1 className="text-2xl font-bold">{config.institution}</h1>
                                    <h2 className="text-xl">{config.title}</h2>
                                </header>
                                <div className="flex justify-between border-y py-2 my-4 text-sm">
                                    <span><strong>Grade:</strong> {config.grade}</span>
                                    <span><strong>Subject:</strong> {config.subject}</span>
                                    <span><strong>Total Marks:</strong> {config.marks}</span>
                                </div>
                                <div className="whitespace-pre-wrap text-sm text-gray-800">
                                    {paper.split('\n').map((line, index) => {
                                        // Check if line is a section header (all caps or ends with colon)
                                        const isSectionHeader = line.trim().toUpperCase() === line.trim() && line.trim().length > 0 && !line.trim().match(/^\d+\./);
                                        const isQuestion = line.trim().match(/^\d+\./);
                                        
                                        if (isSectionHeader) {
                                            return (
                                                <div key={index} className="section">
                                                    <div className="section-title">{line.trim()}</div>
                                                    <div className="section-divider"></div>
                                                </div>
                                            );
                                        } else if (isQuestion) {
                                            return (
                                                <div key={index} className="question-with-space">
                                                    {line.trim()}
                                                </div>
                                            );
                                        } else if (line.trim().length > 0) {
                                            // For non-empty lines that are not questions or headers
                                            return (
                                                <div key={index} className="question">
                                                    {line.trim()}
                                                </div>
                                            );
                                        } else {
                                            // For empty lines, preserve spacing
                                            return (
                                                <div key={index} className="question">
                                                    &nbsp;
                                                </div>
                                            );
                                        }
                                    })}
                                    {/* Add end of paper marker */}
                                    <div className="end-marker">--- END OF QUESTION PAPER ---</div>
                                </div>
                             </div>
                        ) : (
                            <div className="text-center text-gray-500 p-8 flex items-center justify-center h-full">
                                <span>Your generated question paper will appear here.</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
        </>
    );
};

export default AIQuestionGenerator;