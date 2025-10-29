import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { analyzeImage } from '../../services/geminiService';

const ImageAnalyzer: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [prompt, setPrompt] = useState('Describe this image in detail.');
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState('');
    const [error, setError] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
                setAnalysis('');
                setError('');
            };
            reader.readAsDataURL(file);
        }
    };
    
    // Utility to convert base64 data URL to pure base64 string
    const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });

    const handleAnalyze = async () => {
        if (!imageFile || !prompt) {
            setError('Please upload an image and provide a prompt.');
            return;
        }
        setIsLoading(true);
        setAnalysis('');
        setError('');
        
        try {
            const base64Data = await toBase64(imageFile);
            const result = await analyzeImage(base64Data, imageFile.type, prompt);
            setAnalysis(result);
        } catch (err) {
            setError('Failed to process the image.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card title="AI Image Analyzer" icon="fa-solid fa-image">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Upload and Prompt */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-1">Upload an Image</label>
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
                        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">Your Question</label>
                        <textarea
                            id="prompt"
                            value={prompt}
                            onChange={e => setPrompt(e.target.value)}
                            rows={3}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="What do you want to know about the image?"
                        />
                    </div>
                     <Button onClick={handleAnalyze} isLoading={isLoading} disabled={!image} className="w-full">
                        <i className="fa-solid fa-magnifying-glass mr-2"></i> Analyze Image
                    </Button>
                </div>

                {/* Analysis Output */}
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[300px]">
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">AI Analysis</h4>
                    {isLoading && <div className="text-center p-8"><span className="text-primary">Analyzing image with AI...</span></div>}
                    {error && <div className="text-center p-8 text-red-600">{error}</div>}
                    {analysis && (
                        <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">{analysis}</pre>
                    )}
                    {!isLoading && !analysis && !error && <div className="text-center text-gray-500 p-8">The analysis of your image will appear here.</div>}
                </div>
            </div>
        </Card>
    );
};

export default ImageAnalyzer;
