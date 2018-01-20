import React, { Component } from "react";
import MyMapsList from '../widgets/MyMapsList';
import MyPlacesList from '../widgets/MyPlacesList';
import MapContainer from '../widgets/MapContainer';
import ViewMapPane from '../panes/ViewMapPane';

const DATA = [
  { author: 'some dudette', name: 'map alpha', key: 'bogus map id', markers: [] },
  { author: 'some dude', name: 'map beta', key: 'bogus map id 2', markers: [] }
];

// TODO: replace hardcoded userId with dynamic variable
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
          <h2>my maps</h2>
          <h4>shh, this is library!</h4>
          <ul className="mapList">
            <MyMapsList url="http://here-and-there.herokuapp.com/api/maps" pollInterval={2000} onMapSelect={selectedMap => this.setState({ selectedMap })}/>
          </ul>
        </div>
        <div>
          <h4>my saved places</h4>
          <MyPlacesList />
        </div>
      </section>
    );
  }
}

export default Library;


// return (this.state.selectedMap ?
//   <section id="library-page-content">
//     <div className="view-map-pane" >
//       <ViewMapPane mapData={this.state.selectedMap} />
//     </div>
//     <div id="map-container">
//       <h4> Map will go here </h4>
//       <MapContainer onMapSelect={selectedMap => this.setState({ selectedMap })} />
//     </div>
//   </section> :
//   <section id="library-page-content">
//     <div className= "sidepane-placeholder">
//       <h2>shh, this is library!</h2>
//       <h4>my maps</h4>
//       <ul>
//         <MyMapsList url="http://localhost:3001/api/maps" pollInterval={2000} onMapSelect={selectedMap => this.setState({ selectedMap })}/>
//       </ul>
//
//       <h4>my saved places</h4>
//       <MyPlacesList />
//     </div>
//     <div id="map-container">
//       <h4> Map will go here </h4>
//       <MapContainer onMapSelect={selectedMap => this.setState({ selectedMap })} />
//     </div>
//   </section>
