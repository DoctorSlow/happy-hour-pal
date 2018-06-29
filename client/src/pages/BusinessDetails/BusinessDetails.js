import React, { Component } from "react";
import { Row, Col, Button } from 'reactstrap';
// import deals from "../../deals.json";
import reviews from "../../reviews.json";
import { BusinessCard, BusinessNameCard, DealCard } from "../../components/Business";
import { ReviewCard, ReviewsContainer } from "../../components/Reviews";
import API from "../../utils/API";
// import ReviewCard from "../../components/ReviewCard";
// import ReviewsContainer from "../../components/ReviewsContainer";
// import { BackBtn, ReportDealBtn, RateDealBtn, ViewAllBtn, SuggestEditBtn } from "../../../components/Buttons";
import { List, ListItem } from "../../components/List";
import { FormBtn } from "../../components/Form";
import SearchForm from "../../components/SearchForm";

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
    name: "Ermanos",
    address: "http://www.ermanosbrew.com/",
    stars: "****",
    search: "",
    currentBusiness: []
  };

  handleClickEvent = () => {
    if (this.props.loggedIn) {
      this.props.history.push("/editbusiness");
    } else {
      this.props.history.push("/login");
    }
  }

  componentDidMount() {
    this.loadAllBusinesses()
  }

  // Retrieve all businesses to be displayed in select drop-down.
  loadAllBusinesses = () => {
    API.getBusinesses()
      .then(res =>
        this.setState({
          businesses: res.data,
          day: "",
          beginTime: "",
          endTime: "",
          info: "",
          // currentBusiness: []
        })
      )
      .catch(err => console.log(err));
  }

  // Upon select, get info of selected business (by id).
  loadTargetBusiness = (event) => {
    const select = event.target;
    const selectedOption = select[select.selectedIndex];
    API.getBusiness(selectedOption.getAttribute('value'))
    .then(res =>{
      this.setState({currentBusiness: res.data});
    })
  }

  // handleSelectedOption = event => {
  //   this.setState({ search: event.target.value });
  // };
  handleSelectedOption = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  // Old way to get single business when search form is on same page.
  // // Get back the info from a single business, by its id
  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   API.getBusiness(this.state.search)
  //   .then(res =>
  //     this.setState({
  //       businesses: res.data,
  //       day: "",
  //       beginTime: "",
  //       endTime: "",
  //       info: ""
  //     })
  //   )
  //     .catch(err => this.setState({ error: err.message }));
  // };

  render() {

    // Option A ... avoids declaring initially in state.
    const {currentBusiness} = this.state

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

              {/* Deal Card displays all data from business collection. */}
              {this.state.businesses.map(business => (
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
              <Button color="primary" onClick={this.handleClickEvent}>Suggest Edit</Button>
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
          <Col sm="4">

            {/* Component for drop-down business list. */}
            <SearchForm
              handleSelectedOption={this.handleSelectedOption}
              businesses={this.state.businesses}
              loadTargetBusiness={this.loadTargetBusiness}
            />

            {/* Option A ... Div to display business selected from SearchForm */}
            {currentBusiness &&
              <div>
                <h1>{currentBusiness.name}</h1>
                <h2>{currentBusiness._id}</h2>
              </div>
            }

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
