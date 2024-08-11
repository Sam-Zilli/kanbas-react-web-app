import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const signup = async () => {
    console.log("in signup 0")
    try {
      console.log("in signup 1")
      const currentUser = await client.signup(user);
      console.log("in signup 2")
      dispatch(setCurrentUser(currentUser));
      navigate("/Kanbas/Account/Profile");
      console.log("in signup 3")
  } catch (err: any) {
    console.log("signup ERROR")
    setError(err.response.data.message);
  }

  };
  return (
    <div className="wd-signup-screen">
      <h1>Sign up</h1>
      {error && <div className="wd-error alert alert-danger">{error}</div>}
      <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
             className="wd-username form-control mb-2" placeholder="username" />
      <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password"
             className="wd-password form-control mb-2" placeholder="password" />
      <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2"> Sign up </button><br />
      <Link to="/Kanbas/Account/Signin" className="wd-signin-link">Sign in</Link>
    </div>
  );
}
