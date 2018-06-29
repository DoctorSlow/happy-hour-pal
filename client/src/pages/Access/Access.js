import React from "react";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";
import "./Access.css";

// Inform user location services allows better user experience
const Access = () => (
  <div className="access-page">
    <Container>
      <Row>
        <Col size="md-12">
          <div className="width">
            <img className="map-logo" src="/assets/images/maplogo.png" alt="map-logo" />
            <h5 className="access-note">
              Allow access to Geolocation services for faster and more accurate results.
            </h5>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

// *************************************************************
// Insert google location pop up here after timeout - 3s? 
// Then load ResultsList page
// *************************************************************

export default Access;
