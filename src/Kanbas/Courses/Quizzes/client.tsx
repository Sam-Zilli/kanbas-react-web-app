import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// Function to delete a quiz
export const deleteQuiz = async (courseId: string, quizId: string) => {
  try {
    const response = await axios.delete(`${COURSES_API}/${courseId}/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting quiz with ID: ${quizId} for course ID: ${courseId}`, error);
    throw error;
  }
};

// Function to create a new quiz
export const createQuiz = async (courseId: string, quiz: any) => {
  try {
    const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
    return response.data;
  } catch (error) {
    console.error(`Error creating quiz for course ID: ${courseId}`, error);
    throw error;
  }
};

// Function to find quizzes for a specific course
export const findQuizzesForCourse = async (courseId: string) => {
  try {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
  } catch (error) {
    console.error(`Error finding quizzes for course ID: ${courseId}`, error);
    throw error;
  }
};


// Wrapper function to update a quiz
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
    // Construct the URL for fetching the quiz
    const url = `${COURSES_API}/${cid}/quizzes/${qid}`;
    
    // Make the HTTP GET request
    const response = await axios.get(url);
    // Return the quiz data
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    throw new Error('Failed to fetch quiz data.');
  }
};

// Function to update an existing quiz
export const updateQuiz = async (cid: string, quiz: any) => {
  try {
    const qid = quiz._id.toString();
    const response = await axios.put(`${COURSES_API}/${cid}/quizzes/${qid}`, quiz);
    return response.data;
  } catch (error) {
    console.error(`Error updating quiz with ID: ${quiz._id} for course ID: ${cid}`, error);
    throw error;
  }
};
