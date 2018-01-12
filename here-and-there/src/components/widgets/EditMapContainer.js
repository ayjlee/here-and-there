import {GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import CurrentMap from './CurrentMap';
import SearchBox from  './SearchBox';
import MapMarker from './MapMarker';
import InfoWindow from './InfoWindow';
import NewNoteForm from '../forms/AddNoteForm';
import MapMarkersList from './MapMarkersList';
import EditMapPane from '../panes/EditMapPane';


export class EditMapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      map: null,
      data: {},
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.onMapAdded = this.onMapAdded.bind(this);
    // this.loadMapDataFromServer = this.loadMapDataFromServer.bind(this);
  }
  // componentDidMount() {
  //   this.loadMapDataFromServer();
  //   setInterval(this.loadMapDataFromServer, this.props.pollInterval);
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
  // loadMapDataFromServer() {
  //   console.log('in loadMapDatafromServer, the map url is:')
  //   const map_url = `${this.props.url}/${this.props.map_id}`;
  //   console.log(map_url);
  //   // axios.get(map_url )
  //   // .then((res) => {
  //   //   this.setState({ data: res.data });
  //   // });
  // }
  handleMarkerSubmit() {
    // axios post or patch method for adding a marker to a place
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
    const mapUrl = `${this.props.url}/${this.props.map_id}`;
    if (!this.props.loaded) {
      return <div>Loading Map Container...</div>
    }
    if (this.state.map) {
      console.log('in map container rendering conditional, showing this.state.map');
      console.log(this.state.map);
    }
    return (
      <section id="map-container-section">
        <EditMapPane url={mapUrl} />
        <div id="holds-map">
          <SearchBox google={this.props.google} map={this.state.map} />
          <CurrentMap google={this.props.google} onClick={this.onMapClick} action={this.onMapAdded}>
            <MapMarker />
            <MapMarker position={pos} name={'Made up name'} onClick={this.onMarkerClick} />
            <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}onClose={this.onInfoWindowClose}>
              <div>
                <h2> this is the info window </h2>
                <p>Name: {this.state.selectedPlace.name} </p>
                <h2> This is the form to add a new note</h2>
                <NewNoteForm place={this.state.selectedPlace} marker={this.state.activeMarker} map={this.state.map}/>
              </div>

            </InfoWindow>
          </CurrentMap>
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
