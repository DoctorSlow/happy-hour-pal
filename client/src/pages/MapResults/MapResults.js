import React, { Component } from "react";
import { GoogleMap, Marker } from "react-google-maps"
// import Container from "../../components/Container";
// import Row from "../../components/Row";
// import Col from "../../components/Col";
import SearchBar from "../../components/SearchBar";
import "./MapResults.css";

class MapResults extends Component {

  // Note: This example requires that you consent to location sharing when
  // prompted by your browser. If you see the error "The Geolocation service
  // failed.", it means you probably did not give permission for the browser to
  // locate you.
  //   var map, infoWindow;
  // function initMap() {
  //   map = new google.maps.Map(document.getElementById('map'), {
  //     center: { lat: -34.397, lng: 150.644 },
  //     zoom: 13
  //   });
  //   infoWindow = new google.maps.InfoWindow;

  //   // Try HTML5 geolocation.
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       var pos = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       };

  //       infoWindow.setPosition(pos);
  //       infoWindow.setContent('Nearby happy hours coming soon, pal.');
  //       infoWindow.open(map);
  //       map.setCenter(pos);
  //     }, function () {
  //       handleLocationError(true, infoWindow, map.getCenter());
  //     });
  //   } else {
  //     // Browser doesn't support Geolocation
  //     handleLocationError(false, infoWindow, map.getCenter());
  //   }
  // }

  // function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  //   infoWindow.setPosition(pos);
  //   infoWindow.setContent(browserHasGeolocation ?
  //     'Error: The Geolocation service failed.' :
  //     'Error: You must enable Geolocation services to use this app');
  //   infoWindow.open(map);
  // }




  render() {
    return (
      <div className="mapHeight">
        <SearchBar />
        <div className="mapHeight" id="map"></div>
      </div>
    )
  }
};

export default MapResults;
