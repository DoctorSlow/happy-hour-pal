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
          {props.beginTime.map((element, index) => {
            return(
            <div>
              <CardSubtitle>
                {props.beginTime[index]}-{props.endTime[index]}
              </CardSubtitle>
              <CardText>
                <p></p>
                {props.info[index]}
              </CardText>
            </div>
          )})
          }
          </CardBody>
     
    

    </div>
  );

export default DealCard;
