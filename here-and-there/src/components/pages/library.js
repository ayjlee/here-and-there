import React, { Component } from "react";
import MyMapsList from '../widgets/MyMapsList';
import MyPlacesList from '../widgets/MyPlacesList';
import MapContainer from '../widgets/MapContainer';
import ViewMapPane from '../panes/ViewMapPane';


class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedMap: null,
      selectedPlace: null,
    };
  }
  render() {
    return (
      <section id="library-page-content">
        <div>
          <h1>Explore Maps</h1>
          <h4>shh, this is library!</h4>
          <ul className="mapList">
            <MyMapsList url="http://localhost:3001/api/maps" pollInterval={2000} onMapSelect={selectedMap => this.setState({ selectedMap })}/>
          </ul>
        </div>
      </section>
    );
  }
}

export default Library;
