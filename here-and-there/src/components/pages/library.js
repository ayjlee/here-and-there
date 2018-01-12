import React, { Component } from "react";
import MyMapsList from '../widgets/MyMapsList';
import MyPlacesList from '../widgets/MyPlacesList';
import MapContainer from '../widgets/MapContainer';

const DATA = [
  { author: 'some dudette', name: 'map alpha', key: 'bogus map id', markers: [] },
  { author: 'some dude', name: 'map beta', key: 'bogus map id 2', markers: [] }
];

// TODO: replace hardcoded userId with dynamic variable
class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  render() {
    return (
      <section id="library-page-content">
        <div className= "sidepane-placeholder">
          <h2>shh, this is library!</h2>
          <h4>my maps</h4>
            <MyMapsList url="http://localhost:3001/api/maps" pollInterval={2000} />

          <h4>my saved places</h4>
            <MyPlacesList />
        </div>
        <div id="map-container">
          <h4> Map will go here </h4>
          <MapContainer />
        </div>
      </section>
    );
  }
}

export default Library;
