import React, { Component } from "react";
import Container from "../../components/Container";
import Col from "../../components/Col";
import Row from "../../components/Row";
import { Input, TextArea } from "../../components/Form";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import API from "../../utils/API";
import "./SubmitEdit.css";

class AddDeal extends Component {

  constructor() {
    super();
    this.state = {
      business: {},
      modal: false,
      modalMessage: ""
    };
    this.handleInputChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    console.log(this.props.match)
    API.getBusiness(this.props.match.params.id)
    .then(res => {
      this.setState({
        business: res.data[0],
        googleID: res.data[0].googleID,
      })
      console.log(res.data)
    })
    .catch(err => console.log(err));
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (! this.state.googleID || ! this.state.day || ! this.state.beginTime || ! this.state.endTime || ! this.state.info) {
      this.setState({
        modal: !this.state.modal,
        modalMessage: "Please fill out all fields!"
      });
    } else {
      const select = document.getElementById('businessName');
      const businessId = select.getAttribute('data-id');
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
            setTimeout(function() {
              const origin = window.location.origin;
              window.location.replace(origin + "/businessdetails/" + dealData.data.googleID)
            }, 3000)
          }
        )
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
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

                <form>

                  <div className="form-group">
                    <h5
                      className="selected-biz"
                      id="businessName"
                      data-id={this.state.business._id}
                      value={this.state.business.googleID}
                    >
                      {this.state.business.name}
                    </h5>

                  </div>

                  <label className="day-input gray">
                    Choose a day from this list:
                    <select
                      className="select-day shadow-sm"
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

                  <label htmlFor="dealTimes" className="gray">Select the start and end times of the deal</label>
                  <div className="form-row mx-0">
                    <Input
                        value={this.state.beginTime}
                        onChange={this.handleInputChange}
                        type="time"
                        id="appt-time"
                        name="beginTime"
                        required
                    />
                    <p className="timeframe">—</p>
                    <Input
                        value={this.state.endTime}
                        onChange={this.handleInputChange}
                        type="time"
                        id="appt-time"
                        name="endTime"
                        required
                    />
                  </div>

                  <label htmlFor="description" className="gray">Enter a description for the deal</label>
                  <TextArea
                    name="info"
                    placeholder="Description"
                    type="textarea"
                    value={this.state.info}
                    onChange={this.handleInputChange}
                  />

                  <Button
                    className="btn teal-btn btn-block shadow"
                    onClick={this.handleFormSubmit}
                    color="#2296a2ff"
                  >
                    Submit New Happy Hour
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

export default AddDeal;
