import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
const MODULES_API = `${REMOTE_SERVER}/api/assignments`;

export const deleteModule = async (moduleId: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${moduleId}`);
  return response.data;
};

export const createModule = async (assignmentId: string, module: any) => {
  const response = await axios.post(
    `${MODULES_API}/${assignmentId}/assignments`,
    module
  );
  return response.data;
};

export const findModulesForCourse = async (assignmentId: string) => {
  const response = await axios.get(
    `${MODULES_API}/${assignmentId}/assignments`
  );
  return response.data;
};

export const updateModule = async (module: any) => {
  const response = await axios.put(`${ASSIGNMENTS_API}/${module._id}`, module);
  return response.data;
};