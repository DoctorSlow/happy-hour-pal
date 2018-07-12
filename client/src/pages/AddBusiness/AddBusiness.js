import React, { Component } from "react";
import SearchInput from "../../components/SearchInput";
import Container from "../../components/Container";
import Col from "../../components/Col";
import Row from "../../components/Row";
import { TextArea, Input } from "../../components/Form";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select from 'react-select'; // Multiselector
import 'react-select/dist/react-select.css'; // Multiselector formatting
import API from "../../utils/API";
import "./AddBusiness.css";

class AddBusiness extends Component {

  constructor() {
    super();
    // this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      busName: "",
      googleID: "",
      name: "",
      day: "",
      beginTime: "",
      endTime: "",
      info: "",
      results: [],
      search: "",
      center: null,
      stayOpen: true,
      selectedOption: '',
      modal: false,
      modalMessage: ""
    };
    this.handleInputChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  //automatically grab current location 
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    });
  };

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

  //take the text and search with it
  handleNameSearchSubmit = event => {
    event.preventDefault();
    this.nameSearchGoogle(this.state.search, this.state.center.lat, this.state.center.lng);
  };

  //search without any text input 
  handleAutoSearchSubmit = event => {
    event.preventDefault();
    this.autoSearchGoogle(this.state.center.lat, this.state.center.lng);
  };

  // Multiselect function
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`);
    }
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  };

  //queries the places api and loads results into this components result state NO TEXT
  autoSearchGoogle(lat, lng) {
    API.autoPlaces(lat, lng)
      .then(res =>
        this.setState({ results: res.data.results })
      )
      .catch(err => console.log(err));
  };

  //queries the places api WITH USER TEXT
  nameSearchGoogle(search, lat, lng) {
    API.getPlaces(search, lat, lng)
      .then(res =>
        this.setState({ results: res.data.results })
      )
      .catch(err => console.log(err));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (!this.state.googleID || !this.state.day || !this.state.beginTime || !this.state.endTime || !this.state.info) {
      // alert("All fields must be filled out");
      this.setState({
        modal: !this.state.modal,
        modalMessage: "Please fill out all fields!"
      });
    } else {
      // First, save the business as a new document.
      API.saveBusiness({
        name: this.state.name,
        googleID: this.state.googleID
      })
        .catch(err => console.log(err))
        .then(
          function (newBusiness) {
            console.log(newBusiness.data);
            // alert(newBusiness.data.name + " added");
            const business = newBusiness.data;
            const businessId = business._id;
            const select = document.getElementById('daySelect');
            const selectedOption = select[select.selectedIndex];
            //const dealDay = selectedOption.getAttribute('value');
            const dealDay = selectedOption.value;
            const dealStart = document.getElementById('beginTime').value;
            const dealEnd = document.getElementById('endTime').value;
            const dealInfo = document.getElementById('info').value;

            // Take the data from the new business to use for referencing the new deal for it.
            return API.saveDeal(businessId, {
              busName: business.name,
              googleID: business.googleID,
              day: dealDay,
              beginTime: dealStart,
              endTime: dealEnd,
              info: dealInfo
            }),
              setTimeout(function () {
                const origin = window.location.origin;
                window.location.replace(origin + "/businessdetails/" + business.googleID)
              }, 3000)
          }

        )
        .catch(err => console.log(err));
    }

  };

  render() {

    const { selectedOption, stayOpen } = this.state; // Multiselector states

    return (
      <div className="mapHeight background">
        {/* <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}> */}
        <Modal isOpen={this.state.modal}>
          {/* <ModalHeader toggle={this.toggle}>Modal title</ModalHeader> */}
          <ModalBody>
            {/* Please fill out all fields! */}
            {this.state.modalMessage}
          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
            <Button color="#2296a2ff" className="btn orange-btn" onClick={this.toggle}>Okay</Button>
          </ModalFooter>
        </Modal>
        <div className="form-addbusiness">
          <Container>
            <Row>
              <Col size="sm-12 md-12 lg-12">

                <h5 className="title gray">ADD NEW DEAL</h5>

                <label htmlFor="business" className="search-label gray">Find the business</label>
                <SearchInput
                  className="search-input"
                  nameClick={this.handleNameSearchSubmit}
                  autoClick={this.handleAutoSearchSubmit}
                  onChange={this.handleInputChange}
                />

                <form>
                  {/* ***Select business name(after search)*** */}
                  <div className="form-group business-name">
                    {/* <label className="business-name" htmlFor="business">Business Name: </label> */}
                    {/* If businesses exist in the database: */}
                    {this.state.results.length ? (
                    <label htmlFor="description" className="gray select-biz-label">Select the business
                      <select className="biz-dropdown" onChange={this.handleSelectedOption} defaultValue="">
                        <option value="" disabled>Select business</option>
                        {this.state.results.map(place => (
                          <option
                            key={place.id}
                            value={[place.name, place.id]}
                          >
                            {place.name}
                          </option>
                        ))}
                      </select>
                      </label>
                      // Default message before search..
                    ) : (
                        <h3></h3>
                      )}
                  </div>

                  {/* ***Select day of deal*** */}
                  <label className="day-input gray">
                    Choose a day from this list:
                    <select
                      className="select-day shadow-sm"
                      name="day"
                      type="select"
                      id="daySelect"
                      value={this.state.day}
                      selected={this.state.day}
                      onChange={this.handleInputChange}
                    >
                      <option value="" disabled>Select the day</option>
                      <option value="0">Sunday</option>
                      <option value="1">Monday</option>
                      <option value="2">Tuesday</option>
                      <option value="3">Wednesday</option>
                      <option value="4">Thursday</option>
                      <option value="5">Friday</option>
                      <option value="6">Saturday</option>
                    </select>
                  </label>

                  {/* FUTURE: Multiple select */}
                  {/* <Select
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
                  /> */}

                  {/* ***Input start & end times for the deal*** */}
                  <label htmlFor="dealTimes" className="gray">Select start and end times of the deal</label>
                  <div className="form-row mx-0">
                    <Input
                      value={this.state.beginTime}
                      onChange={this.handleInputChange}
                      type="time"
                      id="beginTime"
                      name="beginTime"
                      required
                    />
                    <p className="timeframe">—</p>
                    <Input
                      value={this.state.endTime}
                      onChange={this.handleInputChange}
                      type="time"
                      id="endTime"
                      name="endTime"
                      required
                    />
                  </div>

                  {/* ***Describe the deal*** */}
                  <label htmlFor="description" className="gray">Enter a description of the deal</label>
                  <TextArea
                    name="info"
                    id="info"
                    placeholder="Description"
                    type="textarea"
                    value={this.state.info}
                    onChange={this.handleInputChange}
                  />

                  {/* ***Submit the new business into the database with its first deal*** */}
                  <Button
                    className="btn orange-btn btn-block shadow"
                    onClick={this.handleFormSubmit}
                    color="#b66925ff"
                  >
                    Submit New Happy Hour Special
                  </Button>

                </form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default AddBusiness;
