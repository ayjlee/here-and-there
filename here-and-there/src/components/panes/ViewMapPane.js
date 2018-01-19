import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MapMarkersList from '../widgets/MapMarkersList';

class ViewMapPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedMarker: null,
    };
  }
  render() {
    return (
      <section id="view-map-pane" className="sidepane-placeholder">
        <div className="link-div">
          <Link to={{
            pathname: '/library',
            state: { selectedMap: null }
          }} className="map-link">Back to Library</Link>
          <Link to={{
            pathname: `/edit-map/${this.props.mapData._id}`,
            state: { selectedMap: null }
          }} className="map-link"> Edit Map </Link>
        </div>

        <div>
          <p>map:  </p>
          <h2> {this.props.mapData.name} </h2>
          <strong><p> Author: {this.props.mapData.author} </p></strong>
        </div>
        <h3> Places on this map: </h3>
        <MapMarkersList mapData={this.props.mapData} savedMarkers={this.props.mapData.savedMarkers} onMarkerSelect={selectedMarker => this.setState({ selectedMarker })}/>
      </section>
    );
  }
}

export default ViewMapPane;
