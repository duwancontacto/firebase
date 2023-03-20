import {getFirestore} from "@firebase/firestore";
import {initializeApp} from "firebase/app";

import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPGbobTdgwgfnFqPV--rMnMtjC13B0_Xc",
  authDomain: "fir-project-29b05.firebaseapp.com",
  projectId: "fir-project-29b05",
  storageBucket: "fir-project-29b05.appspot.com",
  messagingSenderId: "314959809386",
  appId: "1:314959809386:web:fb599f058e4ab086c07313",
  measurementId: "G-RS1KRC3G74",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
