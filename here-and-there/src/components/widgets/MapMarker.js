import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CurrentMap from './CurrentMap';

const evtNames = ['click', 'mouseover', 'clickadd'];
const camelize = function(str) {
  return str.split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
};

export class MapMarker extends Component {
  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) || (this.props.position !== prevProps.position)) {
      // change the relevant props
      this.renderMarker();
    }
  }
  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }
  handleEvent(evt) {
    return (e) => {
      const evtName = `on${camelize(evt)}`;
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.marker, e);
      }
    }
  }
  renderMarker() {
    let { map, google, position, mapCenter, iconLink } = this.props;
    const iconBase = 'http://maps.google.com/mapfiles/kml';
    let pos = position || mapCenter;
    position = new google.maps.LatLng(pos.lat, pos.lng);
    const pref = {
      map: map,
      position: position,
      icon: iconBase + iconLink,
    };
    this.marker = new google.maps.Marker(pref);

    // adding event listeners:
    evtNames.forEach((evt) => {
      this.marker.addListener(evt, this.handleEvent(evt));
    })
  }
  render() {
    return null;
  }
}

MapMarker.propTypes = {
  position: PropTypes.object,
  map_id: PropTypes.object,
  savedToMap: PropTypes.bool,
  notes: PropTypes.string,
  place_id: PropTypes.string,
  placeName: PropTypes.string,
}
MapMarker.defaultProps = {
  savedToMap: false,
  onClick() {
  },
  onMouseover() {
  },
  onClickadd() {
  }
}
evtNames.forEach((e) => {
  CurrentMap.propTypes[camelize(e)] = PropTypes.func;
});

export default MapMarker;
