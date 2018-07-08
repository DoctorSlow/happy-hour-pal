import React, { Component } from "react";
import { Row, Col, Button } from 'reactstrap';
// import API from "../utils/API";
// import deals from "../../deals.json";
// import reviews from "../../reviews.json";
import { BusinessCard, BusinessNameCard, DealCard } from "../../components/Business";
import API from "../../utils/API";
import SearchBar from "../../components/SearchBar";
import { Link } from "react-router-dom";
import "./ListResults.css";


// import { BackBtn, ReportDealBtn, RateDealBtn, ViewAllBtn, SuggestEditBtn } from "../../../components/Buttons";


class Results extends Component {
  state = {
    businesses: [],
    currentDeals: [],
    // deals,
    name: "",
    // address: "http://www.ermanosbrew.com/",
    // stars: "****"
  };

  // Load all businesses from the Business collection.
  componentDidMount() {
    this.loadAllDeals()
    // this.loadAllBusinesses()
  }

  loadAllDeals = () => {
    API.getBusinesses()
      .then(res => {

        this.setState({businesses: res.data});
        console.log(res.data)
        // console.log(this.state.businesses)
      })
      .catch(err => console.log(err))
      // .then(
      //   API.getAllDeals()
      //     .then(res => {
      //     this.setState({currentDeals: res.data});
      //     console.log(res.data)
      //     // console.log(this.state.currentDeals)
      //     })
      //     .catch(err => console.log(err))
      // )

  }

  handleClickEvent = () => {
    // this.history.push("/addbusiness");
    
    if (this.props.loggedIn) {
      this.props.history.push("/addbusiness");
    } else {
      this.props.history.push("/login");
    }
  }

  render() {

    return (
      <div>
        <SearchBar />
        <Row className="background">
          <Col sm="1" md="2" lg="2"></Col>
          <Col sm="10" md="8" lg="8">

            {/* {this.state.currentDeals.map(deals => ( */}
            {this.state.businesses.map(business => (
              <div>
                <BusinessCard>

                  {/* <BusinessNameCard
                    name={business.name}
                    key={business.googleID}
                    // address={this.state.address}
                    // stars={this.state.stars}
                  /> */}

                  {/* <Link to={"/editbusiness/" + business.googleID}>
                    {business.name}
                  </Link> */}
                  <h5 className="business-name">
                    <Link className="business-name-link" to={"/businessdetails/" + business.googleID}>
                      {business.name}
                    </Link>
                  </h5>

                {business.deals.map(deals => (
                <DealCard

                  // onClick={() => this.handleClickEvent(pic.id)}
                  id={deals._id}
                  key={deals._id}
                  day={deals.day}
                  beginTime={deals.beginTime}
                  endTime={deals.endTime}
                  info={deals.info}

                />
                ))}
                {/* <Link to={"/businessdetails/" + deals.googleID}>
                  Go to Business
                </Link> */}
                {/* <hr /> */}
              </BusinessCard>
            </div>
          ))}
            <div className="text-center">
              <img className="quail-logo results-logo" src="/assets/images/quaillogo.png" alt="quail-logo" />
              <p className="add-location-call">Know something we don't? Help a pal out!</p>
              <Button color="#b66925ff" className="add-location-btn" onClick={this.handleClickEvent}>Add Happy Hour</Button>
            </div>
          </Col>
          <Col sm="1" md="2" lg="2"></Col>
        </Row>
      </div>
    );
  }
}

export default Results; 
