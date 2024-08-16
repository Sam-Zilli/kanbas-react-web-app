import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const deleteQuiz = async (quizId: string) => {
    try {
  
      const response = await axios.delete(`${COURSES_API}/${quizId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting module with ID: ${quizId}`, error);
      throw error; 
    }
  };

  export const createQuiz = async (courseId: string, quiz: any) => {
    try {
        const response = await axios.post(
            `${COURSES_API}/${courseId}/quizzes`,
            quiz
        );
        return response.data
    } catch (error) {
        console.log(`Error creating quiz for course ID: ${courseId}`, error);
        throw error;
    }
  }


export const findQuizzesForCourse = async (courseId: string) => {
    try {

      const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  
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

