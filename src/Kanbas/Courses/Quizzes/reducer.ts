import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";


const SAVE_QUIZ = "SAVE_QUIZ";
const PUBLISH_QUIZ = "PUBLISH_QUIZ";


export const saveQuiz = (quizData: any) => ({
  type: SAVE_QUIZ,
  payload: quizData,
});

export const publishQuiz = (quizData: any) => ({
  type: PUBLISH_QUIZ,
  payload: quizData,
});


const initialState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {

    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },

    addQuiz: (state, { payload: quiz }) => {

      const newQuiz: any = {
        _id: new Date().getTime().toString(), 
        questions: [],
        name: quiz.name,
        course: quiz.course,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },

    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId);
    },

    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      ) as any;
    },

    editQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizId ? { ...q, editing: true } : q
      ) as any;
    },

  },
});

export const { setQuizzes, addQuiz, updateQuiz, deleteQuiz, editQuiz } = quizzesSlice.actions; 
export default quizzesSlice.reducer;