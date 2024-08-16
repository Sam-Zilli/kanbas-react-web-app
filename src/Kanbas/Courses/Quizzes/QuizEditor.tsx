import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveQuiz, publishQuiz } from "./reducer"; 

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("details");
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    quizType: "Graded Quiz",
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: "Yes",
    timeLimit: 20,
    multipleAttempts: "No",
    showCorrectAnswers: "",
    accessCode: "",
    oneQuestionAtATime: "Yes",
    webcamRequired: "No",
    lockQuestionsAfterAnswering: "No",
    dueDate: "",
    availableDate: "",
    untilDate: "",
  });

  const handleSave = () => {
    dispatch(saveQuiz(quizData));
    navigate(`/courses/${cid}/quizzes/${qid}`);
  };

  const handlePublish = () => {
    dispatch(publishQuiz(quizData));
    navigate(`/courses/${cid}/quizzes`);
  };

  const handleCancel = () => {
    navigate(`/courses/${cid}/quizzes`);
  };

  return (
    <div className="quiz-editor">
      <div className="tabs">
        <button onClick={() => setTab("details")}>Details</button>
        <button onClick={() => setTab("questions")}>Questions</button>
      </div>

      {tab === "details" && (
        <div className="details">
          <h2>Quiz Details</h2>
          <label>Title</label>
          <input
            type="text"
            value={quizData.title}
            onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
          />
          <label>Description</label>
          <textarea
            value={quizData.description}
            onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
          />
          <label>Quiz Type</label>
          <select
            value={quizData.quizType}
            onChange={(e) => setQuizData({ ...quizData, quizType: e.target.value })}
          >
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </select>
          
          <button onClick={handleSave}>Save</button>
          <button onClick={handlePublish}>Save and Publish</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}

      {tab === "questions" && (
        <div className="questions">
          <h2>Quiz Questions</h2>

        </div>
      )}
    </div>
  );
}
