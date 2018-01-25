import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as MdIconPack from 'react-icons/lib/md';


class NoteListItem extends Component {

  render() {
    const note= this.props.note;
    const typeClassName = "note note-" + note.type;
    const idx = this.props.idx;
    const deleteNoteBtn = this.props.isEditing ? <button id="delete-note-btn" key={idx} onClick={() => this.props.onNoteDelete(idx)}> <MdIconPack.MdRemoveCircleOutline size={18}/>Delete </button> : null;

    return (
      <li key={note.text} className={typeClassName}>
        <div className="note-type">
          <p>{note.type}</p>
          {deleteNoteBtn}
        </div>
        <div className="note-text-section">
          {note.text}
          <div className="note-author">
             - {note.author}
          </div>
        </div>
      </li>
    )
  }

}

export default NoteListItem;
