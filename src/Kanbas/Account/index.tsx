import { Routes, Route } from "react-router-dom";
import Signin from "./Signin";
import AccountNavigation from "./Navigation";
import Profile from "./Profile";
import Signup from "./Signup";

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
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
