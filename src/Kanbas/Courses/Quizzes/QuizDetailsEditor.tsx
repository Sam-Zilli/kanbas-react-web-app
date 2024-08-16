import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveQuiz, publishQuiz } from "./reducer";
import "bootstrap/dist/css/bootstrap.min.css";

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
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={quizData.title}
              onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
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
            <label className="form-label">Quiz Type</label>
            <select
              className="form-select"
              value={quizData.quizType}
              onChange={(e) => setQuizData({ ...quizData, quizType: e.target.value })}
            >
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </select>
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

// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { saveQuiz, publishQuiz } from "./reducer"; 

// export default function QuizEditor() {
//   const { cid, qid } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [tab, setTab] = useState("details");
//   const [quizData, setQuizData] = useState({
//     title: "",
//     description: "",
//     quizType: "Graded Quiz",
//     points: 0,
//     assignmentGroup: "Quizzes",
//     shuffleAnswers: "Yes",
//     timeLimit: 20,
//     multipleAttempts: "No",
//     showCorrectAnswers: "",
//     accessCode: "",
//     oneQuestionAtATime: "Yes",
//     webcamRequired: "No",
//     lockQuestionsAfterAnswering: "No",
//     dueDate: "",
//     availableDate: "",
//     untilDate: "",
//   });

//   const handleSave = () => {
//     dispatch(saveQuiz(quizData));
//     navigate(`/courses/${cid}/quizzes/${qid}`);
//   };

//   const handlePublish = () => {
//     dispatch(publishQuiz(quizData));
//     navigate(`/courses/${cid}/quizzes`);
//   };

//   const handleCancel = () => {
//     navigate(`/courses/${cid}/quizzes`);
//   };

//   return (
//     <div className="quiz-editor">
//       <div className="tabs">
//         <button onClick={() => setTab("details")}>Details</button>
//         <button onClick={() => setTab("questions")}>Questions</button>
//       </div>

//       {tab === "details" && (
//         <div className="details">
//           <h2>Quiz Details</h2>
//           <label>Title</label>
//           <input
//             type="text"
//             value={quizData.title}
//             onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
//           />
//           <label>Description</label>
//           <textarea
//             value={quizData.description}
//             onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
//           />
//           <label>Quiz Type</label>
//           <select
//             value={quizData.quizType}
//             onChange={(e) => setQuizData({ ...quizData, quizType: e.target.value })}
//           >
//             <option value="Graded Quiz">Graded Quiz</option>
//             <option value="Practice Quiz">Practice Quiz</option>
//             <option value="Graded Survey">Graded Survey</option>
//             <option value="Ungraded Survey">Ungraded Survey</option>
//           </select>
          
//           <button onClick={handleSave}>Save</button>
//           <button onClick={handlePublish}>Save and Publish</button>
//           <button onClick={handleCancel}>Cancel</button>
//         </div>
//       )}

//       {tab === "questions" && (
//         <div className="questions">
//           <h2>Quiz Questions</h2>

//         </div>
//       )}
//     </div>
//   );
// }
