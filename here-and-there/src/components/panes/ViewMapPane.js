import {GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MapMarkersList from '../widgets/MapMarkersList';

export class ViewMapPane extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section id="view-map-pane" className="sidepane-placeholder">
        <Link to={{
          pathname: '/library',
          state: { selectedMap: null }
        }}>
          Back to Library
        </Link>
        <div>
          <h2>viewing map pane for map: {this.props.mapData.name} </h2>
          <h3> Author: {this.props.mapData.author} </h3>
        </div>
        <h3> Places on this map: </h3>
        <MapMarkersList savedMarkers={this.props.mapData.savedMarkers} />
      </section>
    );
  }
}

export default ViewMapPane;
