import React, { Component } from "react";
import Container from "../../components/Container";
import Col from "../../components/Col";
import Row from "../../components/Row";
import { Input, TextArea } from "../../components/Form";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import API from "../../utils/API";
import "./SubmitEdit.css";

class EditDeal extends Component {

  constructor () {
    super ();
    this.state = {
      deal: [],
      googleID: "",
      day: "",
      beginTime: "",
      endTime: "",
      info: "",
      modal: false,
      modalMessage: ""
    };
    this.handleInputChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    API.getDeal(this.props.match.params.id)
      .then(res => {
        this.setState({
          deal: res.data,
          busName: res.data.busName,
          googleID: res.data.googleID,
          day: res.data.day,
          beginTime: res.data.beginTime,
          endTime: res.data.endTime,
          info: res.data.info,
        })
        console.log(this.state.deal)
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
      const id = this.state.deal._id;
      // console.log(id);

      API.modifyDeal( id, {
        busName: this.state.busName,
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
        <div className="form-addbusiness backgroud">
          <Container>
            <Row>
              <Col size="sm-12 md-12 lg-12">
                <h5 className="title gray">UPDATE DEAL</h5>

                <form>

                  {/* <div className="form-group">
                    <h3
                      // id="businessName"
                      // data-id={this.state.business._id}
                      // value={this.state.business.googleID}
                    >
                      {this.state.deal.info}
                    </h3>

                  </div> */}

                  <h5 className="selected-biz">{this.state.busName}</h5>

                  <label className="day-input gray">
                    Choose a day from this list:
                    <select
                      className="select-day"
                      name="day"
                      id="daySelect"
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

                  <label htmlFor="description" className="gray">Enter a description for the deal</label>
                  <TextArea
                    name="info"
                    placeholder="Description"
                    type="textarea"
                    value={this.state.info}
                    onChange={this.handleInputChange}
                  />

                  <Button
                    className="btn teal-btn btn-block"
                    onClick={this.handleFormSubmit}
                    color="#b66925ff"
                  >
                    Update Happy Hour
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

export default EditDeal;
