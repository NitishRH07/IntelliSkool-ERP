import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { generateVideo } from '../../services/geminiService';

const VideoGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState('A majestic lion roaring on a cliff at sunset, cinematic lighting');
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isApiKeySelected, setIsApiKeySelected] = useState(false);

    useEffect(() => {
        checkApiKey();
    }, []);

    const checkApiKey = async () => {
        if (window.aistudio && await window.aistudio.hasSelectedApiKey()) {
            setIsApiKeySelected(true);
        } else {
            setIsApiKeySelected(false);
        }
    };
    
    const handleSelectKey = async () => {
        await window.aistudio.openSelectKey();
        // Assume key selection is successful to avoid race condition
        setIsApiKeySelected(true); 
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setError('');
        setVideoUrl(null);
        setStatus('');

        const result = await generateVideo(prompt, aspectRatio, (update) => setStatus(update));
        
        if (result.uri) {
            setVideoUrl(result.uri);
            setStatus('Video generated successfully!');
        } else {
            const errorMessage = result.error || 'An unknown error occurred.';
            setError(errorMessage);
            setStatus('');
            // Updated check to match the new, user-friendly error message from the service
            if (errorMessage.includes("re-select your API key")) {
                 setIsApiKeySelected(false); // Reset key state if it's invalid
            }
        }
        setIsGenerating(false);
    };

    return (
        <Card title="AI Video Generator (Veo)" icon="fa-solid fa-video">
            {!isApiKeySelected && (
                 <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md mb-6">
                    <h4 className="font-bold">API Key Required</h4>
                    <p className="mb-2">Video generation with Veo requires you to select a project with the Gemini API enabled. Please select your API key to proceed. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline">Learn about billing</a>.</p>
                    <Button onClick={handleSelectKey} variant="secondary">
                        <i className="fa-solid fa-key mr-2"></i> Select API Key
                    </Button>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">Video Prompt</label>
                        <textarea
                            id="prompt"
                            value={prompt}
                            onChange={e => setPrompt(e.target.value)}
                            rows={5}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="e.g., An astronaut riding a horse on Mars"
                        />
                    </div>
                     <div>
                        <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-700">Aspect Ratio</label>
                        <select
                            id="aspectRatio"
                            value={aspectRatio}
                            onChange={e => setAspectRatio(e.target.value as '16:9' | '9:16')}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        >
                            <option value="16:9">16:9 (Landscape)</option>
                            <option value="9:16">9:16 (Portrait)</option>
                        </select>
                    </div>
                    <Button onClick={handleGenerate} isLoading={isGenerating} disabled={!isApiKeySelected || !prompt.trim()} className="w-full">
                        <i className="fa-solid fa-film mr-2"></i> Generate Video
                    </Button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[300px] flex flex-col items-center justify-center">
                    {isGenerating ? (
                        <div className="text-center">
                            <svg className="animate-spin mx-auto h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="text-primary font-semibold">{status || 'Initializing...'}</p>
                            <p className="text-sm text-gray-500 mt-1">Video generation can take several minutes. Please be patient.</p>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-600">
                             <i className="fa-solid fa-circle-xmark text-4xl mb-4"></i>
                            <p className="font-bold">Generation Failed</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    ) : videoUrl ? (
                        <video controls src={videoUrl} className="max-w-full rounded-lg" />
                    ) : (
                        <div className="text-center text-gray-500">
                             <i className="fa-solid fa-photo-film text-4xl mb-4"></i>
                            <p>Your generated video will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default VideoGenerator;