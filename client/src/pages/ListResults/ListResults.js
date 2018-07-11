import React, { Component } from "react";
import { Row, Col, Button } from 'reactstrap';
import { BusinessCard, BusinessNameCard, DealCard } from "../../components/Business";
import API from "../../utils/API";
import SearchBar from "../../components/SearchBar";
import { Link } from "react-router-dom";
import "./ListResults.css";

class Results extends Component {

  constructor() {
    super();
    this.state = {
      businesses: [],
      currentDeals: [],
      deals: [],
      name: "",
    };
    this.filterDay = this.filterDay.bind(this);
  }

  // Load all businesses from the Business collection.
  componentDidMount() {
    this.loadAllDeals()
    // this.loadAllBusinesses()
  }

  loadAllDeals = () => {
    API.getBusinesses()
      .then(res => {
        this.setState({ businesses: res.data });
        console.log(res.data)
        // console.log(this.state.businesses)
      })
      .catch(err => console.log(err))
  }

  handleClickEvent = () => {
    if (this.props.loggedIn) {
      this.props.history.push("/addbusiness");
    } else {
      this.props.history.push("/login");
    }
  }

  filterDay(event) {
    const dayButton = event.target;
    const dayValue = dayButton.getAttribute('data-day-value');
    // console.log(dayValue);

    const { businesses } = this.state;

    businesses.forEach((business) => {
      let hasDeal = false;
      business.deals.forEach((deal) => {
        // console.log(business);
        // console.log(deal);
        if (dayValue == deal.day) {
          hasDeal = true;
        }
      });
      business.isShown = hasDeal;
      console.log(hasDeal)
    });

    this.setState({ businesses })
    console.log(businesses);
  }

  render() {
    return (
      <div>
        <button
          name="dayButton"
          onClick={this.filterDay}
          data-day-value={0}
        >Sun</button>
        <button
          onClick={this.filterDay}
          data-day-value={1}
        >Mon</button>
        <button
          onClick={this.filterDay}
          data-day-value={2}
        >Tue</button>
        <button
          onClick={this.filterDay}
          data-day-value={3}
        >Wed</button>
        <button
          onClick={this.filterDay}
          data-day-value={4}
        >Thu</button>
        <button
          onClick={this.filterDay}
          data-day-value={5}
        >Fri</button>
        <button
          onClick={this.filterDay}
          data-day-value={6}
        >Sat</button>

        <Row className="background">
          <Col sm="1" md="2" lg="2"></Col>
          <Col sm="10" md="8" lg="8">

            {this.props.businesses
              .map(business => {

                return (business.isShown) && (
                  <div>
                    <BusinessCard>
                      <h5 className="business-name">
                        <Link className="business-name-link" to={"/businessdetails/" + business.googleID}>
                          {business.name}
                        </Link>
                      </h5>

                      {business.deals
                        .map(deals => (
                          <DealCard
                            id={deals._id}
                            key={deals._id}
                            day={deals.day}
                            dayValue={deals.day}
                            beginTime={deals.beginTime}
                            endTime={deals.endTime}
                            info={deals.info}
                          />
                        ))
                      }
                    </BusinessCard>
                  </div>
                )
              })
            }

            <div className="text-center">
              <img
                className="quail-logo results-logo"
                src="/assets/images/quaillogo.png"
                alt="quail-logo"
              />
              <p className="add-location-call">
                Know something we don't? Help a pal out!
              </p>
              <Button
                color="#b66925ff"
                className="add-location-btn"
                onClick={this.handleClickEvent}
              >
                Add Happy Hour
              </Button>
            </div>
          </Col>
          <Col sm="1" md="2" lg="2"></Col>
        </Row>
      </div>
    );
  }
}

export default Results;
