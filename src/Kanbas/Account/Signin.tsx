import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const signin = async () => {
    try {
      console.log("signin0")
      const currentUser = await client.signin(credentials);
      console.log("signin1") 
      console.log("Current user: ", currentUser)
      dispatch(setCurrentUser(currentUser));
      console.log("signin2")
      navigate("/Kanbas/Account/Profile");
      console.log("signin3")
    } catch (err: any) {
      console.log("signin ERORR")
      setError(err.response.data.message);
    }
  };


  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      {error && <div className="wd-error alert alert-danger">{error}</div>}
      <input id="wd-username" onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        value={credentials.username} className="form-control mb-2" placeholder="username" />
      <input id="wd-password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value }) }
        value={credentials.password} className="form-control mb-2" placeholder="password" type="password" />
      <button id="wd-signin-btn" onClick={signin} className="btn btn-primary w-100"> Sign in </button>
      <br />
      <Link id="wd-signup-link" to="/Kanbas/Account/Signup">Sign up</Link>
    </div>
  );
}


