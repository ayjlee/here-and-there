import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import CurrentMap from './CurrentMap';

export class MapContainer extends Component {
  render() {
    const style = {
      width: '60vw',
      height: '100%',
    }
    const pos = { lat: 37.759703, lng: -122.428093 };
    return (
      <div className= "map-container2" style={style}>
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
