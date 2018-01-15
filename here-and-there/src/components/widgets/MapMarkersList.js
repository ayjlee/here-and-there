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
  // componentDidMount() {
  //   this.loadMapMarkersFromServer();
  //   setInterval(this.loadMapMarkersFromServer, this.props.pollInterval);
  //   console.log('in MapMarkers List, the url is:');
  //   console.log(this.props.url);
  // }
  // loadMapMarkersFromServer() {
  //   axios.get(this.props.url)
  //   .then((res) => {
  //     this.setState({ data: res.data.savedMarkers });
  //   });
  // }
  // render() {
  //   let markerNodes = this.state.data.map(marker => {
  //     return (
  //       <li key={marker._id} className="mapMarker">
  //         <h3> Marker Place: {marker.name} </h3>
  //         <p>author: {marker.author}, key: {marker._id}, notes: {marker.notes}</p>
  //       </li>
  //     );
  //
  //   });
  //   return (
  //     <section id="marker-list-container">
  //       <ul>
  //         <li> In the Marker List component </li>
  //         <li> markers will go here </li>
  //         {markerNodes}
  //       </ul>
  //     </section>
  //   );
  // }
  render() {
    let markerNodes = this.props.savedMarkers.map(marker => {
      return (
        <li key={marker._id} className="mapMarker">
          <h3> Marker Place: {marker.name} </h3>
          <p>author: {marker.author}, key: {marker._id}, notes: {marker.notes}</p>
        </li>
      );

    });
    const markerItemNodes = this.props.savedMarkers.map(marker => {
      return (
        <MarkerListItem key={marker._id} className="mapMarker" marker={marker}  onMarkerSelect={this.props.onMarkerSelect} />
      );

    });
    return (
      <section id="marker-list-container">
        <ul>
          <li> In the Marker List component </li>
          <li> markers will go here </li>
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
