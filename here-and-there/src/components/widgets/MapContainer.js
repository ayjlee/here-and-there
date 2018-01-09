import {GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import CurrentMap from './CurrentMap';
import SearchBox from  './SearchBox';
import MapMarker from './MapMarker';
import InfoWindow from './InfoWindow';

export class MapContainer extends React.Component {
  // getInitialState() {
  //   return {
  //     showingInfoWindow: false,
  //     activeMarker: {},
  //     selectedPlace: {},
  //   };
  // }
  // TODO: Refactor onClick={this.onMarkerClick.bind(this) to not use the bind method;
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }
  onMarkerClick(props, marker, e) {
    console.log(this);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }
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
        <CurrentMap google={this.props.google}>
          <MapMarker />
          <MapMarker position={pos} name={'Made up name'} onClick={this.onMarkerClick.bind(this)}/>
          <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
            <div>
              <h2> this is the info window </h2>
              <p>Name: {this.state.selectedPlace.name} </p>
            </div>

          </InfoWindow>
        </CurrentMap>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAPI_KEY,
  libraries: ['places', 'visualization'],
})(MapContainer);
