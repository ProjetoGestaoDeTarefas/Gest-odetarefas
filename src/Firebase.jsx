// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6MUa7DFTUCJ3F0Vn3tmjT4308J3e-ydw",
  authDomain: "task-manager-g1-d3.firebaseapp.com",
  projectId: "task-manager-g1-d3",
  storageBucket: "task-manager-g1-d3.appspot.com",
  messagingSenderId: "159822976823",
  appId: "1:159822976823:web:3290e60d782dbb54b9acb2",
  measurementId: "G-VW0K0N5GHV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export {db};