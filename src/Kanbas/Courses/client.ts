import axios from 'axios';
import * as usersClient from "./People/client";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
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

// Create a new course and update the current user's course list
export const createCourse = async (course: any, currentUser: any) => {
  try {
    // Step 1: Create the new course
    const newCourseResponse = await axios.post(COURSES_API, course);
    const newCourse = newCourseResponse.data;

    // Step 2: Update the current user's courses list
    const updatedCourses = [...currentUser.courses, newCourse.number];
    console.log("Updated Courses (should include new one?): ", updatedCourses)
    
    // Create an updated user object
    const updatedCurrentUser = {
      ...currentUser,
      courses: updatedCourses
    };

    // Step 3: Update the user in the database
    await usersClient.updateUser(updatedCurrentUser);


    // Step 4: Fetch all courses and filter based on the user's course list
    const allCourses = await fetchAllCourses();
    const filteredCourses = allCourses.filter((c: any) => updatedCurrentUser.courses.includes(c.number));

    return filteredCourses;

  } catch (error) {
    console.error("Error creating course or updating user:", error);
    throw error;
  }
};

// Delete a course by ID and update all users' course lists
export const deleteCourse = async (id: string) => {
  try {
    // Step 1: Fetch the course to get the course number
    const { data: deletedCourse } = await axios.get(`${COURSES_API}/${id}`);
    const deletedCourseNumber = deletedCourse.number;

    // Step 2: Delete the course
    await axios.delete(`${COURSES_API}/${id}`);

    // Step 3: Fetch all users
    const { data: users } = await axios.get(USERS_API);

    // Step 4: Update each user's course list
    const updateUserPromises = users.map(async (user: any) => {
      const updatedCourses = user.courses.filter((number: string) => number !== deletedCourseNumber);

      if (updatedCourses.length !== user.courses.length) {
        // Only update if there is a change
        const updatedUser = {
          ...user,
          courses: updatedCourses
        };
        await usersClient.updateUser(updatedUser);
      }
    });

    // Wait for all user updates to complete
    await Promise.all(updateUserPromises);

    return deletedCourse;
  } catch (error) {
    console.error('Error deleting course or updating users:', error);
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


export const findCoursesByIds = async (courseNumbers: [String]) => {
  return ""
}
