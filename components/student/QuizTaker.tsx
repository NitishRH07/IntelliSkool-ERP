
import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { MOCK_QUIZ } from '../../constants';

const QuizTaker: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    const [showResults, setShowResults] = useState(false);

    const quiz = MOCK_QUIZ;
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const totalQuestions = quiz.questions.length;

    const handleAnswerSelect = (answer: string) => {
        setUserAnswers(prev => ({
            ...prev,
            [currentQuestionIndex]: answer
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handleSubmit = () => {
        setShowResults(true);
    };

    const calculateScore = () => {
        return quiz.questions.reduce((score, question, index) => {
            if (userAnswers[index] === question.correctAnswer) {
                return score + 1;
            }
            return score;
        }, 0);
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setShowResults(false);
    };

    if (showResults) {
        const score = calculateScore();
        return (
            <Card title="Quiz Results" icon="fa-solid fa-square-poll-vertical">
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">You scored {score} out of {totalQuestions}!</h3>
                    <div className="space-y-4 mb-6">
                        {quiz.questions.map((q, index) => (
                            <div key={index} className={`p-3 rounded-md text-left ${userAnswers[index] === q.correctAnswer ? 'bg-green-100' : 'bg-red-100'}`}>
                                <p className="font-semibold">{index + 1}. {q.questionText}</p>
                                <p>Your answer: <span className="font-medium">{userAnswers[index] || "No answer"}</span></p>
                                {userAnswers[index] !== q.correctAnswer && <p>Correct answer: <span className="font-medium text-green-700">{q.correctAnswer}</span></p>}
                            </div>
                        ))}
                    </div>
                    <Button onClick={resetQuiz}>Take Again</Button>
                </div>
            </Card>
        );
    }

    return (
        <Card title={quiz.title} icon="fa-solid fa-puzzle-piece">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Question {currentQuestionIndex + 1} of {totalQuestions}</h3>
                </div>

                <p className="text-xl mb-6">{currentQuestion.questionText}</p>

                <div className="space-y-3 mb-8">
                    {currentQuestion.options.map(option => (
                        <button
                            key={option}
                            onClick={() => handleAnswerSelect(option)}
                            className={`w-full text-left p-3 rounded-md border-2 transition-colors ${
                                userAnswers[currentQuestionIndex] === option
                                ? 'bg-primary border-primary-dark text-white'
                                : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                <div className="flex justify-end">
                    {currentQuestionIndex < totalQuestions - 1 ? (
                        <Button onClick={handleNext}>Next Question</Button>
                    ) : (
                        <Button onClick={handleSubmit} variant="secondary" disabled={!userAnswers.hasOwnProperty(currentQuestionIndex)}>Submit Quiz</Button>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default QuizTaker;
