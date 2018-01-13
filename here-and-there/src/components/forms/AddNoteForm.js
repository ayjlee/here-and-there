import React, { Component } from 'react';

class NewNoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      text: '',
      type: '',
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTextChange(e) {
    console.log('handling text change in new note form');
    this.setState({ text: e.target.value });
  }
  handleTypeChange(e) {
    console.log('handling type change in newnoteform');
    this.setState({ type: e.target.value });
  }
  handleAuthorChange(e) {
    console.log('handling author change in newnoteform');
    this.setState({ type: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const map = this.props.map;
    const place = this.props.place;
    const marker = this.props.marker;
    // need to trim?
      // const author = this.state.author.trim();
    const author = this.state.author;
    const text = this.state.text;
    const type = this.state.type;

    if (!author || !text || !type) {
      return;
    }
    console.log(`saved the note for this place: ${place} on this marker: ${marker} with this type: ${type}, with this map: ${map} and this text: ${text}`);
    // this.props.onPlaceSubmit( {
    //   author: author, text: text, type: type, saved_to_current_map: true, map_id: map, place_id: place, marker_id: marker,
    // });
    this.setState({
      author: '', text: '', type: [], saved_to_current_map: false, map_id: '',   place_id: '', marker_id: ''
    });
  }
  render() {
    console.log('in the new Map form, this is:')
    console.log(this);
    return (
      <form onSubmit={this.handleSubmit}>
        <select value={this.state.type} onChange={this.handleTypeChange}>
          <option value="misc">Misc.</option>
          <option value="recommendation">Recommendation</option>
          <option value="tip">`Insider Tip`</option>
        </select>
        <input type="text" placeholder="Author" value={this.state.author} onChange={this.handleAuthorChange} />
        <textarea placeholder="Your note here" value={this.state.text} onChange={this.handleTextChange} />
        <input
          type="submit"
          value="Add Note"
        />
      </form>
    );
  }
}

export default NewNoteForm;
