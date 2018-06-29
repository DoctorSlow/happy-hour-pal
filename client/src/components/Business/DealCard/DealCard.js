import React from "react";
import {
  Button, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import "./DealCard.css";

// Business card component for List Results
const DealCard = props => (
  <div className="deal-card">

    {/* New Deal card to pull from MongoDB */}
    <CardBody {...props._id}>
      <CardTitle>
        {props.day}
      </CardTitle>
      <CardSubtitle>
        {props.beginTime} - {props.endTime}
      </CardSubtitle>
      <CardText>
        {props.info}
      </CardText>
      <Button color="primary" className="update" style={{ visibility: (props.showButton ? "visible" : "hidden") }} id={props.id}>
        Update
      </Button>

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
            <Button color="primary" className="update" style={{visibility:(props.showButton ? "visible" : "hidden")}}>
                Update
            </Button>
          </div>
        )})
      } */}

    </CardBody>
  </div>
);

export default DealCard;
