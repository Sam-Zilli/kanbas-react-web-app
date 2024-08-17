import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfile = useCallback(async () => {
    try {
      const account = await client.profile();
      const dob = account.dob ? new Date(account.dob).toISOString().split('T')[0] : '';
      setProfile({ ...account, dob });
    } catch (err) {
      console.error("Fetch profile error:", err);
      navigate("/Kanbas/Account/Signin");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const signout = async () => {
    try {
      await client.signout();
      dispatch(setCurrentUser(null));
      navigate("/Kanbas/Account/Signin");
    } catch (err) {
      console.error("Signout error:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Profile</h1>
      {profile && (
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input 
              id="username"
              className="form-control"
              value={profile.username}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              id="password"
              className="form-control"
              value={profile.password}
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
              type="password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input 
              id="firstName"
              className="form-control"
              value={profile.firstName}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input 
              id="lastName"
              className="form-control"
              value={profile.lastName}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dob" className="form-label">Date of Birth</label>
            <input 
              id="dob"
              className="form-control"
              value={profile.dob}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
              placeholder="Date of Birth"
              type="date"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              id="email"
              className="form-control"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select 
              id="role"
              className="form-select"
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            >
              <option value="" disabled>Select Role</option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>
          <button 
            type="button" 
            onClick={signout} 
            className="btn btn-danger w-100"
          >
            Sign out
          </button>
        </form>
      )}
    </div>
  );
}