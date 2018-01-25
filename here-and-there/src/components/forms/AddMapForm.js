import React, { Component } from 'react';
import axios from 'axios';
import {
  Redirect,
  Route,
  BrowserRouter,
} from 'react-router-dom';

class NewMapForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: '', name: '', savedToUser: false, savedMarkers: [], map_id: '', destination: '', description: ''};
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  handleDestinationChange(e) {
    this.setState({ destination: e.target.value });
  }
  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }
  postNewMap(newMap) {
    axios.post(this.props.url, newMap)
    .then(res => {
      this.setState({ map_id: res.data, savedToUser: true });
      // this.props.history.push('/library');
    })
    .catch(err => {
      console.log(err);
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    const author = this.state.author;
    // need to trim?
      // const author = this.state.author.trim();
    const name = this.state.name;
    const savedMarkers = this.state.savedMarkers;
    const destination = this.state.destination;
    const description = this.state.description;

    if (!author || !name ) {
      return;
    }
    this.postNewMap( {
      author: author, name: name, savedMarkers: savedMarkers, destination: destination, description: description
    });
    this.setState({ author: '', name: '', savedMarkers: [], destination: '', description: '' });
  }
  render() {
    if (this.state.savedToUser) {
      const newMapId= this.state.map_id;
      const newPath=`/edit-map/${newMapId}`
      return <Redirect to={newPath} />;
    }
    return (
      <form onSubmit={this.handleSubmit} id="new-map-form">
        <h2 className="form-title"> YOUR NEW MAP: </h2>
        <input
          type="text"
          placeholder='Name of your new map'
          value={this.state.name}
          onChange={this.handleNameChange} />
        <input
          type='text'
          placeholder='Author (your name..)'
          value={this.state.author}
          onChange={this.handleAuthorChange} />
        <input
          type='text'
          placeholder='Destination (optional)'
          value={this.state.destination}
          onChange={this.handleDestinationChange} />
        <input
          type='text'
          placeholder='Description (optional)'
          value={this.state.city}
          onChange={this.handleDescriptionChange} />
        <input
          type='submit'
          value='Build New Map'/>
      </form>
    );
  }
}

export default NewMapForm;
