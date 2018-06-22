import React from "react";
import { CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';
import "./ReviewCard.css";

// Business card component for List Results
const ReviewCard = props => (
    <div className="review-card">
  
          <CardBody>
            <CardTitle>
              {props.username}
            </CardTitle>
            <CardSubtitle>
              {props.date}
            </CardSubtitle>
            <CardText>
              <p></p>
              {props.info}
            </CardText>
          </CardBody>
     
    

    </div>
  );

export default ReviewCard;
