import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    console.log("Fetching profile...");
    try {
      const currentUser = await client.profile();
      console.log("Profile fetched successfully:", currentUser);
      dispatch(setCurrentUser(currentUser));
    } catch (err: any) {
      console.error("Error fetching profile:", err);
    }
    setPending(false);
    console.log("Set pending to false");
  };

  useEffect(() => {
    console.log("Session component mounted");
    fetchProfile();
  }, []);

  if (!pending) {
    console.log("Rendering children");
    return children;
  } else {
    console.log("Profile is still pending...");
    return null; 
  }
}
