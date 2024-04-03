import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX9NCOymzRNWqY0uW-Zy4PY7yMDxKR6fg",
  authDomain: "user-email-password-auth-7c896.firebaseapp.com",
  projectId: "user-email-password-auth-7c896",
  storageBucket: "user-email-password-auth-7c896.appspot.com",
  messagingSenderId: "380560305391",
  appId: "1:380560305391:web:e8b32ab0d3a7da24f5bf1a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// export default app;
export default auth;
