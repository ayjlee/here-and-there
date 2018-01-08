import {Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CurrentMap from './CurrentMap';

const evtNames = ['click', 'mouseover'];
const camelize = function(str) {
  return str.split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
};

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

    // adding event listeners:
    evtNames.forEach((evt) => {
      this.marker.addListener(evt, this.handleEvent(evt));
    })
  }
  handleEvent(evt) {
    return (e) => {
      const evtName = `on${camelize(evt)}`;
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.marker, e);
      }
    }
  }
  render() {
    console.log('in MapMarker render');
    return null;
  }
}

MapMarker.propTypes = {
  position: PropTypes.object,
  map: PropTypes.object,
  savedToMap: PropTypes.bool,
  notes: PropTypes.array,
}
MapMarker.defaultProps = {
  savedToMap: false,
  onClick() {
    console.log('clicking MapMarker');
  },
  onMouseover() {
    console.log('mousing over a mapmarker');
  }
}
evtNames.forEach((e) => {
  CurrentMap.propTypes[camelize(e)] = PropTypes.func;
});

export default MapMarker;
