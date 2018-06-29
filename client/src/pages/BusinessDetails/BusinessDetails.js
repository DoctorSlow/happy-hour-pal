import React, { Component } from "react";
import { Row, Col } from 'reactstrap';
// import deals from "../../deals.json";
import reviews from "../../reviews.json";
import { BusinessCard, BusinessNameCard, DealCard } from "../../components/Business";
import { ReviewCard, ReviewsContainer } from "../../components/Reviews";
import API from "../../utils/API";
// import ReviewCard from "../../components/ReviewCard";
// import ReviewsContainer from "../../components/ReviewsContainer";
// import { BackBtn, ReportDealBtn, RateDealBtn, ViewAllBtn, SuggestEditBtn } from "../../../components/Buttons";

class Results extends Component {
  state = {
    businesses: [],
    day: "",
    beginTime: "",
    endTime: "",
    info: "",
    reviews: [],
    visibility: "hidden",
    name: "",
    address: "",
    stars: "",
  };

  componentDidMount() {
    this.loadBusinesses();
  }

  loadBusinesses = () => {
    API.getBusinesses()
      .then(res =>
        this.setState({
          businesses: res.data,
          name: "The Shanty",
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
        <Row>
          <Col sm="4">

            {/* <BackBtn /> */}

            <BusinessCard>

              <BusinessNameCard
                name={this.state.name}
                address={this.state.address}
                stars={this.state.stars}
              />

              {this.state.businesses.map(business => (
                <DealCard
                  // onClick={() => this.handleClickEvent(pic.id)}
                  id={business._id}
                  name={this.state.name}
                  key={business._id}
                  day={business.day}
                  beginTime={business.beginTime}
                  endTime={business.endTime}
                  info={business.info}
                  // canEdit={this.state.canEdit}
                  // visibility={this.state.visibility}
                  showButton={false}
                />
              ))}

            </BusinessCard>

            {/* <ReportDealBtn /> */}

            {/* <RatingCard>
              {children}
            </RatingCard> */}

            <ReviewsContainer>
              {this.state.reviews.map(review => (
                <ReviewCard
                  // onClick={() => this.handleClickEvent(pic.id)}
                  id={review.id}
                  key={review.id}
                  username={review.username}
                  date={review.date}
                  info={review.info}
                />
              ))}
            </ReviewsContainer>

            {/* <TopPalCard>
              {children}
            </TopPalCard> */}

            {/* <SuggestEditBtn /> */}

          </Col>
        </Row>
      </div>
    );
  }
}

export default Results;
