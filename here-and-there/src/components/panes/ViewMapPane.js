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
      <section id="view-map-pane">
        <Link to={{
          pathname: '/library',
          state: { selectedMap: null }
        }}>
          Back to Library
        </Link>
        viewing map pane for map: {this.props.mapData.name}
      </section>
    );
  }
}

export default ViewMapPane;
