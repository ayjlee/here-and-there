import React, { Component } from 'react';

class NewPlaceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      place_name: '',
      place_id: '',
      city: '',
      country: '',
      position: {
      lat: lat,
      lng: lng
      },
      notes: [],
      labels: [],
      categories: [],
      maps: [],
      saved_to_acct: false, saved_to_current_map: false
    };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value });
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
