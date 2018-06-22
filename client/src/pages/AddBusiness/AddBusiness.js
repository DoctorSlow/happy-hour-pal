import React, { Component } from "react";
import SearchBar from "../../components/SearchBar";
import Container from "../../components/Container";
import Col from "../../components/Col";
import Row from "../../components/Row";
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import "./AddBusiness.css";

class AddBusiness extends Component {
  state = {
    businesses: [],
    name: "",
    days: [], // Not sure if this should be an array - Stef
    start: "", // Not sure how to input if there are multiple start and end times (multiple happy hours in a day) - Stef
    end: "",
    description: ""
  };

  componentDidMount() {
    this.loadBusinesses();
  }

  loadBusinesses = () => {
    API.getBusinesses()
      .then(res =>
        this.setState({ businesses: res.data, name: "", address: "", phone: "", link: "", description: "" })
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name && this.state.address && this.state.phone) {
      API.saveBusiness({
        name: this.state.name,
        address: this.state.address,
        start: this.state.start,
        end: this.state.end,
        description: this.state.description
      })
        .then(res => this.loadBusinesses())
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

              <label for="businessName">Enter business name.</label>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Business Name"
              />

              <label for="dealDays">Select the day(s) the deal is available.</label>
              <div id="days-div">
                <div id="days">
                    <button type="button" class="btn btn-dark days-btn">Monday</button>
                    <button type="button" class="btn btn-dark days-btn">Tuesday</button>
                    <button type="button" class="btn btn-dark days-btn">Tuesday</button>
                    <button type="button" class="btn btn-dark days-btn">Wednesday</button>
                    <button type="button" class="btn btn-dark days-btn">Thursday</button>
                    <button type="button" class="btn btn-dark days-btn">Friday</button>
                    <button type="button" class="btn btn-dark days-btn">Saturday</button>
                    <button type="button" class="btn btn-dark">Sunday</button>
                </div>
              </div>            

              <label for="dealTimes">Select the start and end times of the deal.</label>
              <div className="form-row">
                <Input                 
                    value={this.state.start}
                    onChange={this.handleInputChange}
                    type="time" 
                    id="appt-time" 
                    name="appt-time" 
                    min="9:00" 
                    max="18:00" 
                    required
                />
                <p className="timeframe">to</p>
                <Input                 
                    value={this.state.end}
                    onChange={this.handleInputChange}
                    type="time" 
                    id="appt-time" 
                    name="appt-time" 
                    min="9:00" 
                    max="18:00" 
                    required
                />
              </div>

              <label for="description">Enter a description of the deal.</label>
              <TextArea
                // className="description"
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description"
              />

              <FormBtn className="btn-primary" onClick={this.handleFormSubmit} >
                Submit New Business
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
