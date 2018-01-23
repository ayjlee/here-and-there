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
    // console.log('deleting note with index:');
    console.log(idx);

    const updatingNotes = this.props.notes;
    updatingNotes.splice(idx, 1);

    console.log('after note deletion, current notes are:');
    console.log(updatingNotes);

    this.props.updateCurrentNotes(updatingNotes);

  }
  render() {
    const noteNodes = this.props.notes.map((note, index) => {
      return (
        <NoteListItem key={index} note={note} idx={index} onNoteDelete={ idx => this.handleNoteDelete(idx)}/>
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
