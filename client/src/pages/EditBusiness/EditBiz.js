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
    address: "http://www.ermanosbrew.com/",
    stars: "****",
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
                <h3>No current happy hour deals</h3>
              )}

              {this.state.currentBusinessDeals.map(business => (
                <Button
                  key={business._id}
                  color="primary"
                  onClick={() => this.handleAddEvent(business.googleID)}
                >
                  Add New Deal
                </Button>
              )).slice(0,1)}

            </BusinessCard>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EditBiz;
