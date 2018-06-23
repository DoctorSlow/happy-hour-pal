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
      name: "",
      day: "",
      beginTime: "",
      endTime: "",
      info: ""
    };
    this.handleInputChange.bind(this);
  }

  // state = {
  //   businesses: [],
  //   name: "",
  //   // days: [], // Not sure if this should be an array - Stef
  //   day: "",
  //   beginTime: "", // Not sure how to input if there are multiple start and end times (multiple happy hours in a day) - Stef
  //   endTime: "",
  //   info: ""
  // };

  componentDidMount() {
    console.log("loaded");
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name) {
      API.saveBusiness({
        name: this.state.name,
        day: this.state.day,
        beginTime: this.state.beginTime,
        endTime: this.state.endTime,
        info: this.state.info
      })
        .then(console.log("ok"))
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
            <h5 className="title">Add New Business</h5>
            <form>

              <label htmlFor="businessName">Enter business name.</label>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Business Name"
              />

              <label>
                Choose a day from this list:
                <select
                  name="day"
                  type="select"
                  value={this.state.day}
                  selected={this.state.day}
                  onChange={this.handleInputChange}
                >
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
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
                    min="9:00"
                    max="18:00"
                    required
                />
                <p className="timeframe">to</p>
                <Input
                    value={this.state.endTime}
                    onChange={this.handleInputChange}
                    type="time"
                    id="appt-time"
                    name="endTime"
                    min="9:00"
                    max="18:00"
                    required
                />
              </div>

              <label htmlFor="description">Enter a description of the deal.</label>
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
