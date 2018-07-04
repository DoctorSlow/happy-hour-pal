import React, { Component } from "react";
import { Row, Col, Button } from 'reactstrap';
// import API from "../utils/API";
import deals from "../../deals.json";
// import reviews from "../../reviews.json";
import { BusinessCard, BusinessNameCard, DealCard } from "../../components/Business";

import SearchBar from "../../components/SearchBar";
// import  BusinessNameCard from "../../components/BusinessNameCard";
// import DealCard from "../../components/DealCard";

// import { BackBtn, ReportDealBtn, RateDealBtn, ViewAllBtn, SuggestEditBtn } from "../../../components/Buttons";


class Results extends Component {
  state = {

    deals,
    name: "Ermanos",
    address: "http://www.ermanosbrew.com/",
    stars: "****"


  };

  handleClickEvent = () => {
    this.history.push("/addbusiness");
    // if (this.props.loggedIn) {
    //   this.props.history.push("/addbusiness");
    // } else {
    //   this.props.history.push("/login");
    // }
  }



  render() {

    return (
      <div>
        <SearchBar />
        <Row>
          <Col sm="4">
            {/* <SearchBar /> */}
            <BusinessCard>
              <BusinessNameCard
                name={this.state.name}
                address={this.state.address}
                stars={this.state.stars}
              />

              <DealCard
                // onClick={() => this.handleClickEvent(pic.id)}
                id={deals[0].id}
                key={deals[0].id}
                day={deals[0].day}
                beginTime={deals[0].beginTime}
                endTime={deals[0].endTime}
                info={deals[0].info}
              />

            </BusinessCard>
            <Button color="primary" onClick={this.handleClickEvent}>Suggest Location</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Results; 
