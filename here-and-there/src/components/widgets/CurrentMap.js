import { GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class CurrentMap extends Component {
  constructor(props) {
    super(props);

    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng,
      },
    }
  }
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolcation.getCurrentPosition((pos) => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude,
            },
          });
        },
      );
      }
    }
    this.loadMap();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('in componentDidUpdate');
    if (prevProps.google !== this.props.google) {
      console.log('in componentDidUpdate');
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }
  recenterMap() {
    const map = this.map;
    const curr = this.state.currentLocation;
    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      const center = new maps.LatLng(curr.lat, curr.long);
      map.panTo(center);
    }
  }
  loadMap() {
    console.log('in loadMap');
    if (this.props && this.props.google) {
      // google is available
      console.log('google is available');
      const {google} = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node= ReactDOM.findDOMNode(mapRef);
      console.log('node is:');
      console.log(node);
      const { initialCenter, zoom } = this.props;
      const {lat, lng} = this.state.currentLocation;
      const center = new maps.LatLng(lat,lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
      this.forceUpdate();
    }
  }
  render() {
    const style = {
      with: '75vw',
      height: '75vh',
    };
    return (
      <div ref="map" style= {style}>
        The CurrentMap will load here
      </div>
    );
  }
}
CurrentMap.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  centerAroundCurrentLocation: PropTypes.bool,
}
CurrentMap.defaultProps = {
  zoom: 13,
  // Seattle location by default
  initialCenter: {
    lat: 47.6062,
    lng: -122.3321,
  },
  centerAroundCurrentLocation: false,
};

export default CurrentMap;
