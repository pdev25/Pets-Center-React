// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdgAwRaDLpbFOR4IN-224SLEyIqDMinvw",
  authDomain: "mascotas-4124e.firebaseapp.com",
  projectId: "mascotas-4124e",
  storageBucket: "mascotas-4124e.firebasestorage.app",
  messagingSenderId: "770822774328",
  appId: "1:770822774328:web:7ffe4da340a1186ba710cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)