import axios from "axios";
import { Assignment } from "../../types";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
const MODULES_API = `${REMOTE_SERVER}/api/assignments`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const createAssignment = async (cid: string, assignment: any) => {
  const response = await axios.post(
    `${MODULES_API}/${assignment.course}/assignments`,
    module
  );
  return response.data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const updateAssignment = async (assignment: Assignment) => {
  const response = await axios.put(`${ASSIGNMENTS_API}/${module.id}`, module);
  return response.data;
};