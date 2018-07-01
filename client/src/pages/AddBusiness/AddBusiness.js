import React, { Component } from "react";
import SearchBar from "../../components/SearchBar";
import Container from "../../components/Container";
import Col from "../../components/Col";
import Row from "../../components/Row";
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import "./AddBusiness.css";

class AddBusiness extends Component {

  constructor () {
    super ();
    this.state = {
      googleID: "",
      name: "",
      day: "",
      beginTime: "",
      endTime: "",
      info: "",
      results: [],
      search: ""
    };
    this.handleInputChange.bind(this);
  }

  componentDidMount() {
    console.log("loaded");
    // Run API.getPlaces by current location + search term?
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSelectedOption = event => {
    const select = event.target;
    const selectedOption = select[select.selectedIndex];
    const optionName = selectedOption.getAttribute('value').split(",")[0];
    const optionID = selectedOption.getAttribute('value').split(",")[1];
    this.setState({
      name: optionName,
      googleID: optionID
    });
    console.log(optionName, optionID);
  }

  handleSearchSubmit = event => {
    event.preventDefault();
    this.searchGoogle(this.state.search);
  };

  searchGoogle(query) {
    console.log("google has been searched")
    API.getPlaces(query)
    // .then(
    //   function (searchResults) {
    //     console.log(searchResults.data);
    //   })
    .then(res =>
        this.setState({
          results: res.data.results
        })
      )
      .catch(err => console.log(err));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (! this.state.name) {
      alert("All fields must be filled out");
    } else {
      API.saveBusiness({
        name: this.state.name,
        googleID: this.state.googleID
        // day: this.state.day,
        // beginTime: this.state.beginTime,
        // endTime: this.state.endTime,
        // info: this.state.info
      })
      .catch(err => console.log(err))
        .then(
          API.saveDeal({
            googleID: this.state.googleID,
            day: this.state.day,
            beginTime: this.state.beginTime,
            endTime: this.state.endTime,
            info: this.state.info
          })
        )
        .then(
          function (newDeal) {
            console.log(newDeal.data);
            alert("Thanks for the info, pal!");
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
      <SearchBar
        onClick={this.handleSearchSubmit}
        onChange={this.handleInputChange}
      />
      <Container>
        <Row>
          <Col size="md-6">
            <h5 className="title">Add New Business</h5>
            <form>

              {/* ***Input business name*** */}
              {/* <label htmlFor="businessName">Enter business name.</label>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Business Name"
              /> */}

              {/* ***Select business name(after search)*** */}
              <div className="form-group">
              <label htmlFor="business">Business Name:</label>
              {/* If businesses exist in the database: */}
              {this.state.results.length ? (
                <select onChange={this.handleSelectedOption} defaultValue="">
                  <option value="" disabled>Select your option</option>
                  {this.state.results.map(place => (
                    <option
                      key={place.id}
                      value={[place.name,place.id]}
                    >
                      {place.name}
                    </option>
                  ))}
                </select>
              // Default message if no business exists in the database.
              ) : (
                <h3>Search for the name or type of the business.</h3>
              )}
              </div>

              {/* ***Select day of deal*** */}
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

              {/* ***Input start & end times for the deal*** */}
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

              {/* ***Describe the deal*** */}
              <label htmlFor="description">Enter a description of the deal.</label>
              <TextArea
                // className="description"
                name="info"
                placeholder="Description"
                type="textarea"
                value={this.state.info}
                onChange={this.handleInputChange}
              />

              {/* ***Submit the new business into the database with its first deal*** */}
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
