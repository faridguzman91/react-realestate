import React from "react";
import { useEffect, useState, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//https://firebase.google.com/docs/auth/web/manage-users

//set observer on the auth object with onAuthStateChnged to get currently signed-in user

// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });

// from stackoverflow
//https://stackoverflow.com/questions/65505665/protected-route-with-firebase

// export const useAuthListener = (): void => {
//   // assume user to be logged out
//   const [loggedIn, setLoggedIn] = useState(false);

//   // keep track to display a spinner while auth status is being checked
//   const [checkingStatus, setCheckingStatus] = useState(true);

//   useEffect(() => {
//     // auth listener to keep track of user signing in and out
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         setLoggedIn(true);
//       }

//       setCheckingStatus(false);
//     });
//   }, []);

//   return { loggedIn, checkingStatus };
// };

export const useAuthStatus = () => {
  // assume user to be logged out
  const [loggedIn, setLoggedIn] = useState(false);
  // keep track to display ... while auth status is being checked
  const [checkingStatus, setCheckingStatus] = useState(true);

  const isMounted = useRef(true);

  //useEffect to check status signed in or not signed in, initialize by an is mounted useref check
  // then depend on that useref

  useEffect(() => {
    //first check if ismounted reference us true
    if (isMounted) {
      const auth = getAuth();

      // auth listener to keep track of user signing in and out
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
        }
        //update checking status to false if user is true
        setCheckingStatus(false);
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return { loggedIn, checkingStatus };
};

// for the memory leak warning fix caused by loading (un)mounted components: (useRef - isMounted)
// https://stackoverflow.com/questions/59780268/cleanup-memory-leaks-on-an-umnounted-component-in-react-hooks
