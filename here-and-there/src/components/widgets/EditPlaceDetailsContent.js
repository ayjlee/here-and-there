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

class EditPlaceDetailsContent extends Component {
  constructor(props) {
    super(props);
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.
    this.el = document.createElement('div');
    const place = this.props.place;
    const map = this.props.map;
    this.state = {
      currentNotes: [],
      showNoteForm: false,
    };
    this.newMarker = {
      position: place.geometry.location,
      place_name: place.name,
      address: place.formatted_address,
      notes: [],
      tags: place.types,
      place_id: place.place_id,
      additional_details: {
        opening_hours: place.opening_hours,
        website: place.website,
        rating: place.rating,
        price_level: place.price_level,
        phone_num: place.formatted_phone_number,
        icon: place.icon,
      },
    };
    this.addNoteToMarker = this.addNoteToMarker.bind(this);
    this.toggleNoteForm = this.toggleNoteForm.bind(this);
  }
  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    console.log('placedetails content mounted');
    this.props.root.appendChild(this.el);
  }
  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    this.props.root.removeChild(this.el);
  }
  addMarkerToMap(marker) {
    // console.log('adding marker to map in place details content, the marker is ');
    // console.log(marker);
    this.props.addMarkerToMap(marker);
  }
  addNoteToMarker(note) {
    console.log('adding note to marker in place details content')
    const updatingNotes = this.newMarker.notes
    // const stringNote = `${note.author}: ${note.text} (${note.type})`
    updatingNotes.push(note);
    this.setState({currentNotes: updatingNotes});
    console.log('the updated notes for this marker are:');
  }
  toggleNoteForm() {
    console.log('inShowNoteForm')
    const display = this.state.showNoteForm;
    this.setState({showNoteForm: (!display)});
  }
  render() {
    const place = this.props.place;
    const map = this.props.map;
    // const newMarker = {
    //   position: place.geometry.location,
    //   place_name: place.name,
    //   notes: [],
    //   tags: [],
    //   place_id: place.place_id,
    // };
    const toggleNote = (this.state.showNoteForm) ? 'Hide Note Form' : 'Add Note';

    const noteForm = (this.state.showNoteForm) ? <NewNoteForm place={place} map={map} marker={this.newMarker} editingMap={this.props.editingMap} onAddNote={ note => this.addNoteToMarker(note)}/> : null;

    // const currentNotes = (this.state.currentNotes.length > 0) ? this.state.currentNotes.map((note, index) => {
    //   return (
    //     <li key={index} className="marker-note"> {note.author}: {note.text} ({note.type}) </li>
    //   )
    // }) : null;

    const currentNotes = (this.state.currentNotes.length > 0) ? this.state.currentNotes.map((note, index) => {
      return (
        <NoteListItem key={index} note={note} />
      );
    }) : null;


    const name = place.name ? place.name : 'unavailable';
    const photo = place.photo ? place.photo : 'photo unavailable';
    const rating = place.rating? place.rating: 'unavailable';
    const address = place.formatted_address ? place.formatted_address : 'unavailable';
    const phone_num = place.formatted_phone_number ? place.formatted_phone_number : 'unavailable';
    const opening_hours = place.opening_hours ? place.opening_hours.weekday_text.join(" ") : 'unavailable';
    const open_now = (place.opening_hours && place.opening_hours.open_now) ? 'Open Now!' : 'Closed Now';
    const categories = place.types ? place.types.join(', ') : 'unavailable';

    console.log(place.opening_hours);
    const details = (<div id="place-details">
      <h4> Place Details:</h4>
      <h3>Name: {name} </h3>
      <img src={photo} />
      <p>Rating: {rating} stars</p>
      <p>Address: {address} </p>
      <p>Phone Number: {phone_num} </p>
      <p>Opening Hours: {open_now}</p>
      {opening_hours}
      <p>Categories: {categories} </p>
      <h3> Notes: </h3>
      {currentNotes}
      <button onClick={() => this.toggleNoteForm()}> {toggleNote} <MdIconPack.MdNoteAdd /> </button>
      {noteForm}
      <AddMarkerLink onAddMarker={(marker) => this.addMarkerToMap(marker) } map={map} place={place} editingMap= {this.props.editingMap} marker={this.newMarker} />
    </div>)

    return ReactDOM.createPortal(
    // Any valid React child: JSX, strings, arrays, etc.
    details,
    // A DOM element
    this.el,
    );
  }
}

export default EditPlaceDetailsContent;
