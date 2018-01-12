import React, { Component } from "react";
import { Route } from 'react-router-dom';
import axios from 'axios';
import MapContainer from '../widgets/MapContainer';
import CurrentMap from '../widgets/CurrentMap';

class MyMapsList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadMapsFromServer = this.loadMapsFromServer.bind(this);
  }
  componentDidMount() {
    this.loadMapsFromServer();
    setInterval(this.loadMapsFromServer, this.props.pollInterval);
  }
  loadMapsFromServer() {
    axios.get(this.props.url)
    .then((res) => {
      this.setState({ data: res.data });
    });
  }
  render() {
    let mapNodes = this.state.data.map(map => {
      return (
        <li key={map._id}> Map name: {map.name}, map author: {map.author}, key: {map._id}, markers: {map.markers} </li>
      );

    });
    return (
      <section id="my-map-list-container">
        <ul>
          { mapNodes }
        </ul>
      </section>
    );
  }
}

export default MyMapsList;

//  for getting the actual maps up

// let mapNodes = this.props.data.map(map => {
//   return (
//     <CurrentMap author={ map.author} key= { map.id } google={this.props.google} onClick={this.onMapClick} action={this.onMapAdded}>
//       { map.name }
//     </CurrentMap>
//   );


// return (
//   <section id="my-map-list-container">
//     <ul>
//       <li> in my MapList component </li>
//       <li> list of my maps </li>
//       <li> add view options to view by location </li>
//     </ul>
//   </section>
// );
