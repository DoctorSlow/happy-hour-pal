import React, { Component } from "react";
import SearchBar from "../../components/SearchBar";
import Container from "../../components/Container";
import Col from "../../components/Col";
import Row from "../../components/Row";
import { Input, TextArea } from "../../components/Form";
import { Button } from 'reactstrap';
import API from "../../utils/API";
import "./SubmitEdit.css";

class AddDeal extends Component {
  state = {
    business: {}
  };

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

  handleFormSubmit = event => {
    event.preventDefault();
    if (! this.state.googleID || ! this.state.day || ! this.state.beginTime || ! this.state.endTime || ! this.state.info) {
      alert("All fields must be filled out");
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
      <div className="form-addbusiness">
      <Container>
        <Row>
          <Col size="md-6">

            <h5 className="title">ADD NEW DEAL</h5>

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

              <label htmlFor="dealTimes">Select the start and end times of the deal.</label>
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

              <label htmlFor="description">Enter a description for the deal.</label>
              <TextArea
                name="info"
                placeholder="Description"
                type="textarea"
                value={this.state.info}
                onChange={this.handleInputChange}
              />

              <Button
                className="btn orange-btn btn-block"
                onClick={this.handleFormSubmit}
                color="#b66925ff"
              >
                Submit New Happy Hour
              </Button>

            </form>
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default AddDeal;
