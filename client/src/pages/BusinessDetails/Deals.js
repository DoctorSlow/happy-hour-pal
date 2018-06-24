import React, { Component } from "react";
// import { Card, Row, Col } from 'reactstrap';
import API from "../../utils/API";
import deals from "../../deals.json";
import reviews from "../../reviews.json";
import { BusinessCard, BusinessNameCard, DealCard } from "../../components/Business";
import { ReviewCard, ReviewsContainer } from "../../components/Reviews";
import BusinessListings from "../BusinessListings/BusinessListings";
// import ReviewCard from "../../components/ReviewCard";
// import ReviewsContainer from "../../components/ReviewsContainer";
// import { BackBtn, ReportDealBtn, RateDealBtn, ViewAllBtn, SuggestEditBtn } from "../../../components/Buttons";

class Deals extends Component {
  state = {
    businesses: [],
    day: "",
    beginTime: "",
    endTime: "",
    info: "",
    visibility: "hidden"
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
            id={business.id}
            key={business.id}
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
