import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Category from "./pages/Category";
import PrivateRoute from "./components/PrivateRoute";
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/offers" element={<Offers />} />
          {/* query will look if its sell or rent category (categoryName)  */}
          <Route path="/category/:categoryName" element={<Category />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/profile" element={<PrivateRoute />}>
            {/* render the outlet from privateroute, redirect to sign-in when not logged in */}
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/category/:categoryName/:listingId"
            element={<Listing />}
          />
          <Route path="/contact/:landlordId" element={<Contact />} />
        </Routes>
        {/* navbar */}
        <Navbar />
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
