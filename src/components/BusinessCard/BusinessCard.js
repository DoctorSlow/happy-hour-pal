import React from "react";
import "./BusinessCard.css";
import { BusinessNameCard, DealCard } from "../../components/Business";

// Business card component for List Results
const BusinessCard = props => ( 
    <div className="business-card">
     {props.children}
    </div>
   
  );

export default BusinessCard;
