import React, { Component } from 'react';

class NewMapForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: '', name: '', city: '', country: '' };
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
}
