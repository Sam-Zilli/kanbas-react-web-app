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
  console.log("client.tsx 1")
  try {
    console.log("Going to: ",`${COURSES_API}/${courseId}/quizzes`)
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    console.log("client.tsx 2")
    return response.data;
  } catch (error) {
    console.error(`Error finding quizzes for course ID: ${courseId}`, error);
    throw error;
  }
};

// Function to update an existing quiz
export const updateQuiz = async (courseId: string, quiz: any) => {
  try {
    const quizId = quiz._id.toString();
    const response = await axios.put(`${COURSES_API}/${courseId}/quizzes/${quizId}`, quiz);
    return response.data;
  } catch (error) {
    console.error(`Error updating quiz with ID: ${quiz._id} for course ID: ${courseId}`, error);
    throw error;
  }
};


// import axios from "axios";

// const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
// const COURSES_API = `${REMOTE_SERVER}/api/courses`;
// const QUIZZES_API = `${COURSES_API}/:cid/quizzes`;


// export const deleteQuiz = async (quizId: string) => {
//     try {
  
//       const response = await axios.delete(`${COURSES_API}/${quizId}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error deleting module with ID: ${quizId}`, error);
//       throw error; 
//     }
//   };

//   export const createQuiz = async (courseId: string, quiz: any) => {
//     try {
//         const response = await axios.post(
//             `${COURSES_API}/${courseId}/quizzes`,
//             quiz
//         );
//         return response.data
//     } catch (error) {
//         console.log(`Error creating quiz for course ID: ${courseId}`, error);
//         throw error;
//     }
//   }


// export const findQuizzesForCourse = async (courseId: string) => {
//     try {
//       console.log("Before axios call")
//       const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
//       console.log("After axios call")
//       return response.data;
//     } catch (error) {
//       console.error(`Error finding quizzes for course ID: ${courseId}`, error);
//       throw error; 
//     }

//   };

//     export const updateQuiz = async (quiz: any) => {
//         try {
      
//           const quizId = quiz._id.toString(); 
//           const response = await axios.put(`${COURSES_API}/${quizId}`, quiz);
      
//           return response.data;
//         } catch (error) {
//           console.error(`Error updating quiz with ID: ${quiz._id}`, error);
//           throw error; 
//       };
//     }

