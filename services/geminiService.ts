import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Quiz } from '../types';

// FIX: Initialize Gemini AI Client with proper environment variable handling
// Declare the global property for Vite environment variables
declare global {
    interface Window {
        VITE_GEMINI_API_KEY?: string;
    }
}

// For TypeScript to recognize import.meta.env
declare const __VITE_GEMINI_API_KEY__: string | undefined;

// Use Vite environment variable with fallback to process.env
const apiKey = __VITE_GEMINI_API_KEY__ || process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey });

const getModel = (taskType: string) => {
    switch (taskType) {
        case 'simple':
            return 'gemini-2.5-flash';
        case 'complex':
            return 'gemini-2.5-pro';
        case 'vision':
            return 'gemini-2.5-flash'; // gemini-2.5-flash can handle vision
        case 'video':
            return 'veo-3.1-fast-generate-preview';
        default:
            return 'gemini-2.5-flash';
    }
};

const simpleTextRequest = async (prompt: string, taskType: 'simple' | 'complex' = 'simple'): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: getModel(taskType),
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "An error occurred while communicating with the AI. Please check the console for details.";
    }
};

export const generateQuestionPaper = async (config: any): Promise<string> => {
    // Create a detailed structure description
    let structureDescription = "";
    if (config.questionStructure) {
        structureDescription = `Structure the paper according to the following question types and counts: ${config.questionStructure}. `;
    } else {
        structureDescription = "Structure the paper with clear sections (e.g., Section A: Multiple Choice, Section B: Short Answers, Section C: Long Answers) and assign marks to each question. ";
    }
    
    const prompt = `
        Generate a question paper with the following specifications:
        - Institution: ${config.institution}
        - Title: ${config.title}
        - Grade: ${config.grade}
        - Medium: ${config.medium}
        - Subject: ${config.subject}
        - Topics: ${config.topics}
        - Difficulty: ${config.difficulty}
        - Total Marks: ${config.marks}
        
        ${structureDescription}
        The questions should be relevant to the topics and appropriate for the specified grade and difficulty level.
        Ensure proper formatting with:
        1. Clear section headings (e.g., SECTION A, SECTION B, etc.)
        2. Proper numbering for questions (1, 2, 3, etc.)
        3. Appropriate spacing between questions
        4. Clear separation between sections
        5. Proper indentation for sub-questions if any
        
        Do not include the header (institution name, title, etc.) in your response, only provide the questions and structure.
    `;
    return simpleTextRequest(prompt, 'complex');
};

export const generateQuizFromNotes = async (notes: string, subject: string, numQuestions: number): Promise<Quiz | null> => {
    const prompt = `Based on the following notes about ${subject}, generate a quiz with ${numQuestions} multiple-choice questions. Each question must have 4 options and a single correct answer.

    Notes:
    ---
    ${notes}
    ---
    
    Return the quiz title, and for each question, provide the question text, a list of options, and the correct answer.`;
    
    try {
        const response = await ai.models.generateContent({
            model: getModel('simple'),
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        questions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    questionText: { type: Type.STRING },
                                    options: {
                                        type: Type.ARRAY,
                                        items: { type: Type.STRING }
                                    },
                                    correctAnswer: { type: Type.STRING }
                                },
                                required: ["questionText", "options", "correctAnswer"]
                            }
                        }
                    },
                    required: ["title", "questions"]
                }
            }
        });

        // The response.text will be a JSON string that needs parsing
        return JSON.parse(response.text) as Quiz;

    } catch (error) {
        console.error("Quiz Generation Error:", error);
        return null;
    }
};


export const getAIAnalysis = (prompt: string) => simpleTextRequest(prompt);
export const getChatbotResponse = (input: string) => simpleTextRequest(`You are a helpful AI study assistant for a student. Provide a clear, concise, and encouraging answer to the following question: "${input}"`);
export const generateReportRemarks = (studentData: string) => simpleTextRequest(`Generate personalized, constructive report card remarks for a student with the following data. Be encouraging and provide actionable advice. Data: ${studentData}`);
export const generateLessonPlan = (inputs: any) => simpleTextRequest(`Create a detailed weekly lesson plan for a ${inputs.grade} ${inputs.subject} class.
    - Current Module: ${inputs.week}
    - Last Week's Recap: ${inputs.lastWeekTopics}
    - Student Performance Context: ${inputs.performance}
    
    The plan should include day-by-day objectives, activities, and assessment methods. It should address the performance context (e.g., include revision for difficult topics).`, 'complex');
export const generateTimetable = (constraints: string) => simpleTextRequest(`Generate a valid weekly timetable based on these constraints:\n${constraints}`, 'complex');
export const getDropoutRiskAnalysis = (studentData: string) => simpleTextRequest(`Analyze the following student data to assess their dropout risk. Provide a risk level (Low, Medium, High), a justification for the assessment, and a list of 2-3 recommended intervention strategies for the school to implement.\n\nData:\n${studentData}`, 'complex');
export const generateAdminReport = () => simpleTextRequest(`Generate a comprehensive weekly institutional report for the school administration. Use the following mock data:
- Overall Attendance: 91% (down 2% from last week)
- Top Performing Class: Grade 10 (95% average score)
- Lowest Performing Class: Grade 8 (72% average score, especially in Physics)
- Fee Collection: 85% of target for the month.
- Teacher Absences: 3 teachers on sick leave this week.
- Key Events: Annual Sports Day preparations have begun.

The report should have sections for:
1.  Executive Summary
2.  Academic Performance Highlights
3.  Attendance Trends
4.  Administrative & Financial Update
5.  Key Concerns & AI-Powered Recommendations`, 'complex');
export const generateFeedbackForAnswer = (question: string, answer: string, criteria: string) => simpleTextRequest(`
    Grade the student's answer based on the provided criteria and give constructive feedback.
    
    Question: ${question}
    Student's Answer: ${answer}
    Grading Criteria: ${criteria}

    Your response should include:
    1.  A score breakdown based on the criteria.
    2.  A final score.
    3.  Specific, helpful feedback explaining what was good and what could be improved.
`);
export const summarizeNotes = (notes: string, format: string) => simpleTextRequest(`Summarize the following notes in ${format} format:\n\n${notes}`);
export const generateFlashcards = (topic: string, numCards: number) => simpleTextRequest(`Generate ${numCards} flashcards for the topic "${topic}". For each flashcard, provide a "front" (a question or term) and a "back" (the answer or definition). Format the output as a numbered list.`);
export const getMentorshipAdvice = (studentData: string) => simpleTextRequest(`You are an AI progress mentor. Based on the student's data below, provide encouraging advice on how they can improve. Highlight their strengths and suggest 2-3 specific, actionable steps for their areas of improvement.\n\nData:\n${studentData}`);
export const analyzeExamPrep = (prepData: string) => simpleTextRequest(`Generate a customized exam preparation plan for a student based on their self-assessment below. The plan should suggest how to balance revision of strong topics with focused effort on weak topics.\n\nStudent's Input:\n${prepData}`);
export const generateLearningPath = (studentProfile: string) => simpleTextRequest(`Create a personalized learning path for a student with the following profile. The path should suggest topics to study in a logical order and include different types of learning resources (e.g., reading, videos, practical exercises).\n\nStudent Profile:\n${studentProfile}`, 'complex');


export const analyzeImage = async (base64Data: string, mimeType: string, prompt: string): Promise<string> => {
    try {
        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: mimeType,
            },
        };
        const textPart = { text: prompt };

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: getModel('vision'),
            contents: { parts: [imagePart, textPart] },
        });
        
        return response.text;
    } catch (error) {
        console.error("Image Analysis Error:", error);
        return "Failed to analyze the image.";
    }
};

export const evaluatePaper = (base64Data: string, mimeType: string, prompt: string) => {
    return analyzeImage(base64Data, mimeType, prompt);
};

export const generateVideo = async (
    prompt: string, 
    aspectRatio: '16:9' | '9:16', 
    onUpdate: (status: string) => void
): Promise<{ uri?: string; error?: string }> => {
    try {
        // FIX: Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key from the dialog.
        const videoApiKey = __VITE_GEMINI_API_KEY__ || process.env.GEMINI_API_KEY;
        const videoAI = new GoogleGenAI({ apiKey: videoApiKey });
        onUpdate('Starting video generation...');
        let operation = await videoAI.models.generateVideos({
            model: getModel('video'),
            prompt: prompt,
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: aspectRatio
            }
        });
        onUpdate('Processing... This may take a few minutes.');
        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            onUpdate('Checking progress...');
            operation = await videoAI.operations.getVideosOperation({ operation: operation });
        }
        
        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (!downloadLink) {
             return { error: 'Video generation completed, but no download link was found.' };
        }

        // The response.body contains the MP4 bytes. You must append an API key when fetching from the download link.
        const response = await fetch(`${downloadLink}&key=${videoApiKey}`);
        if (!response.ok) {
            return { error: `Failed to fetch video file (status: ${response.status})` };
        }
        const videoBlob = await response.blob();
        const videoUrl = URL.createObjectURL(videoBlob);
        
        return { uri: videoUrl };

    } catch (error: any) {
        console.error("Video Generation Error:", error);
        if (error.message && error.message.includes("not found")) {
             return { error: "API key not found or invalid. Please re-select your API key and try again." };
        }
        return { error: error.message || 'An unknown error occurred during video generation.' };
    }
};