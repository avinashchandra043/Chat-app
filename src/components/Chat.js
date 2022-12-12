import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import Button from "@mui/material/Button";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { ChatContext } from "../context/ChatContext";

function Chat() {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <div className="user_info">
          <div className="user_info_name">{data.user?.displayName}</div>
          {data.user?.displayName && (
            <div className="user_info_status">offline</div>
          )}
        </div>
        <div>
          <Button variant="contained" onClick={() => signOut(auth)}>
            logout
          </Button>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
