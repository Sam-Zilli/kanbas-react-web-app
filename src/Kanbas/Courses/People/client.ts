import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const findAllUsers = async () => {
  const response = await axios.get(USERS_API);
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await
    axios.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await axios.get(`${USERS_API}?name=${name}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
};


export const deleteUser = async (userId: string) => {
  const response = await axios.delete(`${USERS_API}/${userId}`);
  return response.data;
};

export const updateUser = async (user: any) => {
  console.log("Before user update: ", user)
  const response = await axios.put(`${USERS_API}/${user._id}`, user);
  console.log(response)
  return response.data;
};


export const createUser = async (user: any) => {
  const response = await axios.post(`${USERS_API}`, user);
  return response.data;
};

export const findUsersForCourse = async (courseId: string) => {
  try {

    const response = await axios.get(`${COURSES_API}/${courseId}/users`);

    return response.data;
  } catch (error) {
    console.error(`Error finding users for course ID: ${courseId}`, error);
    throw error; 
  }
};