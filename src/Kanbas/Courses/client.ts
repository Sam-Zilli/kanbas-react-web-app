import axios from 'axios';

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// Fetch all courses
export const fetchAllCourses = async () => {
  try {
    const { data } = await axios.get(COURSES_API);
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Create a new course
export const createCourse = async (course: any) => {
  try {

    const response = await axios.post(COURSES_API, course);

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a course by ID
export const deleteCourse = async (id: string) => {
  try {
    //console.log("Sending request to delete course with ID:", id);
    const response = await axios.delete(`${COURSES_API}/${id}`);
    //console.log("Course deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    //console.error('Error deleting course:', error);
    throw error;
  }
};

// Update a course
export const updateCourse = async (course: any) => {
  //console.log("Starting updateCourse");
  try {
    //console.log("Updating course with data:", course);
    const response = await axios.put(`${COURSES_API}/${course._id}`, course);
    //console.log("Course updated successfully:", response.data);
    return response.data;
  } catch (error) {
    //console.error('Error updating course:', error);
    throw error;
  }
};