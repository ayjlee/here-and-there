import React, { Component } from 'react';
import axios from 'axios';
import {
  Redirect,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import Library from '../pages/Library';

class NewMapForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: '', name: '', savedToUser: false, savedMarkers: [], map_id: '' };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  postNewMap(newMap) {
    console.log(' in postNew Map, the url is:');
    console.log(this.props.url);
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

    if (!author || !name ) {
      return;
    }
    this.postNewMap( {
      author: author, name: name, savedMarkers: savedMarkers
    });
    this.setState({ author: '', name: '', savedMarkers: [] });
  }
  render() {
    if (this.state.savedToUser) {
      const newMapId= this.state.map_id;
      const newPath=`/edit-map/${newMapId}`
      return <Redirect to={newPath} />;
    }
    return (
      <form onSubmit={this.handleSubmit} id="new-map-form">
        <label> Name:</label>
        <input
          type="text"
          placeholder='Name of your new map'
          value={this.state.name}
          onChange={this.handleNameChange} />
        <label> Author: </label>
        <input
          type='text'
          placeholder='Your name...'
          value={this.state.author}
          onChange={this.handleAuthorChange} />
        <label> Where To? </label>
        <input
          type='text'
          placeholder='Destination (optional)'
          value={this.state.city}
          onChange={this.handleCityChange} />
        <input
          type='submit'
          value='Build New Map'/>
      </form>
    );
  }
}

export default NewMapForm;


// more fleshed out Map Form below:
// constructor(props) {
//   super(props);
//   this.state = { author: '', name: '', city: '', country: '' };
//   this.handleAuthorChange = this.handleAuthorChange.bind(this);
//   this.handleNameChange = this.handleNameChange.bind(this);
//   this.handleCityChange = this.handleCityChange.bind(this);
//   this.handleCountryChange = this.handleCountryChange.bind(this);
//   this.handleSubmit = this.handleSubmit.bind(this);
// }
// handleAuthorChange(e) {
//   this.setState({ author: e.target.value });
// }
// handleNameChange(e) {
//   this.setState({ name: e.target.value });
// }
// handleCityChange(e) {
//   this.setState({ city: e.target.value});
// }
// handleCountryChange(e) {
//   this.setState({ country: e.target.value });
// }
// handleSubmit(e) {
//   e.preventDefault();
//   const author = this.state.author;
//   // need to trim?
//     // const author = this.state.author.trim();
//   const name = this.state.name;
//   const city = this.state.city;
//   const country = this.state.country;
//
//   if (!author || !name || !city || !country ){
//     return;
//   }
//   this.props.onCommentSubmit( {
//     author: author, name: name, city: city, country: country
//   });
//   this.setState({ author: '', name: '', city: '', country: '' });
// }
// render() {
//   return (
//     <form onSubmit={ this.handleSubmit }>
//       <input
//         type='text'
//         placeholder='Your name...'
//         value={ this.state.author }
//         onChange={ this.handleAuthorChange } />
//       <input
//         type='text'
//         placeholder='Name of your new map'
//         value={ this.state.name }
//         onChange={ this.handleNameChange } />
//       <input
//         type='text'
//         placeholder='City'
//         value={ this.state.city }
//         onChange={ this.handleCityChange } />
//       <input
//         type='text'
//         placeholder='Country'
//         value={ this.state.country }
//         onChange={ this.handleCountryChange } />
//       <input
//         type='submit'
//         value='Build New Map'/>
//     </form>
//   );
// }
