import React, { Component } from "react";
import SearchBar from "../../components/SearchBar";
import Container from "../../components/Container";
import Col from "../../components/Col";
import Row from "../../components/Row";
import { Input, TextArea } from "../../components/Form";
import { Button } from 'reactstrap';
import Select from 'react-select'; // Multiselector
import 'react-select/dist/react-select.css'; // Multiselector formatting
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
      info: "",
      stayOpen: true,
      selectedOption: ''
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

  // Multiselect function
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`);
    }
  }

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

    const { selectedOption, stayOpen } = this.state; // Multiselector states

    return (
      <div className="form-addbusiness">
      {/* <SearchBar /> */}
      <Container>
        <Row>
          <Col size="sm-12 md-12 lg-12">

            {/* Display name of business here, get data from button then submit to db with form data */}

            <form>

              <div className="form-group">
                <label htmlFor="business">Business Name:</label>
                {/* If businesses exist in the database: */}
                {this.state.businesses.length ? (
                  // Selecting a business fires loadTargetBusiness.
                  // <select onChange={this.state.loadTargetBusiness}>
                  <select id="businessSelect" className="business-name" onChange={this.handleSelectedOption}>
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

              <label className="day-input">
                Choose a day from this list:
                <select
                  className="select-day"
                  name="day"
                  type="select"
                  value={this.state.day}
                  selected={this.state.day}
                  onChange={this.handleInputChange}
                >
                  <option value="0">Sunday</option>
                  <option value="1">Monday</option>
                  <option value="2">Tuesday</option>
                  <option value="3">Wednesday</option>
                  <option value="4">Thursday</option>
                  <option value="5">Friday</option>
                  <option value="6">Saturday</option>
                </select>
              </label>

              {/* Multiple select */}
              <Select
                multi
                closeOnSelect={!stayOpen}
                // stayOpen // not working
                name="form-field-name"
                value={selectedOption}
                onChange={this.handleChange}
                placeholder="Select days for the deal"
                options={[
                  { value: '0', label: 'Sun' },
                  { value: '1', label: 'Mon' },
                  { value: '2', label: 'Tue' },
                  { value: '3', label: 'Wed' },
                  { value: '4', label: 'Thu' },
                  { value: '5', label: 'Fri' },
                  { value: '6', label: 'Sat' },
                ]}
              />

              <label htmlFor="dealTimes" className="time-input-label">Select the start and end times of the deal.</label>
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

              <Button
                className="btn-primary orange-btn btn-block"
                onClick={this.handleFormSubmit}
              >
                Update Happy Hour Special
              </Button>

            </form>
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default AddBusiness;
