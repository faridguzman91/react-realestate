import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

function Profile() {
  //init user as empty object

  const [user, setUser] = useState(null);
  const auth = getAuth();

  //update and rerender setUser updated value to show current user
  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  return user ? <h1>{user.displayName}</h1> : 'Not Logged In'
}

export default Profile;
