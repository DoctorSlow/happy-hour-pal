import React, { Component } from "react";
// import { Card, Row, Col } from 'reactstrap';
import API from "../../../utils/API";
import DealCard from "../DealCard/DealCard";

class Deals extends Component {
  state = {
    businesses: [],
    day: "",
    beginTime: "",
    endTime: "",
    info: "",
    visibility: "hidden",
  };

  componentDidMount() {
    this.loadBusinesses();
  }

  loadBusinesses = () => {
    API.getBusinesses()
      .then(res =>
        this.setState({
          businesses: res.data,
          day: "",
          beginTime: "",
          endTime: "",
          info: ""
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        {this.state.businesses.map(business => (
          <DealCard
            // onClick={() => this.handleClickEvent(pic.id)}
            id={business._id}
            key={business._id}
            day={business.day}
            beginTime={business.beginTime}
            endTime={business.endTime}
            info={business.info}
            visibility={this.state.visibility}
          />
        ))}
      </div>
    );
  }
}

export default Deals;
