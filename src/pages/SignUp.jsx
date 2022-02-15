import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { db } from '../firebase.config.js'
import {doc, setDoc, serverTimestamp} from 'firebase/firestore'
import Profile from "./Profile";
import OAuth from "../components/OAuth";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  //deconstruct states

  const [formData, setFormData] = useState({
    name: '',
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  //get the id of the element that triggers the event event.target.id

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // https://firebase.google.com/docs/auth/web/manage-users
    // https://firebase.google.com/docs/auth/web/start

    try {
      //get auth value from firebase function getAuth
      const auth = getAuth();

      //register users with firebase: create user with email and password function, return promise
      //take 3 arguments, email, auth, and password

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //get user info from userCredentials

      const user = userCredential.user;

      // update Profile, and display name with currentUser

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      //https://firebase.google.com/docs/firestore/manage-data/add-data

      //copy everything from formData State (name, email, password)
      //delete password, not in db (security)
      //set server timestamp
      //set doc update db add user to user collection

      //https://github.com/firebase/snippets-web/blob/1c4c6834f310bf53a98b3fa3c2e2191396cacd69/snippets/firestore-next/test-firestore/set_document.js#L8-L15

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      //redirect to home from this function, otherwise catch error and not redirect

      navigate("/");
    } catch (error) {

      //react-toast error alert
      toast.error('something went wrong')
    }
  }




  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome back!</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="nameInput"
            placeholder="name..."
            id="name"
            value={name}
            onChange={onChange}
          />
          <input
            type="text"
            className="emailInput"
            placeholder="email..."
            id="email"
            value={email}
            onChange={onChange}
          />

          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              value={password}
              id='password'
              placeholder="password"
              onChange={onChange}
            />
            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>

          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signInButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>

        {/* google oauth */}
        <OAuth />

        <Link to="/sign-in" className="registerLink">
          Sign In Instead
        </Link>
      </div>
    </>
  );
}

export default SignUp;
