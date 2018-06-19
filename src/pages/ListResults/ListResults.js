import React from "react";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";
import SearchBar from "../../components/SearchBar";
import "./ListResults.css";

const ListResults = () => (
  <div>
    <SearchBar />
    <Container>
      <Row>
        <Col size="md-12">

          {/* Business cards goes here */}

        </Col>
      </Row>
      <Row>
        <Col size="md-12">

          {/* Add new location option goes here */}

        </Col>
      </Row>
    </Container>
  </div>
);

export default ListResults;
