import {GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CurrentMap from './CurrentMap';
import SearchBox from  './SearchBox';
import MapMarker from './MapMarker';
import InfoWindow from './InfoWindow';
import NewNoteForm from '../forms/AddNoteForm';
import MapMarkersList from './MapMarkersList';
import EditMapPane from '../panes/EditMapPane';
import EditPlaceDetailsContent from './EditPlaceDetailsContent';
import AddMarkerLink from './AddMarkerLink';

export class EditMapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      map: null,
      data: {},
      currentMarkers: [],
      showPlaceDetails: false,
      showingPlace: {},
    };
    let markerTypes = ['food', 'shopping', 'nature', 'beauty', 'night-life', 'drinking', 'desserts', 'daytime activities', 'nightlife', 'tourist/historic', 'photo-op'];
    this.currentMarkers = [];
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.onMapAdded = this.onMapAdded.bind(this);
    this.loadMapDataFromServer = this.loadMapDataFromServer.bind(this);
    this.saveMarkerToMap = this.saveMarkerToMap.bind(this);
    this.updatePlaceDetailsPane = this.updatePlaceDetailsPane.bind(this);
    this.deleteMarker = this.deleteMarker.bind(this);
  }
  componentDidMount() {
    this.loadMapDataFromServer();
    // setInterval(this.loadMapDataFromServer, this.props.pollInterval);
  }
  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
    });
  }
  onMapClick() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }
  onMarkerClick(props, marker, e) {
    // if marker.savedtoMap?
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }
  onMapAdded(map) {
    console.log('in EditMap Container, onMapAdded')
    this.loadMapDataFromServer();
    this.setState({
      map: map,
    });
  }
  addMarkerToMap(marker) {
    const updatedMarkers = [...this.currentMarkers, marker];
    const editingMap = this.state.data;
    console.log('in edit map container, the current place now has markers:');
    console.log(updatedMarkers);
    console.log('current map data is:')
    console.log(editingMap);
    // this.setState({ currentMarkers: updatedMarkers });
  }
  loadMapDataFromServer() {
    console.log('in Edit Map container, loadMapDatafromServer');
    const map_id = this.props.match.params.map_id;
    const map_url = `${this.props.url}/${map_id}`;
    axios.get(map_url)
    .then((res) => {
      // this.currentMarkers = res.data.savedMarkers;
      this.setState({ data: res.data, currentMarkers: res.data.savedMarkers });
      // console.log('the data after the map fetch is: ');
      // console.log(this.state.data);
    });
  }
  updatePlaceDetailsPane(place) {
    console.log('in updateplace details pane');
    const currentState = this.state.showPlaceDetails;
    // return ReactDOM.createPortal(placeDetails, placeRoot);
    this.setState({ showPlaceDetails: true, showingPlace: place });
  }
  saveMarkerToMap(marker) {
    console.log('in edit map container, saving marker to map');
    const updatedMarkers = [...this.state.currentMarkers, marker];
    console.log('markers to add are:');
    console.log(updatedMarkers);
    // const author = this.state.data.author;
    // const name = this.state.data.name
    // const map_id = this.props.match.params.map_id;
    // // axios post or patch method for adding a marker to a place
    // const map_url = `${this.props.url}/${map_id}`;
    // // const updatedMarkers = this.state.currentMarkers.push(marker);
    // const updatedPlaces = [...this.state.data.savedPlaces, marker.place_id]
    // // const updatedPlaces = this.state.data.savedPlaces.push(marker.place_id)
    //
    // const newMap = {
    //   savedMarkers: updatedMarkers,
    //   savedPlaces: updatedPlaces,
    // };
    // console.log('new map object is');
    // console.log(newMap);
    // axios.put(map_url, newMap)
    //   .then((res) => {
    //   // this.setState({ data: res.data, currentMarkers: res.data.savedMarkers});
    //   this.loadMapDataFromServer();
    // });
  }
  deleteMarker(marker) {
    console.log(' in Edit Map Container, deleting this marker');
    console.log(marker);
  }
  render() {
    console.log('in rendering EditMapContainer, this map is:');
    console.log(this.state.map);
    const map = this.state.map;
    console.log('in rendering EditMapContainer, this state is:');
    console.log(this.state);
    const detailsRoot = document.getElementById('place-note-details-pane');

    const placeDetails = (this.state.showPlaceDetails) ? (
      <EditPlaceDetailsContent place={this.state.showingPlace} map={map} editingMap={this.state.data} addMarkerToMap={(marker) => this.saveMarkerToMap(marker)} root={detailsRoot} />
    ) : null;
    const style = {
      width: '40vw',
      height: '40vh',
    };
    const pos = {
      lat: 47.6062,
      lng: -122.3321,
    };
    const mapUrl = `${this.props.url}/${this.props.map_id}`;
    if (!this.props.loaded) {
      return <div>Loading Map Container...</div>
    }
    // if (this.state.map) {
    //   // console.log('in map container rendering conditional, showing this.state.map');
    //   // console.log(this.state.map);
    //
    // } else {
    //   return <div>Loading Map data...</div>
    // }

    // const mapVisualNodes = (this.state.currentMarkers.length > 0) ? (this.state.currentMarkers.map((marker) => {
    //   return (
    //     <MapMarker key={marker.place_id} position={marker.position} name={marker.place_name} onClick={this.onMarkerClick} >
    //         <InfoWindow key={marker.place_id} marker={marker} visible={false} onClose={this.onInfoWindowClose}>
    //           <div id="info-window-content">
    //             <h2> this is the info window </h2>
    //             <p>Name: {marker.place_name} </p>
    //             <img src="" width="16" height="16" id="place-icon" />
    //             <span id="place-name"  className="title"></span>
    //             <span id="place-address"></span>
    //             <p> Available Place info: {marker.place_id} </p>
    //           </div>
    //         </InfoWindow>
    //     </MapMarker >
    //   );
    // })
    // ) : null;
    const mapVisualNodes = (this.state.currentMarkers.length > 0) ? (this.state.currentMarkers.map((marker) => {
      return (
        <MapMarker key={marker.place_id}
        markerData={marker}  position={marker.position} name={marker.place_name} onClick={this.onMarkerClick} />
      );
    })
    ) : null;

    return (
      <section id="map-container-section">
        <section id="edit-map-pane">
          <h2 className="page-name"> Currently Editing Map: {this.state.data.name} </h2>
          <h3> Author: {this.state.data.author} </h3>
          <h3>List of Locations Saved to the Current Map:</h3>
          <div id="building-map-info">
            <MapMarkersList mapData={this.state.data} savedMarkers={this.state.currentMarkers} onAddMarker={this.addMarker} onMarkerSelect={console.log('marker selected')}
            onMarkerDelete={marker => this.deleteMarker(marker)} />
          </div>
        </section>
        <div className="holds-map">
          <SearchBox google={this.props.google} map={this.state.map} mapData={this.state.data} showPlaceDetails={(place) => this.updatePlaceDetailsPane(place)} onAddMarker={(marker) => console.log(`marker to be added is : ${marker}`)}/>
          <CurrentMap currentMap={this.state.data} google={this.props.google} onClick={this.onMapClick} action={this.onMapAdded} style={style}>
            {mapVisualNodes}
            <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}onClose={this.onInfoWindowClose}>
               <div id="info-window-content">
                 <h2> this is the info window </h2>
                 <p>Name: {this.state.selectedPlace.name} </p>
                 <img src="" width="16" height="16" id="place-icon" />
                 <span id="place-name"  className="title"></span>
                 <span id="place-address"></span>
                 <p> Available Place info: {this.state.selectedPlace.name} </p>
               </div>
            </InfoWindow>
          </CurrentMap>
          <div id="place-note-details-pane">
            <p> Search for a place to add to your map in the search box above</p>
            {placeDetails}
          </div>
        </div>
      </section>
    );
  }
}
EditMapContainer.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  centerAroundCurrentLocation: PropTypes.bool,
  savedToAccount: PropTypes.bool,
  action: PropTypes.func,
  map_id: PropTypes.string,
  url: PropTypes.string,
  pollInterval: PropTypes.number,
};
EditMapContainer.defaultProps = {
  zoom: 13,
  // Seattle location by default
  initialCenter: {
    lat: 47.6062,
    lng: -122.3321,
  },
  centerAroundCurrentLocation: false,
  savedToAccount: false,
  map_id: '5a58014c1985bc3c3dd8a041',
  url: 'http://localhost:3001/api/maps',
  pollInterval: 10000,
  onDragend() {
    console.log('moving');
  },
  onClick() {
    console.log('clicking');
  },
  onReady() {
    console.log('ready');
  }
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAPI_KEY,
  libraries: ['places', 'visualization'],
})(EditMapContainer);



// Notes Below:


// Original "holds-map" section:
  // <div className="holds-map">
  //   <SearchBox google={this.props.google} map={this.state.map} mapData={this.state.data} showPlaceDetails={(place) => this.updatePlaceDetailsPane(place)} onAddMarker={(marker) => console.log(`marker to be added is : ${marker}`)}/>
  //   <CurrentMap google={this.props.google} onClick={this.onMapClick} action={this.onMapAdded} style={style}>
  //     <MapMarker />
  //     <MapMarker position={pos} name={'Made up name'} onClick={this.onMarkerClick} />
  //     <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}onClose={this.onInfoWindowClose}>
  //       <div id="info-window-content">
  //         <h2> this is the info window </h2>
  //         <p>Name: {this.state.selectedPlace.name} </p>
  //         <img src="" width="16" height="16" id="place-icon" />
  //         <span id="place-name"  className="title"></span>
  //         <span id="place-address"></span>
  //         <p> Available Place info: {this.state.selectedPlace.name} </p>
  //           <h2> This is the form to add a new note</h2>
  //           <NewNoteForm place={this.state.selectedPlace} marker={this.state.activeMarker} map={this.state.map} />
  //       </div>
  //     </InfoWindow>
  //   </CurrentMap>
  // </div>

// const mapMarkers = (this.state.data.savedMarkers.length > 0) ? ( this.state.data.savedMarkers.map((marker) => {
//   return (
//     <MapMarker>
//       <InfoWindow>
//       <div id="info-window-content">
//         <h2> this is the info window </h2>
//         <p> Name: {marker.place_name} </p>
//         // <img src="" width="16" height="16" id="place-icon" />
//         // <span id="place-name"  className="title"></span>
//         // <span id="place-address"></span>
//         // <p> Available Place info: {this.state.selectedPlace.name} </p>
//         //   <h2> This is the form to add a new note</h2>
//         //   <NewNoteForm place={this.state.selectedPlace} marker={this.state.activeMarker} map={this.state.map} />
//       </div>
//       </InfoWindow>
//     </MapMarker>
//   );
// })
// ) : null;

// Notes Below
// if (this.state.data) {
//   const mapVisualNodes = this.state.data.savedMarkers.map((marker) => {
//     return (
//       <section className="place-display">
//         <MapMarker map={this.state.map} google={this.props.google} position={marker.position} />
//           <InfoWindow map={this.state.map}  google={this.props.google}  marker={this.state.activeMarker}  visible={this.state.showingInfoWindow} onClose={this.onInfoWindowClose}/>
//       </section>
//     );
//   });
//   return (
//     <section id="map-container-section">
//       <section id="edit-map-pane">
//         <h2 className="page-name"> Currently Editing Map: {this.state.data.name} </h2>
//         <h3> Author: {this.state.data.author} </h3>
//         <div id="building-map-info">
//           This will hold all of the info for the map we are currently building, including:
//           <h3>List of Locations Saved to the Current Map:</h3>
//             <MapMarkersList mapData={this.state.data} savedMarkers={this.state.currentMarkers} onAddMarker={this.addMarker} onMarkerSelect={console.log('marker selected')}/>
//         </div>
//       </section>
//       <div className="holds-map">
//         <SearchBox google={this.props.google} map={this.state.map} mapData={this.state.data} showPlaceDetails={(place) => this.updatePlaceDetailsPane(place)} onAddMarker={(marker) => console.log(`marker to be added is : ${marker}`)}/>
//         <CurrentMap google={this.props.google} onClick={this.onMapClick} action={this.onMapAdded} style={style}>
//           <MapMarker />
//           <MapMarker position={pos} name={'Made up name'} onClick={this.onMarkerClick} />
//           <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}onClose={this.onInfoWindowClose}>
//             <div id="info-window-content">
//               <h2> this is the info window </h2>
//               <p>Name: {this.state.selectedPlace.name} </p>
//               <img src="" width="16" height="16" id="place-icon" />
//               <span id="place-name"  className="title"></span>
//               <span id="place-address"></span>
//               <p> Available Place info: {this.state.selectedPlace.name} </p>
//                 <h2> This is the form to add a new note</h2>
//                 <NewNoteForm place={this.state.selectedPlace} marker={this.state.activeMarker} map={this.state.map} />
//             </div>
//           </InfoWindow>
//           {mapVisualNodes}
//         </CurrentMap>
//       </div>
//       <div id="place-note-details-pane">
//         <p> This will hold details about a particular place/marker </p>
//         {placeDetails}
//       </div>
//     </section>
//   );
// }
//
// const mapData= this.state.data;

// displayMarkersForMap() {
//   const markerNodes = this.state.data.savedMarkers.map((marker) => {
//     return (
//       <section className="place-display">
//       <MapMarker map={this.state.map} google={this.props.google} position={marker.position} />
//         <InfoWindow map={this.state.map} google={this.props.google}  marker={marker}  visible={this.state.showingInfoWindow} onClose={this.onInfoWindowClose}/>
//       </section>
//     )
//   })
//
//   const mapNodes = this.state.data.map(map => {
//     return (
//       <li key={map._id} map={map} className="myMap" onClick={this.onMyMapClick.bind(map)}>
//         <h3> Map name: {map.name} </h3>
//         <p>author: {map.author}, key: {map._id}, markers: {map.markers}</p>
//       </li>
//     );
//
//   });
//   return (
//     <section id="my-map-list-container">
//       <ul>
//         { mapNodes }
//       </ul>
//     </section>
//   );
// }
