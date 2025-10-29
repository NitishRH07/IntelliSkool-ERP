import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { summarizeNotes } from '../../services/geminiService';

const AINotesSummarizer: React.FC = () => {
    const [notes, setNotes] = useState('Photosynthesis is a process used by plants, algae, and certain bacteria to convert light energy into chemical energy, through a process that converts carbon dioxide and water into glucose (a sugar) and oxygen.');
    const [format, setFormat] = useState('bullet points');
    const [isLoading, setIsLoading] = useState(false);
    const [summary, setSummary] = useState('');
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!notes.trim()) {
            setError('Please enter some notes to summarize.');
            return;
        }
        setIsLoading(true);
        setSummary('');
        setError('');
        const result = await summarizeNotes(notes, format);
        if (result.includes("An error occurred")) {
            setError(result);
        } else {
            setSummary(result);
        }
        setIsLoading(false);
    };

    return (
        <Card title="AI Notes Summarizer" icon="fa-solid fa-file-lines">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Paste your notes here</label>
                        <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={12} className="mt-1 block w-full input-style" />
                    </div>
                    <div>
                        <label htmlFor="format" className="block text-sm font-medium text-gray-700">Summary Format</label>
                        <select id="format" value={format} onChange={e => setFormat(e.target.value)} className="mt-1 block w-full input-style">
                            <option value="bullet points">Bullet Points</option>
                            <option value="a short paragraph">Short Paragraph</option>
                            <option value="a single sentence">Single Sentence (TL;DR)</option>
                        </select>
                    </div>
                    <Button onClick={handleGenerate} isLoading={isLoading} className="w-full">
                        <i className="fa-solid fa-wand-magic-sparkles mr-2"></i> Summarize
                    </Button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[300px]">
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">Generated Summary</h4>
                    {isLoading && <div className="text-center p-8"><span className="text-primary">AI is summarizing...</span></div>}
                    {error && <div className="text-center p-8 text-red-600">{error}</div>}
                    {summary && <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">{summary}</pre>}
                    {!isLoading && !summary && !error && <div className="text-center text-gray-500 p-8">Your summary will appear here.</div>}
                </div>
            </div>
        </Card>
    );
};

export default AINotesSummarizer;
