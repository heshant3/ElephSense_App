// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwOa5nhadH8w0y85CK1W7fITVQRvHwMmc",
  authDomain: "elephant-54b6f.firebaseapp.com",
  databaseURL: "https://elephant-54b6f-default-rtdb.firebaseio.com",
  projectId: "elephant-54b6f",
  storageBucket: "elephant-54b6f.appspot.com",
  messagingSenderId: "1066431763108",
  appId: "1:1066431763108:web:732beae0fb80eb4f380c31",
  measurementId: "G-H81FY27KL1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
