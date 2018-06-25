import React, { Component } from "react";
// import Container from "../../components/Container";
// import Row from "../../components/Row";
// import Col from "../../components/Col";
import SearchBar from "../../components/SearchBar";
import API from "../../utils/API";
import "./MapResults.css";

//this component will be refactored to contain a method that stores state for google api results 

class MapResults extends Component {

  state = {
    results: [],
    search: ""
  };

  //allows state changes(right now just the search parameter) to be updated live
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSearchSubmit = event => {
    event.preventDefault();
    this.searchGoogle(this.state.search);
  };

  searchGoogle(query) {
    console.log("google has been searched")
    API.getPlaces(query)
      .then(res =>
        this.setState({ results: res.data.results })
        // if(this.props.onSearch) {
        //     this.props.onSearch(res.data.results);
        // }
      )
      .catch(err => console.log(err));
  };

  render() {

    return (
      <div className="mapHeight">
        <SearchBar onClick={this.handleSearchSubmit} onChange={this.handleInputChange} />
        <div className="mapHeight" id="map"></div>
      </div>
    )
  }
}

export default MapResults;
