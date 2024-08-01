// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYQaqIKPj76K8A1yUMp8VO0hvkJZn9AW8",
  authDomain: "netflixgpt-df70b.firebaseapp.com",
  projectId: "netflixgpt-df70b",
  storageBucket: "netflixgpt-df70b.appspot.com",
  messagingSenderId: "229577351378",
  appId: "1:229577351378:web:6690e06da58b8ff66e8d0b",
  measurementId: "G-ZLRP9ZL9DT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
