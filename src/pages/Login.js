import React, { useState } from "react";
import "./Register.css";
import Button from "@mui/material/Button";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  // register page copy start

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(auth);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  // register page copy end

  return (
    <>
      <div className="formContainer">
        <div className="formWrapper login_page">
          <span className="logo_name">Chat App</span>
          <span className="title">Login</span>
          <form action="" onSubmit={handleSubmit}>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <Button type="submit">sign in</Button>
          </form>
          <p>
            You don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
        {err && <div className="err_message">Something went wrong</div>}
      </div>
    </>
  );
}

export default Login;
