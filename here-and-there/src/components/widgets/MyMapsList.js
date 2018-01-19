import React, { Component } from "react";
import axios from 'axios';
import MapListItem from './MapListItem';

class MyMapsList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadMapsFromServer = this.loadMapsFromServer.bind(this);
    this.handleMapDelete = this.handleMapDelete.bind(this);
  }
  componentDidMount() {
    this.loadMapsFromServer();
    // setInterval(this.loadMapsFromServer, this.props.pollInterval);
  }
  handleMapDelete(id) {
    axios.delete(`${this.props.url}/${id}`)
    .then(res => {
      console.log(' Comment deleted');
    })
    .catch(err => {
      console.log(err);
    })
  }
  onMyMapClick() {
    console.log('you clicked this:');
    console.log(this);
  }
  loadMapsFromServer() {
    axios.get(this.props.url)
    .then((res) => {
      this.setState({ data: res.data });
    });
  }
  render() {
    const mapItemNodes = this.state.data.map((map) => {
      return <MapListItem key={map._id} map={map} onMapSelect={this.props.onMapSelect} />;
    });
    return (
      <section id="my-map-list-container">
        <ul>
          { mapItemNodes }
        </ul>
      </section>
    );
  }
}

export default MyMapsList;


// return (
//   <section id="my-map-list-container">
//     <ul>
//       <li> in my MapList component </li>
//       <li> list of my maps </li>
//       <li> add view options to view by location </li>
//     </ul>
//   </section>
// );

// const mapNodes = this.state.data.map((map) => {
//   return (
//     <li key={map._id} map={map} className="myMap" onClick={this.onMyMapClick.bind(map)}>
//       <h3> Map name: {map.name} </h3>
//       <p>author: {map.author}, key: {map._id}, markers: {map.markers}</p>
//     </li>
//   );
// });
