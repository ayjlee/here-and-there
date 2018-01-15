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
const MapListItem = ({ map, onMapSelect }) => {
  const editPath = `edit-map/${map._id}`;
  const mapPath = `maps/${map._id}`;
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
      <div>
        <Link to={mapPath} className="map-link">
          View Map
        </Link>
        <span />
        <Link to={editPath} className="map-link">
          Edit Map
        </Link>
      </div>
    </li>);
};

export default MapListItem;
