import React from "react";
import "./SearchForm.css";

// Drop-down select element to choose a business.
const SearchForm = props => (

  <form className="search">
    <div className="form-group">
      <label htmlFor="business">Business Name:</label>
      {/* If businesses exist in the database: */}
      {props.businesses.length ? (
        // Selecting a business fires loadTargetBusiness.
        <select onChange={props.loadTargetBusiness}>
          {props.businesses.map(business => (
            <option
              key={business._id}
              value={business._id}
              data-id={business.googleID}
            >
              {business.name}
            </option>
          ))}
        </select>
      // Default message if no business exists in the database.
      ) : (
        <h3>No businesses to display</h3>
      )}
    </div>
  </form>
);

export default SearchForm;
