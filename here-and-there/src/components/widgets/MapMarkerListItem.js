import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const MarkerListItem = ({ marker, onMarkerSelect, deleteMarker, idx }) => {
  const notesList = marker.notes.length > 0 ? marker.notes.map(note =>
  { return (<li key={note.text} className="marker-note">{note.author}: {note.text} ({note.type})</li>);}) : <p> No Notes </p>;

  return (
    <li className="marker-item" key={marker.place_id} onClick={console.log('clicking marker item')}>
      <div>
        <h3>{marker.place_name} </h3>
      </div>
      <div className="marker-details">
        <p>Address: {marker.address}</p>
        <p>Categories:{marker.tags}</p>
      </div>
      <div>
        <button key={marker.place_id} onClick={(marker_id) => deleteMarker(idx)}> Remove from Map</button>
        <button key={marker.place_id} onClick={(marker_id) => onMarkerSelect(idx)}> Edit Notes </button>
      </div>
    </li>
  );
};

export default MarkerListItem;

// more verbose old content:
// <div>
//   <h3>{marker.place_name} </h3>
// </div>
// <div className="marker-details">
//   <h5>Marker Details: </h5>
//   <p> Address: {marker.address} </p>
//   <p>Tags: {marker.tags}</p>
//   <h5>Notes: </h5>
//   <ul>
//     {notesList}
//   </ul>
// </div>
