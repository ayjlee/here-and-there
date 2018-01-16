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
  return (
    <li onClick={() => onMarkerSelect(marker)} className="marker-item">
      <div>
        <h3>Marker Name: {marker.placeName} </h3>
      </div>
      <div className="marker-details">
        <p>Marker Details: {marker} </p>
      </div>
      <h3> Marker Place: {marker.placeName} </h3>
      <p>author: {marker.author}, key: {marker.place_id}, notes: {marker.notes}</p>
    </li>
  );
};

export default MarkerListItem;
