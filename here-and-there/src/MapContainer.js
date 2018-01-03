import {Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export class MapContainer extends Component {
  render() {
    const style = {
      width: '100vw',
      height: '100vh',
    }
    const pos = { lat: 37.759703, lng: -122.428093 };
    return (
      <div style={style}>
        <Map google={this.props.google}>
          <Marker / >
          <Marker position= {pos} />
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAPI_KEY,
  libraries: ['places', 'visualization'],
})(MapContainer);
