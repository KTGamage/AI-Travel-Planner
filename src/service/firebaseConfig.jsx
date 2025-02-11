// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkll5TLce9fRcWMvhTHCC8PMN0UsYLyz0",
  authDomain: "ai-travel-planner-9dafe.firebaseapp.com",
  projectId: "ai-travel-planner-9dafe",
  storageBucket: "ai-travel-planner-9dafe.firebasestorage.app",
  messagingSenderId: "974301831607",
  appId: "1:974301831607:web:2afd98cf389b3e22974832",
  measurementId: "G-4XKGDPW88L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);