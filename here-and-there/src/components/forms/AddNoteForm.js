import React, { Component } from 'react';
import * as MdIconPack from 'react-icons/lib/md';

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
    this.setState({ text: e.target.value });
  }
  handleTypeChange(e) {
    this.setState({ type: e.target.value });
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const map = this.props.map;
    const place = this.props.place;
    const marker = this.props.marker;
    const author = this.state.author;
    const text = this.state.text;
    const type = this.state.type;
    const editingMap = this.props.editingMap;

    const newNote = {
      author: author,
      type: type,
      text: text
    }
    this.props.onAddNote(newNote);

    this.setState({
      author: '', text: '', type: [], saved_to_current_map: false, map_id: '',   place_id: '', marker_id: ''
    });
  }
  render() {
    return (
      <form id="add-note-form" onSubmit={this.handleSubmit}>
        <h5>Add a Note:</h5>
        <select value={this.state.type} onChange={this.handleTypeChange}>
          <option disabled value="">Select Note Type</option>
          <option value="misc">Misc.</option>
          <option value="recommendation">Recommendation</option>
          <option value="tip">Insider Tip</option>
        </select>
        <input type="text" placeholder="Author" value={this.state.author} onChange={this.handleAuthorChange} />
        <textarea placeholder="Your note here" value={this.state.text} onChange={this.handleTextChange} />
        <input
          type="submit"
          value="Save Note"
        />
      </form>
    );
  }
}

export default NewNoteForm;
