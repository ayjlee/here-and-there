import {GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import axios from 'axios';
import CurrentMap from './CurrentMap';
import SearchBox from  './SearchBox';
import MapMarker from './MapMarker';
import InfoWindow from './InfoWindow';
import ViewMapPane from '../panes/ViewMapPane';
import ViewMarkerDetailsContent from './ViewMarkerDetailsContent';
import { Link } from 'react-router-dom';
import MapMarkersList from '../widgets/MapMarkersList';
import NoteList from './NoteList';

export class ViewMapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      showMarkerDetails: false,
      activeMarker: {},
      activeMarkerIdx: null,
      selectedPlace: null,
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
    this.toggleDetailsView = this.toggleDetailsView.bind(this);
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
        selectedPlace: null,
      });
    }
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
    this.viewMarker(props.idx);
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
    console.log('viewing marker in map container');
    const viewingMarker = this.state.currentMarkers[idx];
    this.setState({
      showPlaceDetails: true,
      selectedMarker: viewingMarker,
    });
  }
  toggleDetailsView() {
    console.log('toggling details view');
    this.setState({
      showPlaceDetails: false,
      showingPlace: {},
      showMarkerDetails: false,
      activeMarker: {},
      activeMarkerIdx: null,
      showingInfoWindow: false,
    });
  }
  render() {
    const map = this.state.map;
    const detailsRoot = document.getElementById('marker-details-pane');
    const mapVisualNodes = (this.state.currentMarkers && this.state.currentMarkers.length > 0) ? (this.state.currentMarkers.map((marker, idx) => {
      return (
        <MapMarker key={marker.place_id} idx={idx} iconLink={'/pal4/icon47.png'} position={marker.position} name={marker.place_name} markerData={marker} onClick={this.onMarkerClick} />
      );
    })
    ) : null;
    const placeDetails = (this.state.showPlaceDetails) ? (
      <ViewMarkerDetailsContent marker={this.state.selectedMarker} map={map}  isEditing={false} editingMap={this.state.data} root={detailsRoot} addMarkerToMap={(marker) => this.saveMarkerToMap(marker)} toggleDetailsView={() => this.toggleDetailsView()} root={detailsRoot} />
    ) : null;
    const style = {
      width: '80vw',
      height: '80vh',
    };
    const pos = {
      lat: 47.6062,
      lng: -122.3321,
    };
    const description = this.state.data.description ? <p>{this.state.data.description} </p> : <p> No Description</p>;

    const currentName = this.state.selectedPlace ? this.state.selectedPlace.name : null;

    // const currentNotes = (this.state.selectedPlace && this.state.selectedPlace.markerData.notes.length > 0) ?
    //   <NoteList notes={this.state.selectedPlace.markerData.notes} updateCurrentNotes={ updatedNotes => this.updateNotes(updatedNotes)} isEditing={false}/> : null;
     if (this.state.selectedPlace) {
       const markerData= this.state.selectedPlace.markerData
       console.log(markerData);

     };
    //  //
    //  const currentNotes = <p>null</p>

    if (!this.props.loaded) {
      return <div>Loading Map Container...</div>
    }
    return (
      <section id="view-map-container">
        <section id="view-map-pane" className="sidepane-placeholder">
          <div className="link-div">
            <Link to={{
              pathname: '/library',
              state: { selectedMap: null }
            }} className="map-link">Back to Library</Link>
            <Link to={{
              pathname: `/edit-map/${this.state.data._id}`,
              state: { selectedMap: null }
            }} className="map-link" > Edit Map </Link>
          </div>

          <div id="view-pane-header">
            <p>Map:  </p>
            <h2> {this.state.data.name} </h2>
            <strong><p> Author: {this.state.data.author} </p></strong>
            {description}
          </div>
          <div id="marker-details-pane">
            {placeDetails}
          </div>
          <MapMarkersList mapData={this.state.data} savedMarkers={this.state.data.savedMarkers} isEditing={false} onViewMarker={(idx) => this.viewMarker(idx)} onMarkerSelect={selectedMarker => this.setState({ selectedMarker })}/>
        </section>
        <div className="holds-map">
          <CurrentMap currentMap={this.state.data}  google={this.props.google} onClick={this.onMapClick} action={this.onMapAdded} >
            {mapVisualNodes}
            <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onInfoWindowClose}>
              <div id="info-window-content">
                <p><strong>Name: {currentName} </strong></p>
                <p>Notes: </p>
              </div>
            </InfoWindow>
          </CurrentMap>
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
