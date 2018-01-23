import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as MdIconPack from 'react-icons/lib/md';


const MapListItem = ({ map, onMapSelect }) => {
  console.log('map list item map is');
  console.log(map);
  const editPath = `edit-map/${map._id}`;
  const mapPath = `maps/${map._id}`;
  if (!map) {
    return <div> Loading map... </div>
  }
  const description = (map.description) ? <p>Description: map.description</p> : null;
  return (
    <li onClick={() => onMapSelect(map)} className="map-item myMap ">
      <div className="map-details">
        <h3>Name: {map.name} </h3>
        <p>Author: {map.author} </p>
        {description}
        <div className="btn-container">
          <Link to={mapPath} className="map-link">
            <MdIconPack.MdMap size={30}/> View Map
          </Link>
          <span />
          <Link to={editPath} className="map-link">
            <MdIconPack.MdEditLocation size={30}/> Edit Map
          </Link>
        </div>
      </div>
    </li>);
};

export default MapListItem;
