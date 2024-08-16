import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;


export const findQuizzesForCourse = async (courseId: string) => {
    try {

      const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  
      return response.data;
    } catch (error) {
      console.error(`Error finding quizzes for course ID: ${courseId}`, error);
      throw error; 
    }

  };

    export const updateQuiz = async (quiz: any) => {
        try {
      
          const quizId = quiz._id.toString(); 
          const response = await axios.put(`${COURSES_API}/${quizId}`, quiz);
      
          return response.data;
        } catch (error) {
          console.error(`Error updating quiz with ID: ${quiz._id}`, error);
          throw error; 
      };
    }

