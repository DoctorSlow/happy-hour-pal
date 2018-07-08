import React from "react";
import { Card } from 'reactstrap';
import "./BusinessCard.css";

// Business card component 
const BusinessCard = props => ( 
    <div className="business-card">
      <Card>
        {props.children}
      </ Card>
    </div>
   
  );

export default BusinessCard;
