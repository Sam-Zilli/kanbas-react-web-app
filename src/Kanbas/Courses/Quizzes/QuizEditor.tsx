import React, { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveQuiz, publishQuiz } from './reducer';
import "bootstrap/dist/css/bootstrap.min.css";
import * as client from './client'; 
import QuizDetailsEditor from './QuizDetailsEditor';
import QuizQuestionsEditor from './QuizQuestionsEditor';
import { QuizData, Question, MultipleChoiceQuestion } from "../../types";

// Define the types for question fields
type FieldType = 'dueDate' | 'availableDate' | 'untilDate';

// Type guard functions
const isMultipleChoiceQuestion = (question: Question): question is MultipleChoiceQuestion => question.type === 'multiple_choice';

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("details");
  const [quizData, setQuizData] = useState<QuizData>({
    name: "New Quiz",
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

  const [questions, setQuestions] = useState<Question[]>(quizData.questions || []);

  const handleAddQuestion = (newQuestion: Question) => {
    console.log("QUIZ EDITOR handleAddQuestion")
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
  };
  
  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleQuizDataChange = (field: string, value: any) => {
    setQuizData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      if (qid) {
        try {
          const response = await client.getQuiz(cid as string, qid);
          setQuizData(response);
          setQuestions(response.questions || []); 
        } catch (error) {
          console.error("Failed to fetch quiz data:", error);
        }
      }
    };
  
    fetchQuizData();
  }, [cid, qid]);

  const handleSave = async () => {
    try {
      // Update quizData with the latest questions
      const updatedQuizData = { ...quizData, questions };
  
      if (cid) {
        if (qid) {
          // Update existing quiz
          console.log("QuizEditor.tsx handleSave existing quiz")
          await client.updateQuiz(cid, updatedQuizData);
          dispatch(saveQuiz(updatedQuizData));
        } else {
          console.log("QuizEditor.tsx handleSave new quiz")
          // Create new quiz
          await client.createQuiz(cid, updatedQuizData);
          dispatch(saveQuiz(updatedQuizData));
        }
        navigate(`/Kanbas/courses/${cid}/quizzes`);
      }
    } catch (error) {
      console.error("Failed to save quiz:", error);
    }
  };

  const handlePublish = async () => {
    try {
      if (cid && qid) {
        const updatedQuizData = { ...quizData, published: true };
        await client.updateQuiz(cid, updatedQuizData);
        dispatch(publishQuiz(updatedQuizData));
        navigate(`/Kanbas/courses/${cid}/quizzes/${qid}`);
      }
    } catch (error) {
      console.error("Failed to publish quiz:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/Kanbas/courses/${cid}/quizzes`);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>, field: FieldType) => {
    const { value } = e.target;
    setQuizData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleQuestionChange = (index: number, field: keyof Question | 'options', value: any) => {
    console.log(`Updating question at index ${index}, field ${field} with value`, value);
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      const question = updatedQuestions[index];
  
      if (field === 'options') {
        if (isMultipleChoiceQuestion(question)) {
          question.options = value;
        }
      } else {
        updatedQuestions[index] = {
          ...question,
          [field]: value,
        };
      }
  
      return updatedQuestions;
    });
  };
  
  

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Quiz Editor</h1>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "details" ? "active" : ""}`}
            onClick={() => setTab("details")}
          >
            Quiz Details Editor
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "questions" ? "active" : ""}`}
            onClick={() => setTab("questions")}
          >
            Quiz Questions Editor
          </button>
        </li>
      </ul>

      {tab === "details" && (
        <QuizDetailsEditor
          quizData={quizData}
          onChange={handleQuizDataChange}
        />
      )}

      {tab === "questions" && (
        <QuizQuestionsEditor
          questions={questions}
          onQuestionChange={handleQuestionChange}
          onQuestionRemove={handleRemoveQuestion}
          onAddQuestion={handleAddQuestion}
        />
      )}

      <div className="d-flex justify-content-end">
        <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
        <button className="btn btn-success me-2" onClick={handlePublish}>Save and Publish</button>
        <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}
