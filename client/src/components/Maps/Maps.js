// maintain a state on the parent to pass down to both listresults and mapresults pages
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import "./Maps.css";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 32.2226, lng: -110.9747 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 32.2226, lng: -110.9747 }} />}
    {props.isMarkerShown && <Marker position={{ lat: 32.220456, lng: -110.864508 }} />}
    {/* {props.isMarkerShown && <Marker position={{ lat: 32.2226, lng: -110.9747 }} />}
    {props.isMarkerShown && <Marker position={{ lat: 32.2226, lng: -110.9747 }} />}
    {props.isMarkerShown && <Marker position={{ lat: 32.2226, lng: -110.9747 }} />} */}

  </GoogleMap>
))

export default MyMapComponent;