import {GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CurrentMap from './CurrentMap';
import SearchBox from  './SearchBox';
import MapMarker from './MapMarker';
import InfoWindow from './InfoWindow';
import NewNoteForm from '../forms/AddNoteForm';
import MapMarkersList from './MapMarkersList';
import EditMapPane from '../panes/EditMapPane';
import PlaceDetailsContent from './PlaceDetailsContent';
import AddMarkerLink from './AddMarkerLink';
import * as MdIconPack from 'react-icons/lib/md';

export class EditMapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      map: null,
      data: {},
      currentMarkers: [],
      showPlaceDetails: false,
      showingPlace: {},
    };
    let markerTypes = ['food', 'shopping', 'nature', 'beauty', 'night-life', 'drinking', 'desserts', 'daytime activities', 'nightlife', 'tourist/historic', 'photo-op']
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.onMapAdded = this.onMapAdded.bind(this);
    this.loadMapDataFromServer = this.loadMapDataFromServer.bind(this);
    this.saveMarkerToMap = this.saveMarkerToMap.bind(this);
    this.updatePlaceDetailsPane = this.updatePlaceDetailsPane.bind(this);
  }
  componentDidMount() {
    this.loadMapDataFromServer();
    // setInterval(this.loadMapDataFromServer, this.props.pollInterval);
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
    // if marker.savedtoMap?
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
  }
  onAddMarker(marker) {
    const updatedMarkers = [...this.state.currentMarkers, marker]
    this.setState({ currentMarker: updatedMarkers });
  }
  loadMapDataFromServer() {
    // console.log('in loadMapDatafromServer, the map url is:')
    const map_id = this.props.match.params.map_id;
    const map_url = `${this.props.url}/${map_id}`;
    axios.get(map_url )
    .then((res) => {
      this.setState({ data: res.data, currentMarkers: res.data.savedMarkers });
      // console.log('the data after the map fetch is: ');
      // console.log(this.state.data);
    });
  }
  updatePlaceDetailsPane(place) {
    console.log('in updateplace details pane');
    const currentState = this.state.showPlaceDetails;
    // return ReactDOM.createPortal(placeDetails, placeRoot);
    this.setState({ showPlaceDetails: !currentState, showingPlace: place });
  }
  displayMarkersForMap() {
    const markerNodes = this.state.data.savedMarkers.map((marker) => {
      return (
        <section className="place-display">
        <MapMarker map={this.state.map} google={this.props.google} position={marker.position} />
          <InfoWindow map={this.state.map}  google={this.props.google}  marker={this.state.activeMarker}  visible={this.state.showingInfoWindow} onClose={this.onInfoWindowClose}/>
        </section>
      )
    })

    const mapNodes = this.state.data.map(map => {
      return (
        <li key={map._id} map={map} className="myMap" onClick={this.onMyMapClick.bind(map)}>
          <h3> Map name: {map.name} </h3>
          <p>author: {map.author}, key: {map._id}, markers: {map.markers}</p>
        </li>
      );

    });
    return (
      <section id="my-map-list-container">
        <ul>
          { mapNodes }
        </ul>
      </section>
    );
  }
  saveMarkerToMap(marker) {
    // axios post or patch method for adding a marker to a place
    const map_url = `${this.props.url}/${this.props.map_id}`;
    const updatedMarkers = this.state.currentMarkers.push(marker);
    const updatedPlaces = this.state.data.savedPlaces.push(marker.place_id)
    axios.patch(map_url, {
      savedMarkers: updatedMarkers,
      savedPlaces: updatedPlaces,
    })
    .then((res) => {
      this.setState({ data: res.data, currentMarkers: res.data.savedMarkers});
      console.log('the data after the map fetch is: ');
      console.log(this.state.data);
    });
  }
  render() {
    const map = this.state.map;
    const detailsRoot = document.getElementById('place-note-details-pane');

    const placeDetails = (this.state.showPlaceDetails) ? (
      <PlaceDetailsContent place={this.state.showingPlace} map={map} root={detailsRoot} />
    ) : null;
    const style = {
      width: '40vw',
      height: '40vh',
    };
    const pos = {
      lat: 47.6062,
      lng: -122.3321,
    };
    const mapUrl = `${this.props.url}/${this.props.map_id}`;
    if (!this.props.loaded) {
      return <div>Loading Map Container...</div>
    }
    if (this.state.map) {
      // console.log('in map container rendering conditional, showing this.state.map');
      // console.log(this.state.map);
    }
    const mapData= this.state.data;
    return (
      <section id="map-container-section">
        <section id="edit-map-pane">
          <h2 className="page-name"> Currently Editing Map: {this.state.data.name} </h2>
          <h3> Author: {this.state.data.author} </h3>
          <div id="building-map-info">
            This will hold all of the info for the map we are currently building, including:
            <h3>List of Locations Saved to the Current Map:</h3>
              <MapMarkersList mapData={this.state.data} savedMarkers={this.state.currentMarkers} onAddMarker={this.addMarker}/>
          </div>
        </section>
        <div className="holds-map">
          <SearchBox google={this.props.google} map={this.state.map} mapData={this.state.data} showPlaceDetails={(place) => this.updatePlaceDetailsPane(place)} onAddMarker={(marker) => console.log(`marker to be added is : ${marker}`)}/>
          <CurrentMap google={this.props.google} onClick={this.onMapClick} action={this.onMapAdded} style={style}>
            <MapMarker />
            <MapMarker position={pos} name={'Made up name'} onClick={this.onMarkerClick} />
            <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}onClose={this.onInfoWindowClose}>
              <div id="info-window-content">
                <h2> this is the info window </h2>
                <p>Name: {this.state.selectedPlace.name} </p>
                <img src="" width="16" height="16" id="place-icon" />
                <span id="place-name"  className="title"></span>
                <span id="place-address"></span>
                <p> Available Place info: {this.state.selectedPlace.name} </p>
                  <h2> This is the form to add a new note</h2>
                  <NewNoteForm place={this.state.selectedPlace} marker={this.state.activeMarker} map={this.state.map} />
              </div>
            </InfoWindow>
          </CurrentMap>
        </div>
        <div id="place-note-details-pane">
          <p> This will hold details about a particular place/marker </p>
          {placeDetails}
        </div>
      </section>
    );
  }
}
EditMapContainer.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  centerAroundCurrentLocation: PropTypes.bool,
  savedToAccount: PropTypes.bool,
  action: PropTypes.func,
  map_id: PropTypes.string,
  url: PropTypes.string,
  pollInterval: PropTypes.number,
};
EditMapContainer.defaultProps = {
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
})(EditMapContainer);
