import React from "react";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";
import SearchBar from "../../components/SearchBar";
import "./MapResults.css";

const MapResults = () => (
  <div>
    <SearchBar />
    <Container>
      <Row>
        <Col size="md-12">

          {/* Render map with results here */}
          
        </Col>
      </Row>
    </Container>
  </div>
);

export default MapResults;
