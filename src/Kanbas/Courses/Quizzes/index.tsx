import { useState, useEffect } from "react";
import * as client from "./client";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import {
    setQuizzes,
    addQuiz,
    editQuiz,
    updateQuiz,
    deleteQuiz
  } from "./reducer";

export default function Quizzes() {
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
        const status = await client.updateQuiz(quiz);
        dispatch(updateQuiz(quiz));
      };
    
      return (
        <div id="wd-quizzes" className="container mt-4">
    
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
    