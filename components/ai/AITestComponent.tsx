import React, { useState } from 'react';
import { getChatbotResponse } from '../../services/geminiService';

const AITestComponent: React.FC = () => {
    const [input, setInput] = useState('Hello, how are you?');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [apiKeyStatus, setApiKeyStatus] = useState<'unknown' | 'available' | 'missing'>('unknown');

    const testApiKey = () => {
        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (apiKey) {
                setApiKeyStatus('available');
            } else {
                setApiKeyStatus('missing');
            }
        } catch (err) {
            setApiKeyStatus('missing');
        }
    };

    const handleTestAI = async () => {
        if (!input.trim()) {
            setError('Please enter a question');
            return;
        }

        setLoading(true);
        setError('');
        setResponse('');

        try {
            console.log('Testing AI with input:', input);
            const result = await getChatbotResponse(input);
            console.log('AI response:', result);
            setResponse(result);
        } catch (err) {
            console.error('AI Test Error:', err);
            setError('Failed to get AI response: ' + (err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">AI Features Test</h2>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">Environment Variable Check</h3>
                <button 
                    onClick={testApiKey}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2"
                >
                    Check API Key Status
                </button>
                {apiKeyStatus === 'available' && (
                    <p className="text-green-600">✅ API Key is available</p>
                )}
                {apiKeyStatus === 'missing' && (
                    <p className="text-red-600">❌ API Key is missing or not accessible</p>
                )}
                {apiKeyStatus === 'unknown' && (
                    <p className="text-gray-600">Click the button above to check API key status</p>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="aiTestInput" className="block text-sm font-medium text-gray-700 mb-2">
                    Test Question
                </label>
                <input
                    id="aiTestInput"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter a question to test AI features..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
            </div>

            <button
                onClick={handleTestAI}
                disabled={loading}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
                {loading ? 'Testing...' : 'Test AI'}
            </button>

            {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                    <h3 className="text-red-800 font-medium">Error</h3>
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {response && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                    <h3 className="text-green-800 font-medium">AI Response</h3>
                    <p className="text-green-700 whitespace-pre-wrap">{response}</p>
                </div>
            )}

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <h3 className="text-yellow-800 font-medium mb-2">Troubleshooting</h3>
                <ul className="list-disc pl-5 text-yellow-700 space-y-1">
                    <li>Make sure VITE_GEMINI_API_KEY is set in Vercel environment variables</li>
                    <li>Check browser console for any JavaScript errors</li>
                    <li>Verify the API key is valid and has proper permissions</li>
                    <li>After adding environment variables, redeploy your application</li>
                </ul>
            </div>
        </div>
    );
};

export default AITestComponent;