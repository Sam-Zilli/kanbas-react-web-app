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

export default function QuizList() {
  const navigate = useNavigate();
  const { cid } = useParams();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const dispatch = useDispatch();


  // Get current user and their role from the Redux store
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const userRole = currentUser?.role; // Role of the current user
  
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
    event.preventDefault();
    setContextMenu({ quizId, x: event.clientX, y: event.clientY });
  };

  const handleEdit = (quizId: string) => {
    const quiz = quizzes.find((q: any) => q._id === quizId);
  
    if (quiz) {
      navigate(`/Kanbas/courses/${cid}/quizzes/${quizId}/edit`, {
        state: { quiz }
      });
    }
  
    setContextMenu(null); // Close the context menu
  };

  const handleDelete = (quizId: string) => {
    removeQuiz(quizId);
    setContextMenu(null);
  };

  const handlePublish = async (quizId: string) => {
    const quiz = quizzes.find((q: any) => q._id === quizId);
  
    if (quiz) {
      const updatedQuiz = { ...quiz, published: !quiz.published };
      await saveQuizzes(updatedQuiz);
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

  const handleQuizClick = (quizId: string) => {
    navigate(`/Kanbas/courses/${cid}/quizzes/${quizId}`);
  };

  const getAvailabilityStatus = (availableDate: string, availableUntilDate?: string) => {
    const now = new Date();
    const available = new Date(availableDate);
    const availableUntil = availableUntilDate ? new Date(availableUntilDate) : null;

    // Convert dates to start of the day to avoid time issues
    const startOfDay = (date: Date) => new Date(date.setHours(0, 0, 0, 0));

    const nowStartOfDay = startOfDay(now);
    const availableStartOfDay = startOfDay(available);
    const availableUntilStartOfDay = availableUntil ? startOfDay(availableUntil) : null;

    if (availableUntilStartOfDay && nowStartOfDay > availableUntilStartOfDay) {
        // If current date is after availableUntilDate
        return 'Closed';
    } else if (nowStartOfDay >= availableStartOfDay && (!availableUntilStartOfDay || nowStartOfDay <= availableUntilStartOfDay)) {
        // If current date is between availableDate and availableUntilDate, or availableUntilDate is not set
        return 'Available';
    } else {
        // If current date is before availableDate
        return `Not available until ${availableStartOfDay.toLocaleDateString()}`;
    }
};

  return (
    <div id="wd-quizzes" className="container mt-4">
      {/* Conditionally render Add Quiz button based on role */}
      {userRole === 'FACULTY' && (
        <button 
          className="btn btn-primary mb-3"
          onClick={handleAddQuiz}
        >
          Add Quiz
        </button>
      )}

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
              <div 
                className="text-dark mb-2 cursor-pointer"
                onClick={() => handleQuizClick(quiz._id)}
              >
                <strong className="fs-4">{quiz.name}</strong>
              </div>

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
                  <strong>Available:</strong> {getAvailabilityStatus(quiz.availableDate, quiz.availableUntilDate)}
                </div>
                <div className="col-md-2">
                  <strong>Score:</strong> {quiz.studentScore || 'N/A'}
                </div>
                <div className="col-md-2">
                  <strong>Published:</strong> {quiz.published ? "✅" : "🚫"}
                </div>
              </div>
            </div>

            {/* Conditionally render More Options Icon based on role */}
            {userRole === 'FACULTY' && (
              <button 
                className="btn btn-light btn-sm"
                onClick={(event) => handleContextMenu(event, quiz._id)}
              >
                <PiDotsSixVerticalFill size={24} />
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Conditionally render Context Menu based on role */}
      {contextMenu && userRole === 'FACULTY' && (
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