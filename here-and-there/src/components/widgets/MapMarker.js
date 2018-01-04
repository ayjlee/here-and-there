import {Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class MapMarker extends React.Component {
  componentDidUpdate(prevProps) {
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
}

MapMarker.propTypes = {
  position: PropTypes.object,
  map: PropTypes.object,
};

export default MapMarker;
