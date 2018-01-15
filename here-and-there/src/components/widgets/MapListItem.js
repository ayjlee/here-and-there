import React, { Component } from "react";
import axios from 'axios';

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
const MapListItem = ({ map, onMapSelect }) => {
  console.log(map);
  if (!map) {
    return <div> Loading map... </div>
  }
  return (
    <li onClick={() => onMapSelect(map)} className="map-item myMap">
      <div>
        <h3>Map Name: {map.name} </h3>
      </div>
      <div className="map-details">
        <p>Map Author: {map.author} </p>
        <p>Map Id: {map._id} </p>
      </div>
    </li>);
};

export default MapListItem;
