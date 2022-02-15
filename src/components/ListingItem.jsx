import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";

// imageUrls, name, offer, discountedprice and regularprice data and id in listings collection in firebase

function ListingItem({ listing, id, onDelete }) {
  return (
    <li className="categoryListing">
      <Link
        to={`/category/${listing.type}/${id}`}
        className="categoryListingLink"
      >
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingName">{listing.name}</p>
          <p className="categoryListingPrice">
            {/* format price put commas */}$
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {/* check if listing type is rent then put / month */}
            {listing.type === "rent" && " / Month"}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="bed" />
            <p className="categoryListingInfoText">
              {/* if listing says more than one bed room check amount else 1 bedroom */}

              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : "1 bedrooms"}
            </p>

            <img src={bathtubIcon} alt="bath" />
            <p className="categoryListingInfoText">
              {/* if listing says more than one bed room check amount else 1 bedroom */}

              {listing.bathrooms > 1
                ? `${listing.bathrooms} bathrooms`
                : "1 bathrooms"}
            </p>
          </div>
        </div>
      </Link>
      {onDelete && (
          <DeleteIcon className='removeIcon' fill='rgb(231,76,60)' onClick={() => {onDelete(listing.id, listing.name)}} />
      )}
    </li>
  );
}

export default ListingItem;
