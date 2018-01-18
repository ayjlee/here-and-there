import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

// class MapListItem extends Component {
//   constructor(props) {
//     super(props);
//     this.onClick = this.onClick.bind(this);
//   }
//   onClick() {
//     this.props.onMyMapClick(this.props.item.id);
//   }
//   render() {
//     return (
//       <li onClick={this.onClick}>
//         ...
//       </li>
//     )
//   }
// }

// const MapListItem = (props) => {
//   const map = props.map;
//   console.log(map);
//   return (
//     <li className="map-item myMap">
//       <div>
//         <h3>Map Name: {map.name} </h3>
//       </div>
//       <div className="map-details">
//         <p>Map Author: {map.author} </p>
//         <p>Map Id: {map._id} </p>
//       </div>
//     </li>);
// };
const MarkerListItem = ({ marker, onMarkerSelect }) => {
  console.log('in markerListItem');
  const first_note = marker.notes.length > 0 ? marker.notes.map(note =>
  { return `${note.author}: ${note.text} (${note.type})`;}) : null;

  return (
    <li className="marker-item" key={marker.place_id}>
      <div>
        <h3> Marker Place: {marker.place_name} </h3>
      </div>
      <div className="marker-details">
        <p>Marker Details: </p>
        <p>author: {marker.author}, key: {marker.place_id}, notes: {first_note}</p>
        <p> position:  lat: {marker.position.lat} lng: {marker.position.lng} </p>
      </div>
    </li>
  );
};

// class MarkerListItem extends Component {
//   render() {
//     const marker = this.props.marker;
//     console.log('in markerListItem');
//     const first_note = marker.notes.length > 0 ? marker.notes.map(note =>
//     { return `${note.author}: ${note.text} (${note.type})`;}) : null;
//
//     return (
//       <li onClick={() => this.props.onMarkerSelect(marker)} className="marker-item" key={marker.place_id}>
//         <div>
//           <h3> Marker Place: {marker.place_name} </h3>
//         </div>
//         <div className="marker-details">
//           <p>Marker Details: </p>
//           <p>author: {marker.author}, key: {marker.place_id}, notes: {first_note}</p>
//         </div>
//       </li>
//     );
//   }
// };

export default MarkerListItem;
