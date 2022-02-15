import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg";

function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();

      //set google provider for firbase log sign in provider
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //check if user exists in firestore

      // https://firebase.google.com/docs/reference/node/firebase.auth.GoogleAuthProvider

      // Start a sign in process for an unauthenticated user.
      //   var provider = new firebase.auth.GoogleAuthProvider();
      //   provider.addScope("profile");
      //   provider.addScope("email");
      //   firebase.auth().signInWithRedirect(provider);

      const docRef = doc(db, "users", user.uid);

      //get snapshot
      // https://firebase.google.com/docs/reference/node/firebase.firestore.DocumentSnapshot
      //https://cloud.google.com/firestore/docs/query-data/get-data

      const docSnap = await getDoc(docRef);

      //if user, doesnt exist, create user

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          //use servertimestamp function from firebase
          timestamp: serverTimestamp(),
        });
      }

      navigate("/");
    } catch (error) {
      toast.error("could not authorize with google");
    }
  };

  return (
    <div className="socialLogin">
      <p>
        Sign {location.pathname === "/sign-up" ? "up" : "in"}
        with
      </p>

      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className="socialIconImg" src={googleIcon} alt="google" />
      </button>
    </div>
  );
}

export default OAuth;
