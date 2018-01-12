import React, { Component } from "react";
import { Route } from 'react-router-dom';
import MapContainer from '../widgets/MapContainer';
import axios from 'axios';

class MyPlacesList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    // this.loadPlacesFromServer = this.loadPlacesFromServer.bind(this);
  }
  // loadPlacesFromServer() {
  //   axios.get(this.props.url)
  //   .then(res => {
  //     this.setState({ data: res.data });
  //   })
  // }
  // componentDidMount() {
  //   // this.loadPlacesFromServer();
  //   setInterval(this.loadPlacesFromServer, this.props.pollInterval);
  // }
  render() {
    return (
      <section id="my-places-list-container">
        <ul>
          <li> in MyPlacesList component </li>
          <li> View by Category </li>
          <li> View by Location </li>
          <li> List View vs. map diplay view options? </li>
        </ul>
      </section>
    );
  }
}

export default MyPlacesList;
