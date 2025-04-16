// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw5W3PQ4CzXq1jfscjVs2glLBmH_QLSi8",
  authDomain: "social-media-6e8bb.firebaseapp.com",
  projectId: "social-media-6e8bb",
  storageBucket: "social-media-6e8bb.firebasestorage.app",
  messagingSenderId: "313316675936",
  appId: "1:313316675936:web:693197a95b6bf85ff5ce05",
  measurementId: "G-NF2V9LM6DB" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)