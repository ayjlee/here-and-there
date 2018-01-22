import React, { Component } from "react";
import axios from 'axios';
import NoteListItem from './NoteListItem';

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.handleNoteDelete = this.handleNoteDelete.bind(this);
  }
  componentDidMount() {
    // this.loadMapsFromServer();
  }
  handleNoteDelete(id) {

  }
  render() {
    const noteNodes = this.props.notes.map((note, index) => {
      return (
        <NoteListItem key={index} note={note} />
      );
    });
    return (
      <section id="my-map-list-container">
        <ul>
          { noteNodes }
        </ul>
      </section>
    );
  }
}

export default NoteList;
