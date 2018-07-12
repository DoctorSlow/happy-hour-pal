import React, { Component } from "react";
import { Col, Row, Button } from 'reactstrap';
// import deals from "../../deals.json";
import { BusinessCard, BusinessNameCard, DealCard } from "../../components/Business";

import API from "../../utils/API";
// import SearchForm from "../../components/SearchForm";
import "./EditBusiness.css";

class EditBiz extends Component {

  state = {
    businesses: [],
    day: "",
    beginTime: "",
    endTime: "",
    info: "",
    visibility: "visible",
    name: "",
    // address: "http://www.ermanosbrew.com/",
    // stars: "****",
    currentBusiness: [],
    currentBusinessDeals: []
  };

  handleClickEvent = (ID) => {
      if (this.props.loggedIn) {
          this.props.history.push("/editdeal/" + ID);
      } else {
          this.props.history.push("/login");
      }
  }

  handleAddEvent = (ID) => {
    if (this.props.loggedIn) {
      this.props.history.push("/adddeal/" + ID);
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
            console.log(results.data)
            console.log(this.state.currentBusinessDeals)
          })
      )
  }

  render() {

    // Option A ... avoids declaring initially in state.
    const {currentBusiness} = this.state

    return (
      <div className="background">
        <Row>
          <Col sm="1" md="2" lg="2"></Col>
          <Col sm="10" md="8" lg="8">

            {/* <BackBtn /> */}

            <BusinessCard>
              {currentBusiness &&
                <BusinessNameCard
                  name={currentBusiness.name}
                  address={this.state.address}
                  // stars={this.state.stars}
                />
              }
              
              {/* Deal Card displays all data from business collection. */}
              {this.state.currentBusinessDeals.length ? (
                <div>
                  {this.state.currentBusinessDeals.map(deal => (
                    <DealCard
                      // onClick={() => this.handleClickEvent(pic.id)}
                      id={deal._id}
                      key={deal._id}
                      day={deal.day}
                      beginTime={deal.beginTime}
                      endTime={deal.endTime}
                      info={deal.info}
                      showButton={true}
                      handleClickEvent={() => this.handleClickEvent(deal._id)}
                    />
                  ))}
                </div>
              ) : (
                <h5>No current happy hour deals</h5>
              )}

              {this.state.currentBusinessDeals.map(business => (
                <Button
                  className="btn add-missing-biz-deal-btn"
                  key={business._id}
                  color="#b66925ff"
                  onClick={() => this.handleAddEvent(business.googleID)}
                >
                  Add New Deal
                </Button>
              )).slice(0,1)}

            </BusinessCard>

            {/* <div className="text-center">
              <img className="quail-logo results-logo" src="/assets/images/quaillogo.png" alt="quail-logo" />
              <p className="add-location-call">Missing a deal? Help a pal out!</p>
              {this.state.currentBusinessDeals.map(business => (
                <Button
                  className="add-missing-biz-deal-btn"
                  key={business._id}
                  color="#b66925ff"
                  onClick={() => this.handleAddEvent(business.googleID)}
                >
                  Add New Deal
                </Button>
              )).slice(0,1)}
            </div> */}

            <div className="text-center crowdsource-div">
              <img className="quail-logo results-logo" src="/assets/images/quaillogo.png" alt="quail-logo" />
              <p className="add-location-call">Thanks for the help pal!</p>
            </div>
          </Col>
          <Col sm="1" md="2" lg="2"></Col>
        </Row>
      </div>
    );
  }
}

export default EditBiz;
