import React, { Component } from 'react';
import axios from 'axios';
import {
  Redirect,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import Library from '../pages/Library';

class AddMarkerForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: '', name: '', savedToUser: false };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectLibrary = this.redirectLibrary.bind(this);
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  addMarkerToMap(marker) {
    console.log(' in addmarkertomap');
  }
  handleSubmit(e) {
    e.preventDefault();
    const author = this.state.author;
    // need to trim?
      // const author = this.state.author.trim();
    const name = this.state.name;
    const note = this.state.note;

    if (!author || !name || !note) {
      return;
    }
    this.addMarkerToMap({
      author: author, name: name, note: note
    });
    this.setState({ author: '', name: '', note: '' });
  }
  render() {
    if (this.state.savedToUser) {
      return <Redirect to="/library" />;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder='Name of your new map'
          value={this.state.name}
          onChange={this.handleNameChange} />
        <input
          type='text'
          placeholder='Your name...'
          value={this.state.author}
          onChange={this.handleAuthorChange} />
        <input
          type='submit'
          value='Build New Map'/>
      </form>
    );
  }
}

export default AddMarkerForm;
