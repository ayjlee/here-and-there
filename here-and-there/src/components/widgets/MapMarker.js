import {Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class MapMarker extends Component {
  // componentDidMount() {
  //   console.log(' in MapMarker ComponentDidMount');
  //   this.renderMarker();
  // }
  componentDidUpdate(prevProps) {
    console.log('in MapMArker componentdid update');
    if ((this.props.map !== prevProps.map) || (this.props.position !== prevProps.position)) {
      // change the relevant props
      this.renderMarker();
    }
  }
  renderMarker() {
    let { map, google, position, mapCenter } = this.props;

    let pos = position || mapCenter;
    position = new google.maps.LatLng(pos.lat, pos.lng);

    const pref = {
      map: map,
      position: position,
    };
    this.marker = new google.maps.Marker(pref);
  }
  render() {
    console.log('in MapMarker render');
    return null;
  }
}

MapMarker.propTypes = {
  position: PropTypes.object,
  map: PropTypes.object,
  savedToMap: Proptypes.bool,
};
MapMarker.defaultProps = {
  savedToMap: false,
}

export default MapMarker;
