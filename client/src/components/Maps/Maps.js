// maintain a state on the parent to pass down to both listresults and mapresults pages
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import "./Maps.css";

const MyMapComponent = withScriptjs(withGoogleMap(function (props) {
  console.log(props);
  return < GoogleMap
    defaultZoom={13.5}
    defaultCenter={props.center ? { lat: props.center.lat, lng: props.center.lng } : { lat: 32.2226, lng: -110.974 }}
  >
    {props.isMarkerShown && <Marker position={props.center ? { lat: props.center.lat, lng: props.center.lng } : { lat: 32.2226, lng: -110.974 }} title="You are here--happy hours are near!" />}

    {
      props.results.map(mark => (
        <Marker
          position={{ lat: mark.geometry.location.lat, lng: mark.geometry.location.lng }}
          title={mark.name}
          place_id={mark.place_id}

        />
      ))
    }


  </GoogleMap >
}))


export default MyMapComponent;