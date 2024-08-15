import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfile = useCallback(async () => {
    try {
      const account = await client.profile();
      // Convert date to yyyy-MM-dd
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
    return <div>Loading...</div>;
  }

  return (
    <div className="wd-profile-screen">
      <h1>Profile</h1>
      {profile && (
        <div>
          <input className="wd-username" value={profile.username}
                 onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
          <input className="wd-password" value={profile.password}
                 onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
          <input className="wd-firstname" value={profile.firstName}
                 onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
          <input className="wd-lastname" value={profile.lastName}
                 onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
          <input className="wd-dob" value={profile.dob}
                 onChange={(e) => setProfile({ ...profile, dob: e.target.value })} type="date" />
          <input className="wd-email" value={profile.email}
                 onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          <select className="wd-role" value={profile.role}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <button onClick={signout} className="wd-signout-btn btn btn-danger w-100">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
