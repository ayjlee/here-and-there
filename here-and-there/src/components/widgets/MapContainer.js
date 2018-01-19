import {GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import axios from 'axios';
import CurrentMap from './CurrentMap';
import SearchBox from  './SearchBox';
import MapMarker from './MapMarker';
import InfoWindow from './InfoWindow';
import ViewMapPane from '../panes/ViewMapPane';
import ViewMarkerDetailsContent from './ViewMarkerDetailsContent';

export class ViewMapContainer extends React.Component {
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
      map: null,
      data: {},
      selectedMarker: null,
    };
    // this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.onMapAdded = this.onMapAdded.bind(this);
    this.loadMapDataFromServer = this.loadMapDataFromServer.bind(this);
  }
  componentDidMount() {
    this.loadMapDataFromServer();
  }
  onInfoWindowClose() {
    console.log('in ViewMapContainer.onInfoWindowClose()');
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
    });
  }
  onMapClick() {
    console.log( 'in ViewMapContainer onMapClick()');
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }
  // onMarkerClick(props, marker, e) {
  //   console.log(this);
  //   console.log(e.latlng);
  //   // this.setState({
  //   //   selectedPlace: props,
  //   //   selectedMarker: marker,
  //   //   showingInfoWindow: true,
  //   // });
  // }
  onMapAdded(map) {
    this.setState({
      map: map,
    });
    console.log('in onMapAdded, after we set state, this is:');
    console.log(this);
  }
  loadMapDataFromServer() {
    console.log('in loadMapDatafromServer in ViewMapcontainer, the map url is:')
    const map_id = this.props.match.params.map_id;
    const map_url = `${this.props.url}/${map_id}`;
    console.log(map_url)
    axios.get(map_url)
    .then((res) => {
      this.setState({ data: res.data });
      console.log('the data after the map fetch is: ');
      console.log(this.state.data);
    });
  }
  render() {
    const map = this.state.map;
    const detailsRoot = document.getElementById('marker-details-pane');
    const mapVisualNodes = (this.state.data.savedMarkers && this.state.data.savedMarkers.length > 0) ? (this.state.data.savedMarkers.map((marker) => {
      return (
        <MapMarker key={marker.place_id} position={marker.position} name={marker.place_name} onClick={this.onMarkerClick} >
            <InfoWindow key={marker.place_id} marker={marker} visible={false} onClose={this.onInfoWindowClose}>
              <div id="info-window-content">
                <h2> this is the info window </h2>
                <p>Name: {marker.place_name} </p>
                <img src="" width="16" height="16" id="place-icon" />
                <span id="place-name"  className="title"></span>
                <span id="place-address"></span>
                <p> Available Place info: {marker.place_id} </p>
              </div>
            </InfoWindow>
        </MapMarker >
      );
    })
    ) : null;
    const placeDetails = (this.state.selectedMarker) ? (
      <ViewMarkerDetailsContent place={this.state.selectedMarker} map={map} editingMap={this.state.data} addMarkerToMap={(marker) => this.saveMarkerToMap(marker)} root={detailsRoot} />
    ) : null;
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
      <section id="view-map-container">
        <ViewMapPane mapData={this.state.data} onMarkerSelect= {selectedMarker => this.setState({ selectedMarker })} />
        <div className="holds-map">
          <CurrentMap google={this.props.google} onClick={this.onMapClick} action={this.onMapAdded} >
            {mapVisualNodes}
          </CurrentMap>
          <div id="marker-details-pane">
            <p> This will hold details about a particular place/marker </p>
            {placeDetails}
          </div>
        </div>
      </section>
    );
  }
}
ViewMapContainer.defaultProps = {
  zoom: 13,
  // Seattle location by default
  initialCenter: {
    lat: 47.6062,
    lng: -122.3321,
  },
  centerAroundCurrentLocation: false,
  savedToAccount: false,
  map_id: '5a58014c1985bc3c3dd8a041',
  url: 'http://localhost:3001/api/maps',
  pollInterval: 10000,
  onDragend() {
    console.log('moving');
  },
  onClick() {
    console.log('clicking');
  },
  onReady() {
    console.log('ready');
  }
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAPI_KEY,
  libraries: ['places', 'visualization'],
})(ViewMapContainer);

// const markerItemNodes = this.state.data.savedMarkers.map(marker => { return (
//     <MapMarker key={marker._id} className="mapMarker" marker={marker} name={marker.place_nsme} onClick={this.onMarkerClick} />
//   );
// });


// <MapMarker position={pos} name={'Made up name'} onClick={this.onMarkerClick} />
// <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onInfoWindowClose}>
//   <div>
//     <h2> this is the info window </h2>
//     <p>Name: {this.state.selectedPlace.name} </p>
//   </div>
//
// </InfoWindow>
