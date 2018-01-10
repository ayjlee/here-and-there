import React, { Component } from 'react';

class NewNoteForm extends Component {
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
  handleSubmit(e) {
    e.preventDefault();
    const author = this.state.author;
    // need to trim?
      // const author = this.state.author.trim();
    const name = this.state.name;
    const map = this.props.map;
    const place = this.props.place;
    const marker = this.props.marker;

    if (!author || !text || !type ){
      return;
    }
    this.props.onPlaceSubmit( {
      author: author, text: text, type: type, saved_to_current_map: true, map_id: map, place_id: place, marker_id: marker,
    });
    this.setState({
      author: '', text: '', type: [], saved_to_current_map: false, map_id: '',   place_id: '', marker_id: ''
    });
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
          placeholder='Your note'
          value={ this.state.text }
          onChange={ this.handleTextChange }
        />
        <input
          type='text'
          placeholder='Type'
          value={ this.state.type }
          onChange={ this.handleTypeChange }
        />
        <input
          type='submit'
          value='Add Note'
        />
      </form>
    )
  }
}

export default NewNoteForm;
