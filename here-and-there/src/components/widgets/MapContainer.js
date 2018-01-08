import {GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import CurrentMap from './CurrentMap';
import SearchBox from  './SearchBox';
import MapMarker from './MapMarker';

export class MapContainer extends React.Component {
  render() {
    const style = {
      width: '80vw',
      height: '80vh',
    };
    const pos = {
      lat: 47.6062,
      lng: -122.3321,
    };
    if (!this.props.loaded) {
      return <div>Loading Map Container...</div>
    }
    return (
      <div>
        <SearchBox google={this.props.google}/>
        <CurrentMap google= {this.props.google}>
          <MapMarker />
          <MapMarker position={pos} />
        </CurrentMap>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAPI_KEY,
  libraries: ['places', 'visualization'],
})(MapContainer);
