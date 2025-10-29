import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { evaluatePaper } from '../../services/geminiService';

const AIPaperEvaluator: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [prompt, setPrompt] = useState('This is a 10th grade physics paper on "Laws of Motion". Please grade the answers out of 20, provide feedback for each question, and give a final score.');
    const [isLoading, setIsLoading] = useState(false);
    const [evaluation, setEvaluation] = useState('');
    const [error, setError] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
                setEvaluation('');
                setError('');
            };
            reader.readAsDataURL(file);
        }
    };
    
    const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });

    const handleEvaluate = async () => {
        if (!imageFile || !prompt) {
            setError('Please upload an image of the paper and provide evaluation instructions.');
            return;
        }
        setIsLoading(true);
        setEvaluation('');
        setError('');
        
        try {
            const base64Data = await toBase64(imageFile);
            const result = await evaluatePaper(base64Data, imageFile.type, prompt);
            setEvaluation(result);
        } catch (err) {
            setError('Failed to process the paper.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card title="AI Paper Evaluator" icon="fa-solid fa-file-signature">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Upload and Prompt */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-1">Upload Scanned Paper</label>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                             className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
                        />
                    </div>
                    {image && (
                         <div className="p-2 border rounded-lg">
                            <img src={image} alt="Preview" className="max-h-60 w-full object-contain rounded-md" />
                         </div>
                    )}
                    <div>
                        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">Evaluation Instructions</label>
                        <textarea
                            id="prompt"
                            value={prompt}
                            onChange={e => setPrompt(e.target.value)}
                            rows={4}
                            className="mt-1 block w-full input-style"
                            placeholder="e.g., Grade this math test out of 50. Provide feedback on calculation errors."
                        />
                    </div>
                     <Button onClick={handleEvaluate} isLoading={isLoading} disabled={!image} className="w-full">
                        <i className="fa-solid fa-magnifying-glass-chart mr-2"></i> Evaluate Paper
                    </Button>
                </div>

                {/* Analysis Output */}
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[300px]">
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">AI Evaluation</h4>
                    {isLoading && <div className="text-center p-8"><span className="text-primary">AI is reading and grading the paper...</span></div>}
                    {error && <div className="text-center p-8 text-red-600">{error}</div>}
                    {evaluation && (
                        <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">{evaluation}</pre>
                    )}
                    {!isLoading && !evaluation && !error && <div className="text-center text-gray-500 p-8">The AI-generated evaluation will appear here.</div>}
                </div>
            </div>
        </Card>
    );
};

export default AIPaperEvaluator;
