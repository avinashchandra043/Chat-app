import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2yk_5PP7kJExvD8HYzU_8-4d2qw_c-4w",
  authDomain: "chat-app-49bee.firebaseapp.com",
  projectId: "chat-app-49bee",
  storageBucket: "chat-app-49bee.appspot.com",
  messagingSenderId: "326556950885",
  appId: "1:326556950885:web:b855221fab81ad129e418c",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
