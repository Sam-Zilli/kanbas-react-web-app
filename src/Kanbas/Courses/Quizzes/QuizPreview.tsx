import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Question, MultipleChoiceQuestion, TrueFalseQuestion, FillInTheBlankQuestion, QuizData } from '../../types';
import MultipleChoiceQuestionEditor from './MultipleChoiceEditor';
import TrueFalseQuestionEditor from './TrueFalseEditor';
import FillInTheBlankQuestionEditor from './FillInTheBlankEditor';
import { fetchQuizById, getQuiz } from '../../Courses/Quizzes/client';
import * as client from './client';
type QuizPreviewProps = {};

const QuizPreview: React.FC<QuizPreviewProps> = () => {
  const { cid, qid } = useParams<{ cid: string; qid: string }>() 

    const [quizData, setQuizData] = useState<QuizData>({
      name: "",
      description: "",
      course: cid || "",
      points: 0,
      dueDate: "",
      availableDate: "",
      untilDate: "",
      numberOfQuestions: 0,
      studentScore: 0,
      published: false,
      type: "Graded Quiz", 
      assignmentGroup: "Quizzes", 
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      attempts: 1, 
      showCorrectAnswers: "Never", 
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false, 
      lockQuestionsAfterAnswering: false,
      questions: []
  });

  const [answers, setAnswers] = useState<Record<number, any>>({}); 
  const [score, setScore] = useState<number | null>(null); 

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await client.getQuiz(cid as string, qid as string);
        setQuizData(response);
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
      }
    };

    fetchQuiz();
  }, [qid]);

  const handleAnswerChange = (index: number, value: any) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    if (quizData) {
      const totalPoints = quizData.questions.reduce((total: number, question: Question, index: number) => {
        const correctAnswer = question.correctAnswer;
        const userAnswer = answers[index];
        const isCorrect = userAnswer === correctAnswer;

        return total + (isCorrect ? (question as any).points : 0); 
      }, 0);

      setScore(totalPoints);
    }
  };

  const renderQuestion = (question: Question, index: number) => {
    switch (question.type) {
      case 'multiple_choice':
        return (
          <MultipleChoiceQuestionEditor
            question={question as MultipleChoiceQuestion}
            onQuestionChange={(field, value) => handleAnswerChange(index, value)}
          />
        );
      case 'true_false':
        return (
          <TrueFalseQuestionEditor
            question={question as TrueFalseQuestion}
            onQuestionChange={(field, value) => handleAnswerChange(index, value)}
          />
        );
      case 'fill_in_the_blank':
        return (
          <FillInTheBlankQuestionEditor
            question={question as FillInTheBlankQuestion}
            onQuestionChange={(field, value) => handleAnswerChange(index, value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="quiz-preview">
      {quizData ? (
        <>
          <h1>{quizData.name}</h1>
          <p>{quizData.description}</p>
          <form onSubmit={(e) => e.preventDefault()}>
            {quizData.questions.map((question: Question, index: number) => (
              <div key={index} className="question mb-4">

                <div>{renderQuestion(question, index)}</div>
              </div>
            ))}
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          </form>
          {score !== null && (
            <div className="score mt-4">
              <h3>Your Score: {score} / {quizData.questions.reduce((total: number, question: Question) => total + (question as any).points, 0)}</h3>
            </div>
          )}
        </>
      ) : (
        <p>Loading quizData...</p>
      )}
    </div>
  );
};

export default QuizPreview;
