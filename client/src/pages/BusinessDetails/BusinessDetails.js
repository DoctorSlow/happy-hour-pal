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
    name: "",
    address: "http://www.ermanosbrew.com/",
    stars: "****",
    search: "",
    currentBusiness: [],
    currentBusinessDeals: []
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
      this.setState({currentBusiness: res.data}),
      console.log(res)
    })
    .catch(err => console.log(err))
    // Next, get the deals that go with the business (by same id).
    .then(
        API.getDeals(selectedOption.getAttribute('data-id'))
        .then(results =>{
          this.setState({currentBusinessDeals: results.data});
          console.log(results.data)
          console.log(this.state.currentBusinessDeals)
        })
    )
  }

  // loadTargetDeals = (event) => {
  //   const select = event.target;
  //   const selectedOption = select[select.selectedIndex];
  //   API.getDeals(selectedOption.getAttribute('value'))
  //   .then(res =>{
  //     this.setState({currentBusinessDeals: res.data});
  //   })
  // }

  handleSelectedOption = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {

    // Option A ... avoids declaring initially in state.
    const {currentBusiness} = this.state

    return (
      <div>
        <Row>
          <Col sm="4">

            {/* <BackBtn /> */}

            <BusinessCard>
              {currentBusiness &&
                <BusinessNameCard
                  name={currentBusiness.name}
                  address={this.state.address}
                  stars={this.state.stars}
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
              // loadTargetDeals={this.loadTargetDeals}
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
