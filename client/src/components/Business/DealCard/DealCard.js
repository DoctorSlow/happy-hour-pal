import React from "react";
import {
  Button, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import "./DealCard.css";

// var weekday=new Array(7);
// weekday[0]="Monday";
// weekday[1]="Tuesday";
// weekday[2]="Wednesday";
// weekday[3]="Thursday";
// weekday[4]="Friday";
// weekday[5]="Saturday";
// weekday[6]="Sunday";
function dayOfWeekAsString(dayIndex) {
  return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex];
}

function toStandardTime(militaryTime) {
  militaryTime = militaryTime.split(':');
  if (militaryTime[0] > 12) {
    return (militaryTime[0] - 12) + ':' + militaryTime[1] + ' PM';
  } else {
    return militaryTime.join(':') + ' AM';
  }
}

// Business card component for List Results
const DealCard = props => (
  <div className="deal-card">

    {/* New Deal card to pull from MongoDB */}
    <CardBody className="card-body" {...props._id}>
      <CardTitle className="card-title gray">
        {/* {weekday[props.day]} */}
        {dayOfWeekAsString(props.day).toUpperCase()}
      </CardTitle>
      <CardSubtitle className="gray card-subtitle">
        {toStandardTime(props.beginTime)} - {toStandardTime(props.endTime)}
        {/* {props.beginTime} - {props.endTime} */}
      </CardSubtitle>
      <CardText className="text-left card-text light-gray">
        {props.info}
      </CardText>
      <Button color="#d96d28ff" className="update-deal-btn" style={{ display: (props.showButton ? "block" : "none") }} id={props.id} onClick={props.handleClickEvent}>
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
