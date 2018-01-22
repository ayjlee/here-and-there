import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

class NoteListItem extends Component {

  render() {
    const note= this.props.note;
    const typeClassName = "note-" + note.type;

    return (
      <li key={note.text} className={typeClassName}>
        <div className="note-type">
          <p>{note.type}</p>
        </div>
        <div className="note-author">
          <p>{note.author}: </p>
        </div>
        <div className="note-text-section">
          <p> {note.text} </p>
        </div>
      </li>
    )
  }

}

export default NoteListItem;
