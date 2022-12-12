import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import Avatar from "../avatar.png";
import { AuthContext } from "../context/AuthContext";
import "./Register.css";
import CloseIcon from "@mui/icons-material/Close";
import { deleteUser, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router";

function UserSetting() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleUserChange = (e) => {
    e.preventDefault();
    console.log("coming");
    let modifyDisplayName = e.target[0].value;
    let modifyFile = e.target[1].files[0];
    if (modifyDisplayName === "") {
      modifyDisplayName = currentUser.displayName;
    }
    if (modifyFile === undefined) {
      modifyFile = currentUser.photoURL;
    }
    const storageRef = ref(storage, modifyDisplayName);
    const uploadTask = uploadBytesResumable(storageRef, modifyFile);
    uploadTask.on(
      (error) => {
        alert("an error occured. Try Again");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            displayName: modifyDisplayName,
            photoURL: downloadURL,
          })
            .then(() => {})
            .catch((error) => {
              alert("an error occured. Try Again");
              return;
            });
        });
      }
    );
  };
  const return_to_home = () => {
    try {
      navigate("/");
    } catch (err) {
      alert("an error occured");
    }
  };
  const delete_account = () => {
    deleteUser(auth.currentUser)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        error("an error occured");
        return;
      });
  };
  return (
    <>
      <div className="formContainer">
        <div className="close_icon" onClick={return_to_home}>
          <CloseIcon className="close_icon" />
        </div>
        <div className="formWrapper user_setting">
          <span className="logo_name user_setting_head">Edit Profile</span>
          <label className="default_set" htmlFor="user_setting_file">
            <img
              className="default_image user_setting_img"
              src={currentUser.photoURL}
              alt="profile"
            />
            <div>Change Profile Picture</div>
          </label>
          <form className="name_change" action="" onSubmit={handleUserChange}>
            <input
              className="user_setting_name"
              type="text"
              placeholder={currentUser.displayName}
            />
            <input className="choseFile" type="file" id="user_setting_file" />
            <Button type="submit" variant="contained">
              Save
            </Button>
            <Button
              className="user_setting_discard"
              variant="contained"
              onClick={delete_account}
            >
              Delete Account
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserSetting;
