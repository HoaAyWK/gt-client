// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const API_KEY = window._env_.VITE_FIREBASE_API_KEY;
const AUTH_DOMAIN = window._env_.VITE_FIREBASE_AUTH_DOMAIN;
const PROJECT_ID = window._env_.VITE_FIREBASE_PROJECT_ID;
const STORAGE_BUCKET = window._env_.VITE_FIREBASE_STORAGE_BUCKET;
const MESSAGING_SENDER_ID = window._env_.VITE_FIREBASE_MESSAGING_SENDER_ID;
const APP_ID = window._env_.VITE_FIREBASE_APP_ID;



const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
