import React, { Component } from "react";
import { Row, Col, Button } from 'reactstrap';
// import deals from "../../deals.json";
import reviews from "../../reviews.json";
import { BusinessCard, BusinessNameCard, DealCard } from "../../components/Business";
import { ReviewCard, ReviewsContainer } from "../../components/Reviews";
import API from "../../utils/API";
import "./BizDetails.css";
// import ReviewCard from "../../components/ReviewCard";
// import ReviewsContainer from "../../components/ReviewsContainer";
// import { BackBtn, ReportDealBtn, RateDealBtn, ViewAllBtn, SuggestEditBtn } from "../../../components/Buttons";
// import { List, ListItem } from "../../components/List";
// import { FormBtn } from "../../components/Form";
// import SearchForm from "../../components/SearchForm";

class Results extends Component {
  state = {
    business: [],
    businesses: [],
    day: "",
    beginTime: "",
    endTime: "",
    info: "",
    reviews,
    visibility: "hidden",
    name: "",
    // address: "http://www.ermanosbrew.com/",
    // stars: "****",
    search: "",
    currentBusiness: [],
    currentBusinessDeals: []
  };

  handleClickEvent = (ID) => {
    if (this.props.loggedIn) {
      this.props.history.push("/editbusiness/" + ID);
    } else {
      this.props.history.push("/login");
    }
  }

  // Load the business selected from previous page (by googleID).
  componentDidMount() {
    API.getBusiness(this.props.match.params.id)
      .then(res =>{
        this.setState({currentBusiness: res.data[0]})
        console.log(res.data)
      })
      .catch(err => console.log(err))

      // Next, get the deals that go with the business (by same id).
      .then(
        API.getDeals(this.props.match.params.id)
          .then(results =>{
            this.setState({currentBusinessDeals: results.data});
            // console.log(results.data)
            // console.log(this.state.currentBusinessDeals)
          })
      )
  }

  // handleSelectedOption = event => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // };

  render() {

    // Option A ... avoids declaring initially in state.
    // const { currentBusiness } = this.state

    return (
      <div>
        <Row className="background">
          <Col sm="4">

            {/* <BackBtn /> */}

            <BusinessCard>
              {this.state.currentBusiness &&
                <BusinessNameCard
                  name={this.state.currentBusiness.name}
                  address={this.state.address}
                  // stars={this.state.stars}
                />
              }

              {/* Deal Card displays all data from business collection. */}
              {this.state.currentBusinessDeals.length ? (
                <div>
                  {this.state.currentBusinessDeals.map(business => (
                    <DealCard
                      // onClick={() => this.handleClickEvent(pic.id)}
                      id={business._id}
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
                </div>
              ) : (
                  <h3>No current happy hour deals</h3>
              )}

            </BusinessCard>

            <div className="text-center">
              <img className="quail-logo results-logo" src="/assets/images/quaillogo.png" alt="quail-logo" />
              <p className="add-location-call">Something looks off? Help a pal out!</p>
              {this.state.currentBusinessDeals.map(business => (
                <Button
                  className="edit-biz-btn"
                  key={business._id}
                  color="#b66925ff"
                  onClick={() => this.handleClickEvent(business.googleID)}
                >
                  Update Happy Hour
                </Button>
              )).slice(0,1)}
            </div>

            {/* <ReportDealBtn /> */}

            {/* <RatingCard>
              {children}
            </RatingCard> */}

            {/* FUTURE: Render Reviews Here */}
            {/* <ReviewsContainer>
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
            </ReviewsContainer> */}

            {/* <TopPalCard>
              {children}
            </TopPalCard> */}

            {/* <SuggestEditBtn /> */}

          </Col>
          <Col sm="4">

            {/* Component for drop-down business list. */}
            {/* <SearchForm
              handleSelectedOption={this.handleSelectedOption}
              businesses={this.state.businesses}
              loadTargetBusiness={this.loadTargetBusiness}
            // loadTargetDeals={this.loadTargetDeals}
            /> */}

            {/* Option A ... Div to display business selected from SearchForm */}
            {/* {currentBusiness &&
              <div>
                <h1>{currentBusiness.name}</h1>
                <h2>{currentBusiness._id}</h2>
              </div>
            } */}

            {/* Option B ... uses set state */}
            {/* <div>
              <h1>{this.state.currentBusiness.name}</h1>
              <h2>{this.state.currentBusiness._id}</h2>
            </div> */}

          </Col>
        </Row>
      </div>
    );
  }
}

export default Results;
