import React from "react";
import { Button, CardText, CardBody,
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
              {props.info[index]}
            </CardText>
            <Button color="primary" className="update" style={{visibility:(props.showButton ? "visible" : "hidden")}}>
              Update
            </Button>
          </div>
        ) 
      })}
    </CardBody>
    
  </div>
);

export default DealCard;
