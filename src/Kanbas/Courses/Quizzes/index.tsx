import { useState, useEffect } from "react";
import * as client from "./client";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuizzes,
  addQuiz,
  editQuiz,
  updateQuiz,
  deleteQuiz,
} from "./reducer";
import { PiDotsSixVerticalFill } from "react-icons/pi";

export default function Quizzes() {
  const navigate = useNavigate();
  const removeQuiz = async (quizId: string) => {
    await client.deleteQuiz(cid as string, quizId);
    dispatch(deleteQuiz(quizId));
  };
  const { cid } = useParams();
  const [quizName, setQuizName] = useState("");
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const dispatch = useDispatch();

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
    const status = await client.updateQuiz(cid as string, quiz);
    dispatch(updateQuiz(quiz));
  };

  const handleAddQuiz = () => {
    console.log("in ahndleAddQuix1")
    navigate(`/Kanbas/courses/${cid}/quizzes/new`);
    console.log("in handle add qyux 2")
  };


  return (
    <div id="wd-quizzes" className="container mt-4">
      <button 
        className="btn btn-primary mb-3"
        onClick={handleAddQuiz}
      >
        Add Quiz
      </button>

      {/* The Header thing that says Quizzes */}
      <div className="card mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h3 id="wd-quizzes-title" className="mb-0">
            Quizzes
          </h3>
        </div>
      </div>

      {/* List of quizzes / for each quiz... */}
      <ul id="wd-quizzes-list" className="list-group">
        {quizzes
          // .filter((quiz: any) => quiz.course === cid)
          .map((quiz: any) => (
            <li
              key={quiz._id}
              className="wd-quizzes-list-item list-group-item p-3 mb-3 border border-secondary rounded-3 bg-white d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center flex-grow-1 text-black">
                {!quiz.editing && quiz.name}

                {quiz.editing && (
                  <input
                    className="form-control w-50 d-inline-block"
                    value={quiz.name}
                    onChange={(e) =>
                      saveQuizzes({ ...quiz, name: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveQuizzes({ ...quiz, editing: false });
                      }
                    }}
                  />
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}