import React, { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveQuiz, publishQuiz } from "./reducer";
import "bootstrap/dist/css/bootstrap.min.css";
import * as client from "./client";
import { Question } from "../../types";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("details");
  const [quizData, setQuizData] = useState({
    name: "",
    description: "",
    course: cid || "",
    points: 0,
    dueDate: "",
    availableDate: "",
    numberOfQuestions: 0,
    studentScore: 0,
    published: false,
    questions: []
  });

  // Summary state
  const [summary, setSummary] = useState({
    quizType: "Graded Quiz",
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: "Yes",
    timeLimit: "20 Minutes"
  });

  useEffect(() => {
    const fetchQuizData = async () => {
      if (qid) {
        try {
          const response = await client.getQuiz(cid as string, qid);
          setQuizData(response);
          // Calculate summary details
          const totalPoints = response.questions.reduce((sum: number, question: Question) => sum + question.points, 0);
          setSummary({
            quizType: response.quizType || "Graded Quiz",
            points: totalPoints,
            assignmentGroup: response.assignmentGroup || "Quizzes",
            shuffleAnswers: response.shuffleAnswers !== false ? "Yes" : "No",
            timeLimit: response.timeLimit || "20 Minutes"
          });
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
        navigate(-1); // Go back one page
      }
    } catch (error) {
      console.error("Failed to save quiz:", error);
    }
  };

  const handlePublish = () => {
    dispatch(publishQuiz(quizData));
    navigate(-1); // Go back one page
  };

  const handleCancel = () => {
    navigate(-1); // Go back one page
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = e.target;
    setQuizData(prev => ({
      ...prev,
      [field]: new Date(value)
    }));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Quiz Editor</h1>
      
      {/* Summary Section */}
      <div className="summary p-4 border mb-4">
        <h2>Summary</h2>
        <div className="mb-2">
          <strong>Quiz Type:</strong> {summary.quizType}
        </div>
        <div className="mb-2">
          <strong>Points:</strong> {summary.points}
        </div>
        <div className="mb-2">
          <strong>Assignment Group:</strong> {summary.assignmentGroup}
        </div>
        <div className="mb-2">
          <strong>Shuffle Answers:</strong> {summary.shuffleAnswers}
        </div>
        <div className="mb-2">
          <strong>Time Limit:</strong> {summary.timeLimit}
        </div>
      </div>

      {/* Tab Navigation */}
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

      {/* Details Tab */}
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
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              value={quizData.dueDate ? quizData.dueDate.toString().split('T')[0] : ""}
              onChange={(e) => handleDateChange(e, "dueDate")}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Available Date</label>
            <input
              type="date"
              className="form-control"
              value={quizData.availableDate ? quizData.availableDate.toString().split('T')[0] : ""}
              onChange={(e) => handleDateChange(e, "availableDate")}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
            <button className="btn btn-success me-2" onClick={handlePublish}>Save and Publish</button>
            <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}

      {/* Questions Tab */}
      {tab === "questions" && (
        <div className="questions p-4 border">
          <h2>Quiz Questions</h2>
          {/* Add your questions management UI here */}
        </div>
      )}
    </div>
  );
}
