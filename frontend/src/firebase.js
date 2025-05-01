
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "hamroreal-estate.firebaseapp.com",
  projectId: "hamroreal-estate",
  storageBucket: "hamroreal-estate.appspot.com",
  messagingSenderId: "225603715947",
  appId: "1:225603715947:web:d7317a5ac505dd889d022e",
};


export const app = initializeApp(firebaseConfig);
