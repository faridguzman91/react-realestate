import React from "react";
import { useState } from "react";
import {toast} from 'react-toastify'
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  //deconstruct states

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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

    try {
      //try getting auth and sign in function parameters
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      //if user credentials matches user in db
      // reditect homepage else
      //error

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      // console.log(error);

      //react-toast error alert
      toast.error("bad user credentials");
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome back!</p>
        </header>
        <form onSubmit={onSubmit}>
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
              id="password"
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

          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>

        {/* google oauth */}

        <Link to="/sign-up" className="registerLink">
          Sign Up Instead
        </Link>
      </div>
    </>
  );
}

export default SignIn;
