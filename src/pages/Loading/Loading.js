import React from "react";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";
import "./Loading.css";

// Shows when app is first opened and loading
const Loading = () => (
  <div>
    <Container>
      <Row>
        <Col size="md-12">
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
