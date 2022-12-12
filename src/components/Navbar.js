import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleEditUser = async () => {
    try {
      navigate("/edit");
    } catch (err) {
      alert("an error occured");
      return;
    }
  };
  return (
    <div className="navbar">
      <div className="user">
        <img
          className="way_to_user_setting"
          src={currentUser.photoURL}
          alt=""
          onClick={handleEditUser}
        />
        <span>{currentUser.displayName}</span>
      </div>
      <span className="logo"></span>
    </div>
  );
}

export default Navbar;
