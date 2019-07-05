import React from "react";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";
// import logo from "./quaillogo.png";
import "./Contact.css";

const Contact = () => (
  <div className="contact-page">
    <Container>
      <Row>
        <Col size="md-12">
          {/* Alt way to load image - both ok */}
          {/* <img className="quail-logo" src={logo} alt="quail-logo" /> */}

          <img className="quail" src="/assets/images/quaillogo.png" alt="quail-logo" />

          <h5 className="contact-info"><a className="contact-info" href="mailto:contact@happyhourpal.com">Email us: contact@happyhourpal.com</a></h5>
        </Col>
      </Row>
      <Row>
        <Col size="md-12">
          <p className="thank-you-text">Thanks for stopping by!</p>
        </Col>
      </Row>
    </Container>
  </div>
)

export default Contact
