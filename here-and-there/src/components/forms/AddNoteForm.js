import React, { Component } from 'react';

class NewPlaceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      map_id: '',
      place_id: '',
      marker_id: '',
      text: '',
      type: [],
      saved_to_current_map: false
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handleTypeChange(e) {
    this.setState({ type: e.target.value });
  }
  handleCityChange(e) {
    this.setState({ city: e.target.value});
  }
  handleCountryChange(e) {
    this.setState({ country: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const author = this.state.author;
    // need to trim?
      // const author = this.state.author.trim();
    const name = this.state.name;
    const city = this.state.city;
    const country = this.state.country;

    if (!author || !name || !city || !country ){
      return;
    }
    this.props.onPlaceSubmit( {
      author: author, name: name, city: city, country: country
    });
    this.setState({ author: '', name: '', city: '', country: '' });
  }
  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type='text'
          placeholder='Your name...'
          value={ this.state.author }
          onChange={ this.handleAuthorChange } />
        <input
          type='text'
          placeholder='Name of your new map'
          value={ this.state.name }
          onChange={ this.handleNameChange } />
        <input
          type='text'
          placeholder='City'
          value={ this.state.city }
          onChange={ this.handleCityChange } />
        <input
          type='text'
          placeholder='Country'
          value={ this.state.country }
          onChange={ this.handleCountryChange } />
        <input
          type='submit'
          value='Post'/>
      </form>
    )
  }
}

export default NewPlaceForm;
