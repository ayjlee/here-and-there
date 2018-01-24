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
import EditPlaceDetailsContent from './EditPlaceDetailsContent';
import AddMarkerLink from './AddMarkerLink';
import SaveChangesButton from './SaveChangesButton';
import ViewMarkerDetailsContent from './ViewMarkerDetailsContent';

export class EditMapContainer extends React.Component {
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
    let markerTypes = ['food', 'shopping', 'nature', 'beauty', 'night-life', 'drinking', 'desserts', 'daytime activities', 'nightlife', 'tourist/historic', 'photo-op'];
    this.currentMarkers = [];
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.onMapAdded = this.onMapAdded.bind(this);
    this.loadMapDataFromServer = this.loadMapDataFromServer.bind(this);
    this.saveMarkerToMap = this.saveMarkerToMap.bind(this);
    this.updatePlaceDetailsPane = this.updatePlaceDetailsPane.bind(this);
    this.deleteMarker = this.deleteMarker.bind(this);
    this.saveChangesToMap = this.saveChangesToMap.bind(this);
    this.editMarker = this.editMarker.bind(this);
    this.viewMarker = this.viewMarker.bind(this);
  }
  componentDidMount() {
    this.loadMapDataFromServer();
    // setInterval(this.loadMapDataFromServer, this.props.pollInterval);
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.currentMarkers !== this.state.currentMarkers) {
  //     console.log('the current markers have changed to:');
  //     console.log(this.state.currentMarkers);
  //   }
  // }
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
    console.log('in EditMap Container, onMapAdded')
    this.loadMapDataFromServer();
    this.setState({
      map: map,
    });
  }
  addMarkerToMap(marker) {
    const updatedMarkers = [...this.currentMarkers, marker];
    const editingMap = this.state.data;
    console.log('in edit map container, the current place now has markers:');
    console.log(updatedMarkers);
    console.log('current map data is:')
    console.log(editingMap);
    // this.setState({ currentMarkers: updatedMarkers });
  }
  loadMapDataFromServer() {
    console.log('in Edit Map container, loadMapDatafromServer');
    const map_id = this.props.match.params.map_id;
    const map_url = `${this.props.url}/${map_id}`;
    axios.get(map_url)
    .then((res) => {
      // this.currentMarkers = res.data.savedMarkers;
      this.setState({ data: res.data, currentMarkers: res.data.savedMarkers });
      // console.log('the data after the map fetch is: ');
      // console.log(this.state.data);
    });
  }
  updatePlaceDetailsPane(place) {
    // console.log('in updateplace details pane');
    const currentState = this.state.showPlaceDetails;
    // return ReactDOM.createPortal(placeDetails, placeRoot);
    this.setState({ showPlaceDetails: true, showingPlace: place, showMarkerDetails: false, activeMarker: {} });
  }
  // showUpdateExistingMarkerPane(marker) {
  //   console.log('in showUpdateExistingMarkerPane');
  //   this.setState({ showPlaceDetails: true, showingPlace: marker });
  // }
  saveMarkerToMap(marker) {
    console.log('in edit map container, saving marker to map');
    const updatedMarkers = [...this.state.currentMarkers, marker];
    console.log('markers to add are:');
    console.log(updatedMarkers);
    const author = this.state.data.author;
    const name = this.state.data.name
    const map_id = this.props.match.params.map_id;
    // axios post or patch method for adding a marker to a place
    const map_url = `${this.props.url}/${map_id}`;
    // const updatedMarkers = this.state.currentMarkers.push(marker);
    const updatedPlaces = [...this.state.data.savedPlaces, marker.place_id]
    // const updatedPlaces = this.state.data.savedPlaces.push(marker.place_id)

    const newMap = {
      savedMarkers: updatedMarkers,
      savedPlaces: updatedPlaces,
    };
    console.log('new map object is');
    console.log(newMap);
    axios.put(map_url, newMap)
      .then((res) => {
        this.setState({
          data: res.data,
          currentMarkers: res.data.savedMarkers, showPlaceDetails: false,
          showingPlace: null,
          showMarkerDetails: false,
          activeMarker: {},
          activeMarkerIdx: null,
        });
        this.loadMapDataFromServer();
    });
  }
  editMarker(marker_idx) {
    const editingMarker = this.state.currentMarkers[marker_idx];
    this.setState({
      showMarkerDetails: true,
      activeMarker: editingMarker,
      activeMarkerIdx: marker_idx
    });
  }
  deleteMarker(marker_idx) {
    console.log(' in Edit Map Container, deleting this marker');
    const updatingMarkers = this.state.currentMarkers;
    const deleting_marker = updatingMarkers[marker_idx];
    // deletes the selected marker, but we returns the spliced marker
    updatingMarkers.splice(marker_idx, 1);

    this.setState({
      currentMarkers: updatingMarkers,
      showMarkerDetails: false,
      activeMarker: {},
      activeMarkerIdx: null,
    });
    // this.setState({
    //   currentMarkers: updatingMarkers,
    //   showPlaceDetails: false,
    //   showingPlace: null,
    //   showMarkerDetails: false,
    //   activeMarker: {},
    //   activeMarkerIdx: null,
    // });

    console.log('set state after deleting marker')
  }
  viewMarker(marker_idx) {
    const viewingMarker = this.state.currentMarkers[marker_idx];
    this.setState({
      showMarkerDetails: true,
      activeMarker: viewingMarker,
      activeMarkerIdx: marker_idx,
      showPlaceDetails: false,
      showingPlace: {},
    });
  }
  saveChangesToMap() {
    // will do a put request to save all changes made to this map on our mongo database;
    console.log('in edit map container save changes to map, the currentmarkers to be saved to map are:');
    console.log(this.state.currentMarkers);

    const updatedMarkers = this.state.currentMarkers;
    console.log('updated markers are:');
    console.log(updatedMarkers);
    const author = this.state.data.author;
    const name = this.state.data.name
    const map_id = this.props.match.params.map_id;
    // axios post or patch method for adding a marker to a place
    const map_url = `${this.props.url}/${map_id}`;

    const newMapData = {
      savedMarkers: updatedMarkers,
    };
    axios.put(map_url, newMapData)
      .then((res) => {
        this.setState({
          data: res.data,
          currentMarkers: res.data.savedMarkers,
          showingInfoWindow: false,
          showMarkerDetails: false,
          activeMarker: {},
          activeMarkerIdx: null,
          selectedPlace: {},
          showPlaceDetails: false,
          showingPlace: {},
        });
        this.loadMapDataFromServer();
      });
  }
  render() {
    const map = this.state.map;
    const detailsRoot = document.getElementById('place-note-details-pane');
    console.log('in render, this.state.showingMarkerDetails is:');
    console.log(this.state.showMarkerDetails);

    const placeDetails = (this.state.showPlaceDetails) ? (
      <EditPlaceDetailsContent place={this.state.showingPlace} map={map} editingMap={this.state.data} addMarkerToMap={(marker) => this.saveMarkerToMap(marker)} root={detailsRoot} />
    ) : null;

    const markerDetails = (this.state.showMarkerDetails) ? (
      <ViewMarkerDetailsContent map={map} isEditing={true} marker={this.state.activeMarker} idx={this.state.activeMarkerIdx} editingMap={this.state.data} root={detailsRoot} />
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
      return <div className="loading-msg">Loading Map...</div>
    }
    const mapVisualNodes = (this.state.currentMarkers.length > 0) ? (this.state.currentMarkers.map((marker) => {
      return (
        <MapMarker key={marker.place_id}
        markerData={marker}  position={marker.position} name={marker.place_name} onClick={this.onMarkerClick} iconLink={'/pal4/icon47.png'} />
      );
    })
    ) : null;

    return (
      <section id="map-container-section">
        <section id="edit-map-pane">
          <div id="edit-map-pane-header">
            <p> Now Editing:</p>
            <h2 className="page-name"> {this.state.data.name} </h2>
            <p className="page-name"> Author: <strong>{this.state.data.author} </strong></p>
            <SaveChangesButton onSave={this.saveChangesToMap} userMapId={this.state.data._id} />
            <h3 id="map-marker-title">Current Locations on Map:</h3>
          </div>
          <div id="building-map-info">
            <MapMarkersList mapData={this.state.data} savedMarkers={this.state.currentMarkers}
            isEditing={true} onAddMarker={this.addMarker} onViewMarker={marker_idx => this.viewMarker(marker_idx)}  onMarkerSelect={marker_id => this.viewMarker(marker_id)}
            onMarkerDelete={marker => this.deleteMarker(marker)} />
          </div>
        </section>
        <div className="holds-map">
          <SearchBox google={this.props.google} map={this.state.map} mapData={this.state.data} showPlaceDetails={(place) => this.updatePlaceDetailsPane(place)} onAddMarker={(marker) => console.log(`marker to be added is : ${marker}`)}/>
          <CurrentMap currentMap={this.state.data} google={this.props.google} onClick={this.onMapClick} action={this.onMapAdded} style={style}>
            {mapVisualNodes}
            <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}onClose={this.onInfoWindowClose}>
               <div id="info-window-content">
                 <h2> {this.state.selectedPlace.name}</h2>
                 <img src="" width="16" height="16" id="place-icon" />
                 <span id="place-name"  className="title"></span>
                 <span id="place-address"></span>
                 <p> Available Place info: {this.state.selectedPlace.name} </p>
               </div>
            </InfoWindow>
          </CurrentMap>
          <div id="place-note-details-pane">
            {placeDetails}
            {markerDetails}
          </div>
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
