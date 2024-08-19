import axios from "axios";
import { Question } from "../../types"

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const deleteQuiz = async (courseId: string, quizId: string) => {
  try {
    const response = await axios.delete(`${COURSES_API}/${courseId}/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting quiz with ID: ${quizId} for course ID: ${courseId}`, error);
    throw error;
  }
};

export const createQuiz = async (courseId: string, quiz: any) => {
  try {
    console.log("CREATE QUIZ")
    const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
    return response.data;
  } catch (error) {
    console.error(`Error creating quiz for course ID: ${courseId}`, error);
    throw error;
  }
};

export const findQuizzesForCourse = async (courseId: string) => {
  try {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
  } catch (error) {
    console.error(`Error finding quizzes for course ID: ${courseId}`, error);
    throw error;
  }
};


export const saveQuiz = async (courseId: string, quiz: any) => {
  try {
    const response = await updateQuiz(courseId, quiz);
    return response;
  } catch (error) {
    console.error(`Error saving quiz with ID: ${quiz._id} for course ID: ${courseId}`, error);
    throw error;
  }
};

export const getQuiz = async (cid: string, qid: string) => {
  try {
    const url = `${COURSES_API}/${cid}/quizzes/${qid}`;
    
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    throw new Error('Failed to fetch quiz data.');
  }
};

export const updateQuiz = async (cid: string, quiz: any) => {
  console.log("CLIENT.TS UPDATEQUIZ")
  console.log(quiz)
  try {
    const qid = quiz._id.toString();
    const response = await axios.put(`${COURSES_API}/${cid}/quizzes/${qid}`, quiz);
    return response.data;
  } catch (error) {
    console.error(`Error updating quiz with ID: ${quiz._id} for course ID: ${cid}`, error);
    throw error;
  }
};

export const fetchQuizById = async (cid: string, qid: string) => {
  console.log("in fetchQuizById");
  try {
    const response = await fetch(`/api/courses/${cid}/quizzes/${qid}`);

    if (!response.ok) {
      throw new Error(`Error fetching quiz with ID ${qid}: ${response.statusText}`);
    }

    const data = await response.json(); 

    console.log(data);
    
    return data;
  } catch (error) {
    console.error('Error fetching quiz:', error);
    throw error;
  }
};
