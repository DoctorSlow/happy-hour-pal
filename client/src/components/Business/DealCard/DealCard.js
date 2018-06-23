import React from "react";
import { CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';
import "./DealCard.css";

// Business card component for List Results
const DealCard = props => (
  <div className="deal-card">

    {/* New Deal card to pull from MongoDB */}
    <CardBody>
      <CardTitle>
        {props.day}
      </CardTitle>
      <CardSubtitle>
        {props.beginTime} - {props.endTime}
      </CardSubtitle>
      <CardText>
        {props.info}
      </CardText>

      {/* Old Deal Card - only for deals.json */}
      {/* {props.beginTime.map((element, index) => {
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
      } */}

    </CardBody>
  </div>
);

export default DealCard;
