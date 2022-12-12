import React, { useContext, useState } from "react";
import Pin from "../pin.png";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Sent from "../sent.mp3";

function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const handleSend = async (e) => {
    e.preventDefault();
    const audio = new Audio(Sent);
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (err) => {
          setErr(true);
          return;
        },
        () => {
          audio.play();
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      if (text !== "") {
        audio.play();
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }
    }
    if (text !== "") {
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    }
    setText("");
    setImg(null);
  };
  return (
    <form action="" className="input" onSubmit={handleSend}>
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      {/* <div className="send"> */}
      <input
        type="file"
        id="file1"
        onChange={(e) => setImg(e.target.files[0])}
        style={{ display: "none" }}
      />
      <label htmlFor="file1">
        <img className="img_pin" src={Pin} alt="add" />
      </label>
      <Button
        type="submit"
        variant="contained"
        endIcon={<SendIcon />}
        onClick={handleSend}
      >
        Send
      </Button>
      {/* </div> */}
    </form>
  );
}

export default Input;
