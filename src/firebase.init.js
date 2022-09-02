// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5QMAHHwg8KmUmauKK4CyjI5lFZiYUihk",
  authDomain: "email-password-auth-d2f6e.firebaseapp.com",
  projectId: "email-password-auth-d2f6e",
  storageBucket: "email-password-auth-d2f6e.appspot.com",
  messagingSenderId: "818324449094",
  appId: "1:818324449094:web:63c08d73aa26e2c13e2747"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;