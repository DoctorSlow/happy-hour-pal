import React, { Component } from "react";
import SearchBar from "../../components/SearchBar";
import Container from "../../components/Container";
import Col from "../../components/Col";
import Row from "../../components/Row";
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import "./SubmitEdit.css";

class AddBusiness extends Component {

  constructor () {
    super ();
    this.state = {
      business: [],
      businesses: [],
      name: "",
      googleID: "",
      day: "",
      beginTime: "",
      endTime: "",
      info: ""
    };
    this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.loadAllBusinesses();
  }

  // Retrieve all businesses to be displayed in select drop-down.
  loadAllBusinesses = () => {
    API.getBusinesses()
      .then(res =>
        this.setState({
          businesses: res.data,
          name: "",
          googleID: "",
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
  handleSelectedOption = (event) => {
    const select = event.target;
    const selectedOption = select[select.selectedIndex];
    const businessID = selectedOption.getAttribute('data-id')
    const googleID = selectedOption.getAttribute('value')
    this.setState({
      businessID: businessID,
      googleID: googleID
    });
    console.log(businessID, googleID);
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (! this.state.googleID || ! this.state.day || ! this.state.beginTime || ! this.state.endTime || ! this.state.info) {
      alert("All fields must be filled out");
    } else {
      const select = document.getElementById('businessSelect');
      const selectedOption = select[select.selectedIndex];
      const businessId = selectedOption.getAttribute('data-id');
      console.log(businessId);
      API.saveDeal( businessId, {
        googleID: this.state.googleID,
        day: this.state.day,
        beginTime: this.state.beginTime,
        endTime: this.state.endTime,
        info: this.state.info
      })
        .then(
          function (dealData) {
            console.log(dealData);
            alert("Thanks for the info, pal!")
          },
          this.setState({
              name: "",
              day: "",
              beginTime: "",
              endTime: "",
              info: ""
          })
        )
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
      <SearchBar />
      <Container>
        <Row>
          <Col size="md-6">

            <h5 className="title">Add New Deal</h5>

            {/* Display name of business here, get data from button then submit to db with form data */}
            {/* <h3>*Display business name here*</h3> */}

            <form>

              <div className="form-group">
                <label htmlFor="business">Business Name:</label>
                {/* If businesses exist in the database: */}
                {this.state.businesses.length ? (
                  // Selecting a business fires loadTargetBusiness.
                  // <select onChange={this.state.loadTargetBusiness}>
                  <select id="businessSelect" onChange={this.handleSelectedOption}>
                    {this.state.businesses.map(business => (
                      <option
                        key={business._id}
                        // value={business._id}
                        data-id={business._id}
                        value={business.googleID}
                      >
                        {business.name}
                      </option>
                    ))}
                  </select>
                // Default message if no business exists in the database.
                ) : (
                  <h3>No businesses to display</h3>
                )}
              </div>

              <label>
                Choose a day from this list:
                <select
                  name="day"
                  type="select"
                  value={this.state.day}
                  selected={this.state.day}
                  onChange={this.handleInputChange}
                >
                  <option value="1">Sunday</option>
                  <option value="2">Monday</option>
                  <option value="3">Tuesday</option>
                  <option value="4">Wednesday</option>
                  <option value="5">Thursday</option>
                  <option value="6">Friday</option>
                  <option value="7">Saturday</option>
                </select>
              </label>

              <label htmlFor="dealTimes">Select the start and end times of the deal.</label>
              <div className="form-row">
                <Input
                    value={this.state.beginTime}
                    onChange={this.handleInputChange}
                    type="time"
                    id="appt-time"
                    name="beginTime"
                    required
                />
                <p className="timeframe">to</p>
                <Input
                    value={this.state.endTime}
                    onChange={this.handleInputChange}
                    type="time"
                    id="appt-time"
                    name="endTime"
                    required
                />
              </div>

              <label htmlFor="description">Enter a description for the deal.</label>
              <TextArea
                // className="description"
                name="info"
                placeholder="Description"
                type="textarea"
                value={this.state.info}
                onChange={this.handleInputChange}
              />

              <FormBtn
                className="btn-primary"
                onClick={this.handleFormSubmit}
              >
                Submit New Happy Hour Special
              </FormBtn>

            </form>
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default AddBusiness;
