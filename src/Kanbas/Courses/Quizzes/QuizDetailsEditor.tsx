import React, { ChangeEvent } from 'react';
import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveQuiz, publishQuiz } from "./reducer";
import "bootstrap/dist/css/bootstrap.min.css";
import * as client from "./client"; // Adjust this import based on where client is located

type FieldType = 'dueDate' | 'availableDate' | 'otherField'; 

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
    numberOfQuestions: 0,
    studentScore: 0,
    published: false,
    questions: []
  });

  useEffect(() => {
    const fetchQuizData = async () => {
      if (qid) {
        try {
          const response = await client.getQuiz(cid as string, qid);
          // Adjust response data to match schema if necessary
          setQuizData(response);
        } catch (error) {
          console.error("Failed to fetch quiz data:", error);
        }
      }
    };

    fetchQuizData();
  }, [cid, qid]);

  const handleSave = () => {
    dispatch(saveQuiz(quizData));
    navigate(`/courses/${cid}/quizzes`);
  };

  const handlePublish = () => {
    dispatch(publishQuiz(quizData));
    navigate(`/courses/${cid}/quizzes`);
  };

  const handleCancel = () => {
    navigate(`/courses/${cid}/quizzes`);
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

      {tab === "questions" && (
        <div className="questions p-4 border">
          <h2>Quiz Questions</h2>
          {/* Add your questions management UI here */}
        </div>
      )}
    </div>
  );
}