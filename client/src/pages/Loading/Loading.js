import React from "react";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";
import logo from "./quaillogo.png";
import "./Loading.css";

// Shows when app is first opened and loading
const Loading = () => (
  <div className="loading-page">
    <Container>
      <Row>
        <Col size="md-12">
          {/* Alt way to load image - both ok */}
          {/* <img className="quail-logo" src={logo} alt="quail-logo" /> */}
          <img className="quail-logo" src="/assets/images/quaillogo.png" alt="quail-logo" />

          <h3 className="welcome-message">Hello, welcome to HappyHourPal!</h3>
        </Col>
      </Row>
      <Row>
        <Col size="md-12">
          <p className="slogan">Find the best happy hour deals nearby.</p>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Loading;
