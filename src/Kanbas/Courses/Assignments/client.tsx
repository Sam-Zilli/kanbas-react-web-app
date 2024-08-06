import axios from "axios";
import { Assignment } from "../../types";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const createAssignment = async (assignment: Omit<Assignment, '_id'>) => {
  try {
    // Log the assignment data being sent
    console.log("Creating assignment with data:", assignment);

    const response = await axios.post(
      `${COURSES_API}/${assignment.course}/assignments`,
      assignment
    );

    // Log the response from the server
    console.log("Response from server:", response);

    return response.data;
  } catch (error) {
    // Log any error that occurs
    console.error("Error creating assignment:", error);

    // Optionally rethrow or handle the error
    throw error;
  }
};


export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const updateAssignment = async (assignment: Assignment) => {
  const response = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return response.data;
};