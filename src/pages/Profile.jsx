import { useState} from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

function Profile() {
  //init user as empty object

  // const [user, setUser] = useState(null);
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  //update and rerender setUser updated value to show current user
  // useEffect(() => {
  //   setUser(auth.currentUser);
  // }, []);

  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();

    navigate("/");
  };

  //transfer all changed details to firebase and on screen

  const onSubmit = async () => {
    // console.log(123);
    try {
      if(auth.currentUser.displayName !== name) {
        //update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        //update to firestore, create reference to user using doc , bring in database, users collection and user id (auth)

        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name: name
        })
      }

    } catch (error){
      console.log(error)
      toast.error('could not update profile details')

    }
  };

  //get the id of the element that triggers the event event.target.id

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button className="logOut" type="button" onClick={onLogout}>
          log out
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          {/* /changeDetails mode is on , if clicked and if changeDetails is true , submit and set change details to previous state (true/false)/ */}
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>

        <div className="profileCard">
          <form>
            {/* //name id needs to match the state value */}
            <input
              type="text"
              id="name"
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            {/* //email id needs to match the state value */}
            <input
              type="text"
              id="email"
              className={!changeDetails ? "profileEmail" : "profileEmailActive"}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>

        <Link to='/create-listing'  className='createListing'>
          <img src={homeIcon} alt="home" />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt="arrorRight" />
        </Link>
      </main>
    </div>
  );
}

export default Profile;
