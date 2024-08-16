import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [user, setUser] = useState({ username: "", password: "", role: "" });
  const [error, setError] = useState<string | null>(null);
  const [roleError, setRoleError] = useState<string | null>(null); // Error thrown if no role is chosen
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async () => {
    // Makes sure that a role is selected
    if (!user.role) {
      setRoleError("Please select a role.");
      return;
    }

    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="wd-signup-screen">
      <h1>Sign up</h1>
      {error && <div className="wd-error alert alert-danger">{error}</div>}{" "}
      {/* Display general error */}
      {roleError && (
        <div className="wd-error alert alert-danger">{roleError}</div>
      )}{" "}
      {/* Display role error */}
      <input
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username form-control mb-2"
        placeholder="username"
      />
      <input
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="password"
        className="wd-password form-control mb-2"
        placeholder="password"
      />
      <select
        value={user.role}
        onChange={(e) => {
          setUser({ ...user, role: e.target.value });
          setRoleError(null); // Clear role error when user selects a role
        }}
        className="wd-role form-control mb-2"
      >
        <option value="">Select role...</option>
        <option value="STUDENT">Student</option>
        <option value="FACULTY">Faculty</option>
      </select>
      <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2">
        Sign up
      </button>
      <br />
      <Link to="/Kanbas/Account/Signin" className="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}
