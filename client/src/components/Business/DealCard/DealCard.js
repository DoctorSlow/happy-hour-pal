import React from "react";
import { CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';
import "./DealCard.css";

// Business card component for List Results
const DealCard = props => (
    <div className="deal-card">
  
          <CardBody>
            <CardTitle>
              {props.day}
            </CardTitle>
            <CardSubtitle>
              {props.beginTime}-{props.endTime}
            </CardSubtitle>
            <CardText>
              <p></p>
              {props.info}
            </CardText>
          </CardBody>
     
    

    </div>
  );

export default DealCard;
