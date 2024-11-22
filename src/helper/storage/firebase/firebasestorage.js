
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:  process.env.REACT_APP_FIREBASE_STORAGE,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_ID,
  appId:  process.env.REACT_APP_FIREBASE_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
export const storage = getDatabase(app);