import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBubslpC_YUMR1eM6sd6aGPu3tc-j9N2Ic",
  authDomain: "twitter-reloaded-8a039.firebaseapp.com",
  projectId: "twitter-reloaded-8a039",
  storageBucket: "twitter-reloaded-8a039.appspot.com",
  messagingSenderId: "302071525745",
  appId: "1:302071525745:web:b9a116d6f1793e50e1c6d0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);