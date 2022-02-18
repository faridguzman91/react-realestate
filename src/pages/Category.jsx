import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,

} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

//hot to get / retrieve data
//https://firebase.google.com/docs/database/web/lists-of-data

// import { getDatabase, ref, query, orderByChild } from "firebase/database";
// import { getAuth } from "firebase/auth";

// const db = getDatabase();
// const auth = getAuth();

// const myUserId = auth.currentUser.uid;
// const topUserPostsRef = query(
//   ref(db, "user-posts/" + myUserId),
//   orderByChild("starCount")
// );

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  //use params [sell/rent] to redirect category

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //get reference to listings collection

        const listingsRef = collection(db, "listings");

        //create query, look in data base where the type is equal to the category of sell or rent
        //its gonna look in the query in <Category /> in app.js (categoryName) in the router params
        //it will order by timestamp and limit items to 10 everytime

        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        //execute the query

        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          //log listing collection from db
          // console.log(doc.data())

          //push listings into the empty listings array, push doc.id and doc.data

          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("could not fetch listings ");
      }
    };

    // run fetchListings function

    fetchListings();
  }, [params.categoryName]);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {/* use params to indicate categoryName page name */}
          {params.categoryName === "rent"
            ? "Places for rent"
            : "Places for sale"}
        </p>
      </header>

      {/* if loading state is true, show spinner component else if false, show listings array , then if length of listings array is more than nothing display main component  map all data, name in a list within listing object*/}

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
             {listings.map((listing) => (
                    <ListingItem listing={listing.data} id={listing.id} key={listing.id}/>
                ))} 
            </ul>
          </main>
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
}

export default Category;
