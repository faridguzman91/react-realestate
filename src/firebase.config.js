import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/auth/web/start

const firebaseConfig = {
  apiKey: "AIzaSyDIuVvi97D6vbRFTtznU2GysLm68cmh6F4",
  authDomain: "react-housemarketplaceapp.firebaseapp.com",
  projectId: "react-housemarketplaceapp",
  storageBucket: "react-housemarketplaceapp.appspot.com",
  messagingSenderId: "975213576532",
  appId: "1:975213576532:web:808bdac6a80492136e08c1",
  measurementId: "G-J2S26R9WVE",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
