import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { doLogin } from "../redux/action/authAction";
import "./LoginPage.css";
// import { Link } from 'react-router-dom'

function LoginPage() {
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const handleFormData = (e) => {
    e.preventDefault();
    let newUserData = { email, password };
    console.log("final obj", newUserData);
    dispatch(doLogin(newUserData));
  };
  return (
    <div className="loginpage">
      <h2 className="Heading">Login</h2>
      <br></br>
      <form>
        <div className="inputfields">
          <div>
            <label>Email</label>

            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <br></br>
          <div>
            <label>Password</label>

            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <br></br>
          </div>
          <p className="forget">
            <a href="/signup">forget password?</a>
          </p>
          <br></br>
          <button onClick={handleFormData} className="loginBtn">
            <a href="/todos">Login</a>
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;