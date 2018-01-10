import React, { Component } from "react";
import { Route } from 'react-router-dom';
import MapContainer from '../widgets/MapContainer';

class Library extends Component {
  render() {
    return (
      <section id="library-page-content">
        <div className= "sidepane-placeholder">
          <h2>welcome to library</h2>
          <h4>my maps</h4>
            <ul>
              <li> list of maps </li>
              <li> add view options to view by location </li>
            </ul>

          <h4>my markers</h4>
            <ul>
              <li> View by Category </li>
              <li> View by Location </li>
              <li> List View vs. map diplay view options? </li>
            </ul>
        </div>
        <div id="map-container">
          <h4> Map will go here </h4>
          <Route component={MapContainer}/>
        </div>
      </section>
    );
  }
}

export default Library;
