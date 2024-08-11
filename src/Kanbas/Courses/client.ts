import axios from 'axios';

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchAllCourses = async () => {
  try {
    const { data } = await axios.get(COURSES_API);
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const createCourse = async (course: any) => {
  try {
    console.log("Testing adding course 1")
    const response = await axios.post(COURSES_API, course);
    console.log("Testing adding course 2")
    return response.data;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

export const deleteCourse = async (id: string) => {
  try {
    const response = await axios.delete(`${COURSES_API}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

export const updateCourse = async (course: any) => {
  try {
    console.log("Testing UPDATE course 1")
    console.log("Course: ", course)
    const response = await axios.put(`${COURSES_API}/${course._id}`, course);
    console.log("Testing UPDATE course 2")
    return response.data;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};
  