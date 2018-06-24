import React from "react";
// import Container from "../../components/Container";
// import Row from "../../components/Row";
// import Col from "../../components/Col";
import SearchBar from "../../components/SearchBar";
import "./MapResults.css";

//refactor to class, give searchbar a onSearch function, after the data has been grabbed pass that data to the map 
const MapResults = () => (
  // handleSearch() {

  // }
  <div className="mapHeight">
    <SearchBar onSearch={this.handleSearch} />
    <div className="mapHeight" id="map"></div>
  </div>
);

export default MapResults;
