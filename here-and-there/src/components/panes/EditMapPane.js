import {GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import MapMarkersList from '../widgets/MapMarkersList';

export class EditMapPane extends React.Component {
  render() {
    return (
      <section id="edit-map-pane">
        <h2 className="page-name"> Currently Editing Map: </h2>
        <div id="building-map-info">
          This will hold all of the info for the map we are currently building, including:

          <h3>Map Name: </h3>
          <h3>List of Locations Saved to the Current Map:</h3>
            <MapMarkersList url={this.props.url} />
        </div>
      </section>
    );
  }
}

export default EditMapPane;
