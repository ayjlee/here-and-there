import {Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class CurrentMap extends React.Component {
  // adding constructor to make Map objects stateful(have state)
  constructor(props) {
    super(props);

    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng,
      },
    };
  }
  // componentDidMount handles case when Map is already available when component mount, eg. when map has been previously loaded in the app
  componentDidMount() {
    // setup callback to fetch the current position
    if (this.props.centerAroundCurrentLocation) {
      // navigator is from native browser implementation
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude,
            },
          });
        });
      }
    }
    this.loadMap();
  }
  componentDidUpdate(prevProps, prevState) {
    // check if Map component is loaded, loadMap if true
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }
  recenterMap() {
    // use panTo() to change the center of Map
    const map = this.map;
    const curr = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(curr.lat, curr.lng);
      map.panTo(center);
    }

  }
  loadMap() {
    // function to load the map
    if (this.props && this.props.google) {
      // if google is available ^
      const { google } = this.props;
      const maps = google.maps

      const mapRef = this.refs.map;
      // findDOMNode gives warning, try using callback refs instead
        // const node = ReactDOM.findDOMNode(mapRef);
      // using callbackRefs:
      const node = this.node;
      let { initialCenter, zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom,
      });
      // maps.Map() constructor accepts a DOM node and a configuration object to create a map. To instantiate a map, we need at least two config options: center, and zoom
    }
  }
  render() {
    // JSX below
    return (
    // original 'ref' way
      // <div ref = 'map'>
      //   Loading map...
      // </div>
    // trying to use callbacks:
    // renderChildren() will be responsible for calling the methods on the children. we'll use React.cloneElement() to add props to child inside component and append the map instance, google prop, and map center
      <div ref = {node => this.node = node} >
        Loading map...
        {this.renderChildren()};
      </div>
    )
  }
  renderChildren() {
    const { children } = this.props;
    // return null if there are no children passed to Map instance
    if (!children) return;

    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation,
      });
    });
  }
}

CurrentMap.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  centerAroundCurrentLocation: PropTypes.bool,
};
CurrentMap.defaultProps = {
  zoom: 13,
  // setting Seattle as default map location
  initialCenter: {
    lat: 47.6062,
    lng: -122.3321,
  },
  centerAroundCurrentLocation: false,
};

export default CurrentMap;
