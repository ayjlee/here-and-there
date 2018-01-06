import { GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class CurrentMap extends React.Component {
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
      let zoom = 14;
      let lat = 47.6062;
      let lng = -122.3321;
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

export default CurrentMap;
