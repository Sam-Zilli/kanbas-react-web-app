import axios from "axios";
import { User } from "../types"
import * as peopleClient from "../Courses/People/client";


const axiosWithCredentials = axios.create({ withCredentials: true });


export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
  return response.data;
};

export const profile = async () => {

  try {

    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);


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

// pass in a user
export const updateProfile = async (profileData: User) => {
  // // console.log("UpdateProfile: ", profileData)
  peopleClient.updateUser(profileData)
}
