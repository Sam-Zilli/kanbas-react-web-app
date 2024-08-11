import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const signup = async () => {
    try {
      console.log("Before await");
      await client.signup(user);
      console.log("After await");
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      console.error("Signup error:", err); // Log the error for debugging
      setError(err.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="wd-signup-screen">
      <h1>Sign up</h1>
      {error && <div className="wd-error alert alert-danger">{error}</div>}
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
      <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2">
        {" "}
        Sign up{" "}
      </button>
      <br />
      <Link to="/Kanbas/Account/Signin" className="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}
