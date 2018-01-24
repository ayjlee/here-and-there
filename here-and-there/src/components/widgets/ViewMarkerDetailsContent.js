import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MapMarker from './MapMarker';
import { Link } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import NewNoteForm from '../forms/AddNoteForm';
import * as FontAwesome from 'react-icons/lib/fa';
import * as MdIconPack from 'react-icons/lib/md';
import AddMarkerLink from './AddMarkerLink';
import NoteListItem from './NoteListItem';
import NoteList from './NoteList';

class ViewMarkerDetailsContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNoteForm: false,
    }
    this.el = document.createElement('div');
    const marker = this.props.marker;
    this.addNoteToMarker = this.addNoteToMarker.bind(this);
    this.toggleNoteForm = this.toggleNoteForm.bind(this);
  }
  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    this.props.root.appendChild(this.el);
  }
  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    this.props.root.removeChild(this.el);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.marker !== nextProps.marker) {
      this.setState({ showNoteForm: false });
    }
  }
  addMarkerToMap(marker) {
    this.props.addMarkerToMap(marker);
  }
  toggleNoteForm() {
    const display = this.state.showNoteForm;
    this.setState({showNoteForm: (!display)});
  }
  addNoteToMarker(note) {
    console.log('adding note to marker in view markerdetails')
    // const currentNotes = this.newMarker.notes
    // const stringNote = `${note.author}: ${note.text} (${note.type})`
    // const updatedNotes = currentNotes.push(note);
    // this.newMarker.notes = currentNotes;
    // console.log('the notes for this marker are:');
    // console.log(this.newMarker.notes);
  }
  updateNotes(updatedNotes) {
    console.log(`updating this marker's notes to` );
    console.log(updatedNotes);
  }
  render() {
    const marker = this.props.marker;
    const name = marker.place_name ? marker.place_name : 'unavailable';
    const photoUrl = (marker.additional_details.photo_url && marker.additional_details.photo_url.length > 0 ) ? marker.additional_details.photo_url : 'photo unavailable';
    const rating = marker.additional_details.rating? marker.additional_details.rating: 'unavailable';
    const address = marker.address ? marker.address : 'unavailable';
    const phone_num = marker.additional_details.phone_num ? marker.additional_details.phone_num : 'unavailable';
    const opening_hours = marker.additional_details.opening_hours ? marker.additional_details.opening_hours.weekday_text.join(" ") : 'unavailable';
    const open_now = (marker.opening_hours && marker.opening_hours.open_now) ? 'Open Now!' : 'Closed Now';
    const website = marker.additional_details.website ? marker.additional_details.website : 'unavailable'

    const currentNotes = (marker.notes.length > 0) ?
      <NoteList notes={marker.notes} updateCurrentNotes={ updatedNotes => this.updateNotes(updatedNotes)} isEditing={this.props.isEditing}/> : null;

    const toggleNote = (this.state.showNoteForm) ? 'Hide Note Form' : 'Add Note';

    const noteBtn = this.props.isEditing ? <button id="show-note-btn" alt="add-note" onClick={() => this.toggleNoteForm()}> {toggleNote} </button> : null;

    const noteForm = (this.state.showNoteForm) ? <NewNoteForm place={marker.placeName} editingMap={this.props.editingMap} onAddNote={note => this.addNoteToMarker(note)} /> : null;

    const map = this.props.map;
    const details = (<div id="place-details">
      <h3>Name: {name} </h3>
      <div className="place-img">
        <img src={photoUrl} />
      </div>
      <div className="helpful-place-info">
        <p>Rating: {rating} stars</p>
        <p>Website: {website} </p>
        <p>Address: {address} </p>
        <p>Phone Number: {phone_num} </p>
      </div>
      <div className="place-notes" >
        <h3>Notes: </h3>
        {currentNotes}
      </div>
      {noteBtn}
      {noteForm}

    </div>)

    return ReactDOM.createPortal(
    // Any valid React child: JSX, strings, arrays, etc.
    details,
    // A DOM element
    this.el,
    );
  }
}

export default ViewMarkerDetailsContent;
