import React from "react";
import "./BusinessCard.css";


// Business card component 
const BusinessCard = props => ( 
    <div className="business-card">
     {props.children}
    </div>
   
  );

export default BusinessCard;
