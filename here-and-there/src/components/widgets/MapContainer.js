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
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.onMapAdded = this.onMapAdded.bind(this);
  }
  onInfoWindowClose() {
    console.log('in MapContainer.onInfoWindowClose()');
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
    });
  }
  onMapClick() {
    console.log( 'in MapContainer onMapClick()');
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }
  onMarkerClick(props, marker, e) {
    console.log(this);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }
  onMapAdded(map) {
    this.setState({
      map: map,
    });
    console.log('in onMapAdded, after we set state, this is:');
    console.log(this);
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
        <CurrentMap google={this.props.google} onClick={this.onMapClick} action={this.onMapAdded}>
          <MapMarker position={pos} name={'Made up name'} onClick={this.onMarkerClick} />
          <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}onClose={this.onInfoWindowClose}>
            <div>
              <h2> this is the info window </h2>
              <p>Name: {this.state.selectedPlace.name} </p>
            </div>

          </InfoWindow>
        </CurrentMap>
        <div id="place-note-details-pane">
          <p> This will hold details about a particular place/marker </p>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAPI_KEY,
  libraries: ['places', 'visualization'],
})(MapContainer);
