import React, { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveQuiz, publishQuiz } from './reducer';
import "bootstrap/dist/css/bootstrap.min.css";
import * as client from './client'; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import quill styles

type Question = {
  type: string;
  description: string;
  options: string[];
  correctAnswer: string;
  points: number;
};
type FieldType = 'dueDate' | 'availableDate' | 'untilDate' | 'otherField';

const EditorModules = {
  toolbar: [
    [{ 'header': '1'}, { 'header': '2' }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link']
  ]
};

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("details");
  const [quizData, setQuizData] = useState({
    name: "",
    description: "",
    course: cid || "", // Set course to cid from params
    points: 0,
    dueDate: "",
    availableDate: "",
    untilDate: "",
    numberOfQuestions: 0,
    studentScore: 0,
    published: false,
    type: "Graded Quiz", // Default type
    assignmentGroup: "Quizzes", // Default assignment group
    shuffleAnswers: true, // Default Yes
    timeLimit: 20, // Default 20 minutes
    multipleAttempts: false, // Default No
    attempts: 1, // Default 1
    showCorrectAnswers: "Never", // Default Never
    accessCode: "",
    oneQuestionAtATime: true, // Default Yes
    webcamRequired: false, // Default No
    lockQuestionsAfterAnswering: false, // Default No
    questions: []
  });

  const [questions, setQuestions] = useState<Question[]>(quizData.questions || []);

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      type: "multiple_choice",
      description: "",
      options: [],
      correctAnswer: "",
      points: 0
    };
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
  };
  

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
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
      if (cid && qid) {
        await client.updateQuiz(cid, quizData);
        dispatch(saveQuiz(quizData));
        navigate(`/Kanbas/courses/${cid}/quizzes/${qid}`); 
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
      [field]: value // Save date as string in ISO format
    }));
  };

  const handleEditorChange = (value: string) => {
    // Check if the value has actually changed before updating the state
    if (quizData.description !== value) {
      setQuizData(prev => ({
        ...prev,
        description: value
      }));
    }
  };
  const handleQuestionChange = (index: number, field: keyof Question, value: any) => {
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      const updatedQuestion = { ...updatedQuestions[index], [field]: value };
      if (JSON.stringify(updatedQuestions[index]) !== JSON.stringify(updatedQuestion)) {
        updatedQuestions[index] = updatedQuestion;
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
        <div className="details p-4 border">
          <h2>Quiz Details Editor</h2>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={quizData.name}
              onChange={(e) => setQuizData({ ...quizData, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <ReactQuill
              value={quizData.description}
              onChange={handleEditorChange}
              modules={EditorModules}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Points</label>
            <input
              type="number"
              className="form-control"
              value={quizData.points}
              onChange={(e) => setQuizData({ ...quizData, points: parseInt(e.target.value, 10) })}
              readOnly // Points will be calculated based on questions
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Quiz Type</label>
            <select
              className="form-select"
              value={quizData.type}
              onChange={(e) => setQuizData({ ...quizData, type: e.target.value })}
            >
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Assignment Group</label>
            <select
              className="form-select"
              value={quizData.assignmentGroup}
              onChange={(e) => setQuizData({ ...quizData, assignmentGroup: e.target.value })}
            >
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Assignments">Assignments</option>
              <option value="Project">Project</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Shuffle Answers</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="shuffleAnswers"
                  value="true"
                  checked={quizData.shuffleAnswers === true}
                  onChange={() => setQuizData({ ...quizData, shuffleAnswers: true })}
                />
                Yes
              </label>
              <label className="ms-3">
                <input
                  type="radio"
                  name="shuffleAnswers"
                  value="false"
                  checked={quizData.shuffleAnswers === false}
                  onChange={() => setQuizData({ ...quizData, shuffleAnswers: false })}
                />
                No
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Time Limit (minutes)</label>
            <input
              type="number"
              className="form-control"
              value={quizData.timeLimit}
              onChange={(e) => setQuizData({ ...quizData, timeLimit: parseInt(e.target.value, 10) })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Multiple Attempts</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="multipleAttempts"
                  value="true"
                  checked={quizData.multipleAttempts === true}
                  onChange={() => setQuizData({ ...quizData, multipleAttempts: true })}
                />
                Yes
              </label>
              <label className="ms-3">
                <input
                  type="radio"
                  name="multipleAttempts"
                  value="false"
                  checked={quizData.multipleAttempts === false}
                  onChange={() => setQuizData({ ...quizData, multipleAttempts: false })}
                />
                No
              </label>
            </div>
          </div>
          {quizData.multipleAttempts && (
            <div className="mb-3">
              <label className="form-label">How Many Attempts</label>
              <input
                type="number"
                className="form-control"
                value={quizData.attempts}
                onChange={(e) => setQuizData({ ...quizData, attempts: parseInt(e.target.value, 10) })}
              />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Show Correct Answers</label>
            <select
              className="form-select"
              value={quizData.showCorrectAnswers}
              onChange={(e) => setQuizData({ ...quizData, showCorrectAnswers: e.target.value })}
            >
              <option value="Never">Never</option>
              <option value="AfterSubmission">After Submission</option>
              <option value="AfterDueDate">After Due Date</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Access Code</label>
            <input
              type="text"
              className="form-control"
              value={quizData.accessCode}
              onChange={(e) => setQuizData({ ...quizData, accessCode: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">One Question at a Time</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="oneQuestionAtATime"
                  value="true"
                  checked={quizData.oneQuestionAtATime === true}
                  onChange={() => setQuizData({ ...quizData, oneQuestionAtATime: true })}
                />
                Yes
              </label>
              <label className="ms-3">
                <input
                  type="radio"
                  name="oneQuestionAtATime"
                  value="false"
                  checked={quizData.oneQuestionAtATime === false}
                  onChange={() => setQuizData({ ...quizData, oneQuestionAtATime: false })}
                />
                No
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Webcam Required</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="webcamRequired"
                  value="true"
                  checked={quizData.webcamRequired === true}
                  onChange={() => setQuizData({ ...quizData, webcamRequired: true })}
                />
                Yes
              </label>
              <label className="ms-3">
                <input
                  type="radio"
                  name="webcamRequired"
                  value="false"
                  checked={quizData.webcamRequired === false}
                  onChange={() => setQuizData({ ...quizData, webcamRequired: false })}
                />
                No
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Lock Questions After Answering</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="lockQuestionsAfterAnswering"
                  value="true"
                  checked={quizData.lockQuestionsAfterAnswering === true}
                  onChange={() => setQuizData({ ...quizData, lockQuestionsAfterAnswering: true })}
                />
                Yes
              </label>
              <label className="ms-3">
                <input
                  type="radio"
                  name="lockQuestionsAfterAnswering"
                  value="false"
                  checked={quizData.lockQuestionsAfterAnswering === false}
                  onChange={() => setQuizData({ ...quizData, lockQuestionsAfterAnswering: false })}
                />
                No
              </label>
            </div>
          </div>
          
          {/* Date Fields */}
          <div className="mb-3">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              value={quizData.dueDate.split('T')[0]} // Format date string for input
              onChange={(e) => handleDateChange(e, 'dueDate')}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Available Date</label>
            <input
              type="date"
              className="form-control"
              value={quizData.availableDate.split('T')[0]} // Format date string for input
              onChange={(e) => handleDateChange(e, 'availableDate')}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Available Until Date</label>
            <input
              type="date"
              className="form-control"
              value={quizData.untilDate.split('T')[0]} // Format date string for input
              onChange={(e) => handleDateChange(e, 'untilDate')}
            />
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
            <button className="btn btn-success me-2" onClick={handlePublish}>Save and Publish</button>
            <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}

{tab === "questions" && (
        <div className="questions p-4 border">
          <h2>Quiz Questions Editor</h2>
          <button className="btn btn-primary mb-3" onClick={handleAddQuestion}>Add Question</button>
          {questions.map((question, index) => (
            <div key={index} className="mb-4">
              <div className="mb-3">
                <label className="form-label">Type</label>
                <select
                  className="form-select"
                  value={question.type}
                  onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                >
                  <option value="multiple_choice">Multiple Choice</option>
                  <option value="true_false">True/False</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <ReactQuill
                  value={question.description}
                  onChange={(value) => handleQuestionChange(index, 'description', value)}
                  modules={EditorModules}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Options</label>
                {question.options.map((option, optIndex) => (
                  <div key={optIndex} className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      value={option}
                      onChange={(e) => {
                        const updatedOptions = [...question.options];
                        updatedOptions[optIndex] = e.target.value;
                        handleQuestionChange(index, 'options', updatedOptions);
                      }}
                    />
                  </div>
                ))}
                <button
                  className="btn btn-secondary mt-2"
                  onClick={() => handleQuestionChange(index, 'options', [...question.options, ""])}
                >
                  Add Option
                </button>
              </div>
              <div className="mb-3">
                <label className="form-label">Correct Answer</label>
                <input
                  type="text"
                  className="form-control"
                  value={question.correctAnswer}
                  onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Points</label>
                <input
                  type="number"
                  className="form-control"
                  value={question.points}
                  onChange={(e) => handleQuestionChange(index, 'points', parseInt(e.target.value, 10))}
                />
              </div>
              <button className="btn btn-danger" onClick={() => handleRemoveQuestion(index)}>Remove Question</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}