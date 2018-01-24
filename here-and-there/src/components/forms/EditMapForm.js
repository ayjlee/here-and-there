import React, { Component } from 'react';
import axios from 'axios';
import {
  Redirect,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import Library from '../pages/Library';

class EditMapForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: '', name: '', savedToUser: false, savedMarkers: [], savedPlaces: [] };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddMarker = this.handleAddMarker.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  handleAddMarker(e) {
    const newMarkers = this.state.savedMarkers;
    newMarkers.concat(e.target.value);

    this.setState({ savedMarkers: newMarkers });
  }
  postNewMap(newMap) {
    axios.post(this.props.url, newMap)
    .then(res => {
      this.setState({ data:res, savedToUser: true });
      // this.props.history.push('/library');
    })
    .catch(err => {
      console.log(err);
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    const author = this.state.author;
    const name = this.state.name;
    const savedMarkers = this.state.savedMarkers;

    if (!author || !name || !savedMarkers ) {
      return;
    }
    this.postNewMap( {
      author: author, name: name, savedMarkers: savedMarkers,
    });
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

export default EditMapForm;
