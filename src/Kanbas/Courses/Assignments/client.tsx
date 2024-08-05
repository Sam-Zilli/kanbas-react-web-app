import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
const MODULES_API = `${REMOTE_SERVER}/api/assignments`;

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const createAssignment = async (assignmentId: string, module: any) => {
  const response = await axios.post(
    `${MODULES_API}/${assignmentId}/assignments`,
    module
  );
  return response.data;
};

export const findAssignmentsForModule = async (assignmentId: string) => {
  const response = await axios.get(
    `${MODULES_API}/${assignmentId}/assignments`
  );
  return response.data;
};

export const updateAssignment = async (assignment: any) => {
  const response = await axios.put(`${ASSIGNMENTS_API}/${module.id}`, module);
  return response.data;
};