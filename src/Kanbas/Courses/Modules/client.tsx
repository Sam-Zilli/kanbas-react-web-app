import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

export const deleteModule = async (moduleId: string) => {
  try {

    const response = await axios.delete(`${MODULES_API}/${moduleId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting module with ID: ${moduleId}`, error);
    throw error; 
  }
};

export const createModule = async (courseId: string, module: any) => {
  try {

    const response = await axios.post(
      `${COURSES_API}/${courseId}/modules`,
      module
    );

    return response.data;
  } catch (error) {
    console.error(`Error creating module for course ID: ${courseId}`, error);
    throw error; 
  }
};

export const findModulesForCourse = async (courseId: string) => {
  try {

    const response = await axios.get(`${COURSES_API}/${courseId}/modules`);

    return response.data;
  } catch (error) {
    console.error(`Error finding modules for course ID: ${courseId}`, error);
    throw error; 
  }
};

export const updateModule = async (module: any) => {
  try {

    const moduleId = module._id.toString(); 
    const response = await axios.put(`${MODULES_API}/${moduleId}`, module);

    return response.data;
  } catch (error) {
    console.error(`Error updating module with ID: ${module._id}`, error);
    throw error; 
};
}