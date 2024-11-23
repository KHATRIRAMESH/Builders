// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "builder-s-blog.firebaseapp.com",
  projectId: "builder-s-blog",
  storageBucket: "builder-s-blog.firebasestorage.app",
  messagingSenderId: "1085524766661",
  appId: "1:1085524766661:web:7be7a2715698eb61efa5ac",
  measurementId: "G-FQ064EXD4S",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
