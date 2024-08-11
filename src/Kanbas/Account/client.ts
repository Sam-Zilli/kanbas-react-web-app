import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const signin = async (credentials: any) => {
  console.log("signin client 0")
  const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
  console.log("signin client 1")
  console.log("response is: ", response.data)
  return response.data;
};

export const profile = async () => {
  console.log("client.ts profile 0");
  try {
    console.log("client.ts try")
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    console.log("Response status:", response.status);
    console.log("client.ts profile 1");
    return response.data;
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw error; 
  }
}


export const signup = async (user: any) => {
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};