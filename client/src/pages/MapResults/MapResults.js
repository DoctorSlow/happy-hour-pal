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
    this.dbCompare = this.dbCompare.bind(this);
  }
  //include state for matched results (ids from api call that match businesssss in our DB)
  state = {
    results: [],
    search: "",
    center: null,
    autores: [],
    dbBusinesses: [],
    matched: []
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
    })
    setTimeout(() => {
      this.autoSearch(this.state.center.lat, this.state.center.lng);
    }, 1500);
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
    this.searchGoogle(this.state.search, this.state.center.lat, this.state.center.lng);
  };

  autoSearchSumbit = event => {
    event.preventDefault();
    this.autoSearch(this.state.center.lat, this.state.center.lng);
  }

  //queries the places api and loads results into this components result state MANUAL SEARCH
  searchGoogle(query, lat, lng) {

    API.getPlaces(query, lat, lng)
      .then(res =>
        this.setState({ results: res.data.results })
      )
      .catch(err => console.log(err));
  };

  //new google api query that runs without user input
  autoSearch(lat, lng) {

    API.autoPlaces(lat, lng)
      .then(res =>
        this.setState({ autores: res.data.results }, this.getDbBusiness)
      )
      .catch(err => console.log(err));
  };

  getDbBusiness = () => {
    //straightforward api call to grab all our stored business data
    API.getBusinesses()
      .then(res =>
        this.setState({ dbBusinesses: res.data }, () => {
          //dbCompare is used as a CB to avoid async setState issues
          this.dbCompare(this.state.dbBusinesses, this.state.autores)
        })
      )
      .catch(err => console.log(err));
  }

  dbCompare(dbBiz, googleBiz) {
    //db objects will now be in an array with corresponding id as a KEY and business object as VALUE
    let knownPlaces = dbBiz.reduce((translated, kPlace) => {
      translated[kPlace.googleID] = kPlace;
      return translated;
    }, {});
    //finds the chosen ones, where our ids between db and google api match
    let matchedPlaces = googleBiz.reduce((matched, currentPlace) => {
      if (knownPlaces.hasOwnProperty(currentPlace.id)) {
        matched.push({ ...currentPlace, ...knownPlaces[currentPlace.id] });
      }
      return matched;
    }, []);

    console.log(matchedPlaces);
    //results is the state that markers are generated from
    this.setState({ results: matchedPlaces })
  }

  render() {

    return (
      <div className="mapHeight">
        <SearchBar onClick={this.handleSearchSubmit} autoClick={this.autoSearchSumbit} onChange={this.handleInputChange} />
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
