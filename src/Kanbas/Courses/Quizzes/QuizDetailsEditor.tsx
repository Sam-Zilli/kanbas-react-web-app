import React, { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveQuiz, publishQuiz } from './reducer';
import "bootstrap/dist/css/bootstrap.min.css";
import * as client from './client'; // Adjust this import based on where client is located

type FieldType = 'dueDate' | 'availableDate' | 'untilDate' | 'otherField';

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

  useEffect(() => {
    const fetchQuizData = async () => {
      if (qid) {
        try {
          const response = await client.getQuiz(cid as string, qid);
          setQuizData(response);
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
        navigate(`/courses/${cid}/quizzes`);
      }
    } catch (error) {
      console.error("Failed to save quiz:", error);
    }
  };

  const handlePublish = () => {
    dispatch(publishQuiz(quizData));
    navigate(`/courses/${cid}/quizzes`);
  };

  const handleCancel = () => {
    navigate(-1)
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>, field: FieldType) => {
    const { value } = e.target;
    setQuizData(prev => ({
      ...prev,
      [field]: new Date(value).toISOString()
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const { type, value, checked } = e.target;
    setQuizData(prev => ({
      ...prev,
      [field]: type === "checkbox" ? checked : value
    }));
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
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "questions" ? "active" : ""}`}
            onClick={() => setTab("questions")}
          >
            Questions
          </button>
        </li>
      </ul>

      {tab === "details" && (
        <div className="details p-4 border">
          <h2>Quiz Details</h2>
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
            <textarea
              className="form-control"
              rows={3}
              value={quizData.description}
              onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
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
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
            <button className="btn btn-success me-2" onClick={handlePublish}>Save and Publish</button>
            <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}

      {tab === "questions" && (
        <div className="questions p-4 border">
          <h2>Quiz Questions</h2>

          <button className="btn btn-primary" onClick={() => {/* Logic to add a new question */}}>New Question</button>
          
          {/* Display list of questions */}
        </div>
      )}
    </div>
  );
}
