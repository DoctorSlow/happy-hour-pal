import React from "react";
// import Container from "../../components/Container";
// import Row from "../../components/Row";
// import Col from "../../components/Col";
import SearchBar from "../../components/SearchBar";
import "./MapResults.css";

const MapResults = () => (
  <div className="mapHeight">
    <SearchBar />
    <div className="mapHeight" id="map"></div>
  </div>
);

export default MapResults;
