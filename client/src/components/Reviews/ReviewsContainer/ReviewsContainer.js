import React from "react";
import "./ReviewsContainer.css";


// Business card component for List Results
const ReviewsContainer = props => ( 
    <div className="reviews-container">
    <h1>Reviews</h1>
     {props.children}
    </div>
   
  );

export default ReviewsContainer;
