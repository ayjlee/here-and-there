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
