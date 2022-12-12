import React, { useState } from "react";
import "./Register.css";
import Button from "@mui/material/Button";
import Avatar from "../avatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    let file = e.target[3].files[0];
    if (file === undefined) {
      alert("choose profile photo");
      return;
    }
    if (displayName === "") {
      alert("enter name");
      return;
    }
    if (email === "") {
      alert("enter email");
      return;
    }
    if (password.length < 8) {
      alert("password should be more than 7 characters");
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // storage start

      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (err) => {
          setErr(true);
          return;
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );

      // storage end
    } catch (err) {
      setErr(true);
      return;
    }
  };
  return (
    <>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo_name">Chat App</span>
          <span className="title">Register</span>
          <form action="" onSubmit={handleSubmit}>
            <label className="default_set" htmlFor="file">
              <img className="default_image" src={Avatar} alt="profile" />
              <div>Add Profile Picture</div>
            </label>
            <input type="text" placeholder="name" />
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" id="myPassword" />
            <input className="choseFile" type="file" id="file" />
            <Button type="submit" variant="contained">
              sign up
            </Button>
            {err && <div className="err_message">Something went wrong</div>}
          </form>
          <p>
            You have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
