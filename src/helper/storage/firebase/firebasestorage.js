
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB0ipB_Fh105Efc7PXsdDr_doaCUXZ7De4",
  authDomain: "philbizz-49b53.firebaseapp.com",
  databaseURL: "https://philbizz-49b53-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "philbizz-49b53",
  storageBucket: "philbizz-49b53.firebasestorage.app",
  messagingSenderId: "641946905459",
  appId: "1:641946905459:web:17892c40f59a279686b306",
  measurementId: "G-HZ26KK6474"
};


const app = initializeApp(firebaseConfig);
export const storage = getDatabase(app);
export const analytics = getAnalytics(app);