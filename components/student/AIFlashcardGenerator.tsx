import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { generateFlashcards } from '../../services/geminiService';

const AIFlashcardGenerator: React.FC = () => {
    const [topic, setTopic] = useState('The Solar System');
    const [numCards, setNumCards] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const [flashcards, setFlashcards] = useState('');
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        setIsLoading(true);
        setFlashcards('');
        setError('');
        const result = await generateFlashcards(topic, numCards);
        if (result.includes("An error occurred")) {
            setError(result);
        } else {
            setFlashcards(result);
        }
        setIsLoading(false);
    };

    return (
        <Card title="AI Flashcard Generator" icon="fa-solid fa-layer-group">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic</label>
                        <input type="text" id="topic" value={topic} onChange={e => setTopic(e.target.value)} className="mt-1 block w-full input-style" />
                    </div>
                    <div>
                        <label htmlFor="numCards" className="block text-sm font-medium text-gray-700">Number of Flashcards</label>
                        <input type="number" id="numCards" value={numCards} onChange={e => setNumCards(parseInt(e.target.value, 10))} className="mt-1 block w-full input-style" />
                    </div>
                    <Button onClick={handleGenerate} isLoading={isLoading} className="w-full">
                        <i className="fa-solid fa-wand-magic-sparkles mr-2"></i> Generate Flashcards
                    </Button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[300px] overflow-y-auto">
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">Generated Flashcards</h4>
                    {isLoading && <div className="text-center p-8"><span className="text-primary">AI is creating your flashcards...</span></div>}
                    {error && <div className="text-center p-8 text-red-600">{error}</div>}
                    {flashcards && <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">{flashcards}</pre>}
                    {!isLoading && !flashcards && !error && <div className="text-center text-gray-500 p-8">Your flashcards will appear here.</div>}
                </div>
            </div>
        </Card>
    );
};

export default AIFlashcardGenerator;
