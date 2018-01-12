import React, { Component } from "react";
import axios from 'axios';

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
        <li key={map._id} className="myMap">
          <h3> Map name: {map.name} </h3>
          <p>author: {map.author}, key: {map._id}, markers: {map.markers}</p>
        </li>
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
