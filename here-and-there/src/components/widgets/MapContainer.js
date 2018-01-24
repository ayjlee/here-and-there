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
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      showMarkerDetails: false,
      activeMarker: {},
      activeMarkerIdx: null,
      selectedPlace: {},
      map: null,
      data: {},
      currentMarkers: [],
      showPlaceDetails: false,
      showingPlace: {},
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.onMapAdded = this.onMapAdded.bind(this);
    this.loadMapDataFromServer = this.loadMapDataFromServer.bind(this);
    this.viewMarker = this.viewMarker.bind(this);
  }
  componentDidMount() {
    this.loadMapDataFromServer();
  }
  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
    });
  }
  onMapClick() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }
  onMapAdded(map) {
    this.loadMapDataFromServer();
    this.setState({
      map: map,
    });
  }
  loadMapDataFromServer() {
    const map_id = this.props.match.params.map_id;
    const map_url = `${this.props.url}/${map_id}`;
    axios.get(map_url)
    .then((res) => {
      this.setState({ data: res.data, currentMarkers: res.data.savedMarkers });
    });
  }
  viewMarker(idx) {
    const viewingMarker = this.state.currentMarkers[idx];
    this.setState({
      showPlaceDetails: true,
      selectedMarker: viewingMarker,
    });
  }
  render() {
    const map = this.state.map;
    const detailsRoot = document.getElementById('marker-details-pane');
    const mapVisualNodes = (this.state.currentMarkers && this.state.currentMarkers.length > 0) ? (this.state.currentMarkers.map((marker) => {
      return (
        <MapMarker key={marker.place_id} iconLink={'/pal4/icon47.png'} position={marker.position} name={marker.place_name} markerData={marker} onClick={this.onMarkerClick} />
      );
    })
    ) : null;
    const placeDetails = (this.state.showPlaceDetails) ? (
      <ViewMarkerDetailsContent marker={this.state.selectedMarker} map={map} editingMap={this.state.data} addMarkerToMap={(marker) => this.saveMarkerToMap(marker)} root={detailsRoot} />
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
        <ViewMapPane mapData={this.state.data} viewMarker={(idx) => this.viewMarker(idx)} onMarkerSelect= {selectedMarker => this.setState({ selectedMarker })} />
        <div className="holds-map">
          <CurrentMap currentMap={this.state.data}  google={this.props.google} onClick={this.onMapClick} action={this.onMapAdded} >
            {mapVisualNodes}
            <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onInfoWindowClose}>
              <div id="info-window-content">
                <h2> this is the info window </h2>
                <p>Name: {this.state.selectedPlace.name} </p>
              </div>
            </InfoWindow>
          </CurrentMap>
          <div id="marker-details-pane">
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
  },
  onClick() {
  },
  onReady() {
  }
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAPI_KEY,
  libraries: ['places', 'visualization'],
})(ViewMapContainer);
