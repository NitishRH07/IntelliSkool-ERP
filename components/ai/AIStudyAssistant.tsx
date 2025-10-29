import React, { useState, useRef, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { getChatbotResponse } from '../../services/geminiService';
import { ChatMessage } from '../../types';

const AIStudyAssistant: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'init',
            role: 'model',
            content: 'Hello! I am your AI Study Assistant. How can I help you with your studies today? Ask me about any subject!'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const responseContent = await getChatbotResponse(input);

        const modelMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            content: responseContent,
        };

        setMessages(prev => [...prev, modelMessage]);
        setIsLoading(false);
    };

    return (
        <Card title="AI Study Assistant" icon="fa-solid fa-robot">
            <div className="flex flex-col h-[600px]">
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-md space-y-4">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-lg p-3 rounded-lg ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-text-main'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                     {isLoading && (
                        <div className="flex justify-start">
                            <div className="max-w-lg p-3 rounded-lg bg-gray-200 text-text-main">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSend} className="mt-4 flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Ask a question about any subject..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        disabled={isLoading}
                    />
                    <Button type="submit" isLoading={isLoading} disabled={!input.trim()}>
                        <i className="fa-solid fa-paper-plane mr-2"></i> Send
                    </Button>
                </form>
            </div>
        </Card>
    );
};

export default AIStudyAssistant;