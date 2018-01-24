import React, { Component } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import MarkerListItem from './MapMarkerListItem';

class MapMarkersList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    // this.loadMapMarkersFromServer = this.loadMapMarkersFromServer.bind(this);
  }
  render() {
    const header = !this.props.isEditing ? <h3> Places on this map: </h3> : null;

    const markerItemNodes = this.props.savedMarkers.map((marker, index) => {
      return (
        <MarkerListItem key={marker.place_id} idx={index} className="mapMarker" marker={marker} isEditing={this.props.isEditing} deleteMarker={marker => this.props.onMarkerDelete(marker)} onViewMarker={idx =>this.props.onViewMarker(idx)} onMarkerSelect={marker_id => this.props.onMarkerSelect(marker_id)} onClick={() => console.log('clicking a markerlistitem')}  />
      );

    });
    return (
      <section id="marker-list-container">
        {header}
        <ul>
          {markerItemNodes}
        </ul>
      </section>
    );
  }
}
MapMarkersList.propTypes = {
  url: PropTypes.string,
  pollInterval: PropTypes.number,
  savedMarkers: PropTypes.array,
};
MapMarkersList.defaultProps = {
  pollInterval: 5000,
  savedMarkers: [],
};

export default MapMarkersList;

// let markerNodes = this.props.savedMarkers.map(marker => {
//   return (
//     <li key={marker._id} className="mapMarker">
//       <h3> Marker Place: {marker.name} </h3>
//       <p>author: {marker.author}, key: {marker._id}, notes: {marker.notes}</p>
//     </li>
//   );
//
// });
