import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./Signin";
import AccountNavigation from "./Navigation";
import { useSelector } from "react-redux";
export default function Account() {
  return (
    <div className="wd-account-screen">
      <div className="d-flex">
        <div className="d-none d-md-block">
          <AccountNavigation />
        </div>
        <div className="flex-fill p-4 pt-0">
          <Routes>
          <Route path="/Account/*" element={<Account />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Signup" element={<h1>Sign Up</h1>} />
            <Route path="/Profile" element={<h1>Profile</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
