import {GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import MapMarkersList from '../widgets/MapMarkersList';

export class EditMapPane extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section id="edit-map-pane">
        <h2 className="page-name"> Currently Editing Map: {this.props.mapData.name} </h2>
        <h3> Author: {this.props.mapData.author} </h3>
        <div id="building-map-info">
          <h3>List of Locations Saved to the Current Map:</h3>
            <MapMarkersList savedMarkers={this.props.mapData.savedMarkers} />
        </div>
      </section>
    );
  }
}

export default EditMapPane;
