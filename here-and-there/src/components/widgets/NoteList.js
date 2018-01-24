import React, { Component } from "react";
import axios from 'axios';
import NoteListItem from './NoteListItem';

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = { updatedNotes: [], notesHaveChanged: false };
    this.handleNoteDelete = this.handleNoteDelete.bind(this);
  }
  componentDidMount() {
    // this.loadMapsFromServer();
  }
  handleNoteDelete(idx) {
    const updatingNotes = this.props.notes;
    updatingNotes.splice(idx, 1);
    this.props.updateCurrentNotes(updatingNotes);

  }
  render() {
    const noteNodes = this.props.notes.map((note, index) => {
      return (
        <NoteListItem isEditing={this.props.isEditing} key={index} note={note} idx={index} onNoteDelete={ idx => this.handleNoteDelete(idx)}/>
      );
    });
    return (
      <section id="my-map-list-container">
        <ul id="notes-list">
          { noteNodes }
        </ul>
      </section>
    );
  }
}

export default NoteList;
