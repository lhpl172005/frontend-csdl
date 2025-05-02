// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIPLP9xKsQH3dTD5KbQlNbu7ar_baJtWE",
  authDomain: "frontend-csdl.firebaseapp.com",
  projectId: "frontend-csdl",
  storageBucket: "frontend-csdl.firebasestorage.app",
  messagingSenderId: "618780983286",
  appId: "1:618780983286:web:49d06d596c5fd2477a51d7",
  measurementId: "G-1L9PSX9847"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);