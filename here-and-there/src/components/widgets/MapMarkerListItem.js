import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as MdIconPack from 'react-icons/lib/md';
import NoteListItem from './NoteListItem';

const MarkerListItem = ({ marker, onMarkerSelect, deleteMarker, idx, isEditing, onViewMarker }) => {
  // capitalize type:
  const mainType = (marker.tags && marker.tags.length > 0) ? marker.tags[0].charAt(0).toUpperCase() + marker.tags[0].slice(1): '';

  // const notesList = marker.notes.length > 0 ? marker.notes.map(note =>
  // { return (<li key={note.text} className="marker-note">{note.author}: {note.text} ({note.type})</li>);}) : <p> No Notes </p>;

  const notesList = marker.notes.length > 0 ? marker.notes.map(note =>
    { return (<NoteListItem key={note.text} note={note} />);
    }) : <p> No Notes </p>;

  const markerButtons = isEditing ? <div className="marker-btns">
    <button id="remove-marker-btn" key={marker.place_id} onClick={(marker_id) => deleteMarker(idx)}>Delete<MdIconPack.MdDelete size={18}/></button>
    <button id="edit-notes-btn" key={marker.place_id} onClick={(marker_id) => onMarkerSelect(idx)}> View/Edit<MdIconPack.MdEdit size={18}/> </button>
  </div> : <button id="view-place-btn" key={marker.place_id} onClick={() => onViewMarker(idx)}>View <MdIconPack.MdPlayCircleOutline size={18}/></button>;

  return (
    <li className="marker-item" key={marker.place_id} onClick={() => console.log(idx) }>
      <div className="marker-name">
        <h3>{marker.place_name} </h3>
      </div>
      <div className="marker-details">
        <p className="subtitle">{mainType}</p>
        {markerButtons}
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
