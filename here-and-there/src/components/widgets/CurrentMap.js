import { GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class CurrentMap extends React.Component {
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
    this.loadMap();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('in componentDidUpdate');
    if (prevProps.google !== this.props.google) {
      console.log('in componentDidUpdate');
      this.loadMap();
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
}
CurrentMap.defaultProps = {
  zoom: 13,
  // Seattle location by default
  initialCenter: {
    lat: 47.6062,
    lng: -122.3321,
  },
};

export default CurrentMap;
