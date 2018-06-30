// maintain a state on the parent to pass down to both listresults and mapresults pages
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import "./Maps.css";

const MyMapComponent = withScriptjs(withGoogleMap(function (props) {
  console.log(props);
  return < GoogleMap
    defaultZoom={13}
    defaultCenter={props.center ? { lat: props.center.lat, lng: props.center.lng } : null}
  >
    {props.isMarkerShown && <Marker position={props.center ? { lat: props.center.lat, lng: props.center.lng } : null} title="You are here" />}

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