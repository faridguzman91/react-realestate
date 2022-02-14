import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

//on protected private routes for signed-in users (see useAuthStatus.jsx hook)
// https://stackoverflow.com/questions/65505665/protected-route-with-firebase

// const ProtectedRoute = ({ component: Component }) => {
//   // a custom hook to keep track of user's auth status
//   const { loggedIn, checkingStatus } = useAuthStatus();

//   return (
//     <>
//       {
//         // display a spinner while auth status being checked
//         checkingStatus
//           ? <Spinner />
//           : loggedIn
//             // if user is logged in, grant the access to the route
//             // note: in this example component is Bar
//             ? <Component />
//             // else render an unauthorised component
//             // stating the reason why it cannot access the route
//             : <UnAuthorised />
//       }
//     </>
//   );
// };

// export default ProtectedRoute;

const PrivateRoute = () => {
  //   const loggedIn = false;

  const { loggedIn, checkingStatus } = useAuthStatus()

  if(checkingStatus) {
      return <Spinner />
  }
//if checking for status is true show laoding screen, else return outlet if we're signed in,  or to sign in page if we arent signed in
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
