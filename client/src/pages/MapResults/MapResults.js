import React, { Component } from "react";
import SearchBar from "../../components/SearchBar";
import MyMapComponent from "../../components/Maps";
import API from "../../utils/API";
import "./MapResults.css";

//NEXT STEPS: integrate geolocation(navigator) logic to function ComponentDidMount, then pass that to our search
//will require new state and custom methods
//this component will be refactored to contain a method that stores state for google api results
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
      console.log(position)
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    });
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
    this.searchGoogle(this.state.search, this.state.center);
  };

  searchGoogle(query, loc) {
    console.log("google has been searched")
    API.getPlaces(query, loc)
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
