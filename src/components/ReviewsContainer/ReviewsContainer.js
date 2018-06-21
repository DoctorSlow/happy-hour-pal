import React from "react";
import "./ReviewsContainer.css";
import { ReviewCard } from "../../components/ReviewCard";

// Business card component for List Results
const ReviewContainer = props => ( 
    <div className="reviews-container">
    <h1>Reviews</h1>
     {props.children}
    </div>
   
  );

export default ReviewContainer;
