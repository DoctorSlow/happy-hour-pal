import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import "./Maps.css";
//Here we utilize the react-google-maps library to handle rendering components as map/map markers etc
//The two ternary functions handle our geolocation coords, if they exist, set map center to that, if not
//default to downtown tucson


const mapMarkerClick = function(Id, name, open) {
console.log(Id, name, open)

const origin = window.location.origin;
window.location.replace(origin + "/businessdetails/" + Id)
// this.history.push("/businessdetails/" + placeId);


const MyMapComponent = withScriptjs(withGoogleMap(function (props) {
  console.log(props);
  let iconMarker = new window.google.maps.MarkerImage(
    '/assets/images/quailpointerwhite.png',
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new window.google.maps.Size(28.9364, 39)
  );
  return < GoogleMap
    defaultZoom={13.5}
    defaultCenter={props.center ? { lat: props.center.lat, lng: props.center.lng } : { lat: 32.2226, lng: -110.974 }}
  >
    {props.isMarkerShown && <Marker position={props.center ? { lat: props.center.lat, lng: props.center.lng } : { lat: 32.2226, lng: -110.974 }} title="You are here--happy hours are near!" />}

    {
      props.results.map(mark => (
        <Marker

          icon={iconMarker}
          position={{ lat: mark.geometry.location.lat, lng: mark.geometry.location.lng }}
          title={mark.name}
          place_id={mark.place_id}
          clickable={true}

          onClick={()=>{mapMarkerClick(mark.id, mark.name, mark.opening_hours.open_now)}}
          


        />
      ))
    }

  </GoogleMap >
}))

export default MyMapComponent;