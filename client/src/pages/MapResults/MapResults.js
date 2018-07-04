/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from "react";
import SearchBar from "../../components/SearchBar";
import MyMapComponent from "../../components/Maps";
// import DetailModal from "../../components/DetailModal";
import API from "../../utils/API";
import "./MapResults.css";

//This component contains logic for both our google api search and sending those results to 
//be generated on the map
class MapResults extends Component {

  constructor(props) {
    super(props);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  state = {
    results: [],
    search: "",
    center: null
  };
  //automatically grab current location 
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    });
  };
  //allows state changes(right now just the search parameter) to be updated live
  //this isnt necessary
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  //on sumbit take search and geo states to be entered in places search
  handleSearchSubmit = event => {
    event.preventDefault();
    let lat = this.state.center.lat;
    let lng = this.state.center.lng;
    this.searchGoogle(this.state.search, lat, lng);
  };
  //queries the places api and loads results into this components result state
  searchGoogle(query, lat, lng) {

    API.getPlaces(query, lat, lng)
      .then(res =>
        this.setState({ results: res.data.results })
      )
      .catch(err => console.log(err));
  };

  render() {

    return (
      <div className="mapHeight">
        <SearchBar onClick={this.handleSearchSubmit} onChange={this.handleInputChange} />
        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD_2mmRZkUnIuOqeIxJRjKZjDadVGB1i0E"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          center={this.state.center}
          results={this.state.results}
        />
      </div>
    )
  };
}

export default MapResults;
