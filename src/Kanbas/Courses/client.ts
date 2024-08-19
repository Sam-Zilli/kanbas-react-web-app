import axios from 'axios';
import * as usersClient from "./People/client";
import { Course } from "../types"
import * as peopleClient from "./People/client";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
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


export const fetchUsersCourses = async (userId: string) => {
  const url = `${USERS_API}/courses/${userId}`;
  try {
    const { data: userCourses } = await axios.get(url);
    const allCourses = await fetchAllCourses();
    const selectedCourses = allCourses.filter((course: Course) => 
      userCourses.includes(course.number)
    );

    return selectedCourses;

  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};


export const createCourse = async (course: any, currentUser: any) => {
  try {
    const newCourseResponse = await axios.post(COURSES_API, course);
    const newCourse = newCourseResponse.data;
    const updatedCourses = [...currentUser.courses, newCourse.number];
    const updatedCurrentUser = {
      ...currentUser,
      courses: updatedCourses
    };

    await usersClient.updateUser(updatedCurrentUser);

    const allCourses = await fetchAllCourses();
    const filteredCourses = allCourses.filter((c: any) => updatedCurrentUser.courses.includes(c.number));

    return filteredCourses;

  } catch (error) {
    console.error("Error creating course or updating user:", error);
    throw error;
  }
};

export const deleteCourse = async (id: string) => {
  try {
    const { data: deletedCourse } = await axios.get(`${COURSES_API}/${id}`);
    const deletedCourseNumber = deletedCourse.number;

    await axios.delete(`${COURSES_API}/${id}`);

    const { data: users } = await axios.get(USERS_API);

    const updateUserPromises = users.map(async (user: any) => {
      const updatedCourses = user.courses.filter((number: string) => number !== deletedCourseNumber);

      if (updatedCourses.length !== user.courses.length) {
        const updatedUser = {
          ...user,
          courses: updatedCourses
        };
        await usersClient.updateUser(updatedUser);
      }
    });
    await Promise.all(updateUserPromises);

    return deletedCourse;
  } catch (error) {
    console.error('Error deleting course or updating users:', error);
    throw error;
  }
};

export const updateCourse = async (course: any) => {

  try {

    const response = await axios.put(`${COURSES_API}/${course._id}`, course);

    return response.data;
  } catch (error) {

    throw error;
  }
};



export const fetchUserById = async (userId: string) => {
  const url = `${USERS_API}/${userId}`;
  try {
    const { data } = await axios.get(url);

    return data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

export const enrollInCourse = async (courseId: string, uid: string) => {
  try {
    console.log("In enrollInCourse");


    const userResponse = await axios.get(`${USERS_API}/${uid}`);
    const user = userResponse.data;
    console.log("User Data: ", user);

    const courseResponse = await axios.get(`${COURSES_API}/${courseId}`);
    const course = courseResponse.data;
    console.log("Course Data: ", course);

    const isCourseAlreadyEnrolled = user.courses && user.courses.includes(course.number);
    if (isCourseAlreadyEnrolled) {
      console.log("User is already enrolled in this course");
      return { success: false, message: "Already enrolled in this course." };
    }

    const updatedUser = {
      ...user,
      courses: user.courses ? [...user.courses, course.number] : [course.number],
    };

    console.log("Updated User: ", updatedUser);


    const updatedUserResponse = await peopleClient.updateUser(updatedUser);
    console.log("Updated User Response: ", updatedUserResponse);

    return { success: true, message: "Successfully enrolled in the course." };
  } catch (error) {
    console.error('Failed to enroll in course:', error);

    const errorMessage = (error as Error).message || 'An unknown error occurred.';
    return { success: false, message: errorMessage };
  }
};