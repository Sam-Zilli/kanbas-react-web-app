import { useState, useEffect } from "react";
import * as client from "./client";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuizzes,
  addQuiz,
  updateQuiz,
  deleteQuiz,
} from "./reducer";
import { PiDotsSixVerticalFill } from "react-icons/pi";

export default function Quizzes() {
  const navigate = useNavigate();
  const { cid } = useParams();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const dispatch = useDispatch();
  
  const [contextMenu, setContextMenu] = useState<{ quizId: string | null, x: number, y: number } | null>(null);

  const createQuiz = async (quiz: any) => {
    const newQuiz = await client.createQuiz(cid as string, quiz);
    dispatch(addQuiz(newQuiz));
  };

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const saveQuizzes = async (quiz: any) => {
    console.log("index.tsx saveQuizzes");
    const updatedQuiz = await client.updateQuiz(cid as string, quiz);
    dispatch(updateQuiz(updatedQuiz)); 
  };
  

  const removeQuiz = async (quizId: string) => {
    await client.deleteQuiz(cid as string, quizId);
    dispatch(deleteQuiz(quizId));
  };

  const handleAddQuiz = () => {
    navigate(`/Kanbas/courses/${cid}/quizzes/new`);
  };

  const handleContextMenu = (event: React.MouseEvent, quizId: string) => {
    event.preventDefault(); // Prevent the default context menu from appearing
    setContextMenu({ quizId, x: event.clientX, y: event.clientY });
  };

  const handleEdit = (quizId: string) => {
    navigate(`/Kanbas/courses/${cid}/quizzes/${quizId}/edit`);
    setContextMenu(null);
  };

  const handleDelete = (quizId: string) => {
    removeQuiz(quizId);
    setContextMenu(null);
  };

  const handlePublish = async (quizId: string) => {
    console.log("Handle Publish clicked...");
  
    // Find the quiz by ID
    const quiz = quizzes.find((q: any) => q._id === quizId);
    console.log("Quiz before update: ", quiz);
  
    if (quiz) {
      // Toggle the published status
      const updatedQuiz = { ...quiz, published: !quiz.published };
      console.log("Updated quiz (before save): ", updatedQuiz);
  
      // Save the updated quiz
      console.log("before await saveQuizzes");
      await saveQuizzes(updatedQuiz);
  
      // Check the state of the quiz after saving
      console.log("Updated quiz (after save): ", updatedQuiz);
    }
  
    setContextMenu(null);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (contextMenu && !(event.target as Element).closest(".context-menu")) {
      setContextMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu]);

  return (
    <div id="wd-quizzes" className="container mt-4">
      <button 
        className="btn btn-primary mb-3"
        onClick={handleAddQuiz}
      >
        Add Quiz
      </button>

      <div className="card mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h3 id="wd-quizzes-title" className="mb-0">
            Quizzes
          </h3>
        </div>
      </div>

      <ul id="wd-quizzes-list" className="list-group">
        {quizzes.map((quiz: any) => (
          <li
            key={quiz._id}
            className="wd-quizzes-list-item list-group-item p-3 mb-3 border border-secondary rounded-3 bg-light d-flex justify-content-between align-items-center"
            onContextMenu={(event) => handleContextMenu(event, quiz._id)}
          >
            <div className="w-100">
              {/* Quiz Name */}
              <div className="text-dark mb-2">
                <strong className="fs-4">{quiz.name}</strong>
              </div>

              {/* Quiz Details */}
              <div className="row text-dark">
                <div className="col-md-2">
                  <strong>Points:</strong> {quiz.points}
                </div>
                <div className="col-md-2">
                  <strong>Questions:</strong> {quiz.questions.length}
                </div>
                <div className="col-md-2">
                  <strong>Due Date:</strong> {quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : 'N/A'}
                </div>
                <div className="col-md-2">
                  <strong>Available:</strong> {quiz.availableDate ? new Date(quiz.availableDate).toLocaleDateString() : 'N/A'}
                </div>
                <div className="col-md-2">
                  <strong>Score:</strong> {quiz.studentScore || 'N/A'}
                </div>
                <div className="col-md-2">
                  <strong>Published:</strong> {quiz.published ? "✅" : "🚫"}
                </div>
              </div>
            </div>

            {/* More Options Icon */}
            <button 
              className="btn btn-light btn-sm"
              onClick={(event) => handleContextMenu(event, quiz._id)}
            >
              <PiDotsSixVerticalFill size={24} />
            </button>
          </li>
        ))}
      </ul>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="context-menu position-absolute"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <ul className="list-unstyled bg-white border rounded shadow">
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleEdit(contextMenu.quizId!)}
              >
                Edit
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleDelete(contextMenu.quizId!)}
              >
                Delete
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handlePublish(contextMenu.quizId!)}
              >
                          {quizzes.find((q: any) => q._id === contextMenu.quizId!)?.published ? "Unpublish" : "Publish"}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}



