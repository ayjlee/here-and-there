import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import CurrentMap from './CurrentMap';

// const { REACT_APP_GMAPI_KEY } = process.env;

export class MapContainer extends Component {
  render() {
    const style = {
      width: '300px',
      height: '300px',
    }
    const pos = { lat: 37.759703, lng: -122.428093 };
    return (
      <div className= "map-container2" style={style}>
        <Map google={this.props.google} initialCenter={{
            lat: 47.6062,
            lng: -122.3321
          }}>
          <Marker / >
          <Marker position= {pos} />
        </Map>
      </div>
    )
  }
}
console.log(process.env.REACT_APP_GMAPI_KEY);
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAPI_KEY,
  libraries: ['places', 'visualization'],
})(MapContainer);
