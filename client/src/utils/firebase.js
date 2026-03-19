
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "shriai-b0cc7.firebaseapp.com",
  projectId: "shriai-b0cc7",
  storageBucket: "shriai-b0cc7.firebasestorage.app",
  messagingSenderId: "660553150504",
  appId: "1:660553150504:web:a08d7b921cf4cb5065851d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}