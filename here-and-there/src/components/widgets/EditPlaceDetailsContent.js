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

class EditPlaceDetailsContent extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    const place = this.props.place;
    const map = this.props.map;
    const photoUrl = (place.photos && place.photos.length > 0 ) ? place.photos[0].getUrl({ 'maxWidth': 200, 'maxHeight': 200 }) : '';
    this.state = {
      currentNotes: [],
      showNoteForm: false,
      newMarker: {
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
          photo_url: photoUrl,
        },
      },
    };

    // this.newMarker = {
    //   position: place.geometry.location,
    //   place_name: place.name,
    //   address: place.formatted_address,
    //   notes: [],
    //   tags: place.types,
    //   place_id: place.place_id,
    //   additional_details: {
    //     opening_hours: place.opening_hours,
    //     website: place.website,
    //     rating: place.rating,
    //     price_level: place.price_level,
    //     phone_num: place.formatted_phone_number,
    //     icon: place.icon,
    //     photo_url: photoUrl,
    //   },
    // };
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
  componentWillReceiveProps(nextProps) {
    if (this.props.place !== nextProps.place) {
      const photoUrl = (nextProps.place.photos && nextProps.place.photos.length > 0 ) ? nextProps.place.photos[0].getUrl({ 'maxWidth': 200, 'maxHeight': 200 }) : '';

      this.setState({
        currentNotes: [],
        showNoteForm: false,
        newMarker: {
          position: nextProps.place.geometry.location,
          place_name: nextProps.place.name,
          address: nextProps.place.formatted_address,
          notes: [],
          tags: nextProps.place.types,
          place_id: nextProps.place.place_id,
          additional_details: {
            opening_hours: nextProps.place.opening_hours,
            website: nextProps.place.website,
            rating: nextProps.place.rating,
            price_level: nextProps.place.price_level,
            phone_num: nextProps.place.formatted_phone_number,
            icon: nextProps.place.icon,
            photo_url: photoUrl,
          },
        },
      })
    }
  }
  addMarkerToMap(marker) {
    this.props.addMarkerToMap(marker);
    // this.setState({ currentNotes: [] });
    // this.newMarker = {};
  }
  addNoteToMarker(note) {
    console.log('adding note to marker in place details content')
    // const updatingNotes = this.newMarker.notes
    const updatingNotes = this.state.newMarker.notes
    // const stringNote = `${note.author}: ${note.text} (${note.type})`
    updatingNotes.push(note);
    this.setState({ currentNotes: updatingNotes });
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

    const noteForm = (this.state.showNoteForm) ? <NewNoteForm place={place} map={map} marker={this.state.newMarker} editingMap={this.props.editingMap} onAddNote={ note => this.addNoteToMarker(note)}/> : null;

    const currentNotes = (this.state.currentNotes.length > 0) ? <NoteList notes={this.state.currentNotes} /> : null;

    const name = place.name ? place.name : 'unavailable';
    const photo = (place.photos && place.photos.length > 0 ) ? place.photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200}) : 'photo unavailable';
    const rating = place.rating? place.rating: 'unavailable';
    const address = place.formatted_address ? place.formatted_address : 'unavailable';
    const phone_num = place.formatted_phone_number ? place.formatted_phone_number : 'unavailable';
    const opening_hours = place.opening_hours ? place.opening_hours.weekday_text.join(" ") : 'unavailable';
    const open_now = (place.opening_hours && place.opening_hours.open_now) ? 'Open Now!' : 'Closed Now';
    const categories = place.types ? place.types.join(', ') : 'unavailable';
    const website = place.website ? place.website : 'unavailable'
    const details = (
      <div id="place-details">
        <h3>Name: {name} </h3>
        <div className="place-img">
          <img src={photo} />
        </div>
        <div className="helpful-place-info">
          <p>Rating: {rating} stars</p>
          <p>Website: {website} </p>
          <p>Address: {address} </p>
          <p>Phone Number: {phone_num} </p>
          <p>Opening Hours: {open_now}</p>
          <p>Categories: {categories} </p>
        </div>
        <div className="place-notes" >
          <h3>Notes: </h3>
          {currentNotes}
          <button id="show-note-btn" alt="add-note" onClick={() => this.toggleNoteForm()}> {toggleNote} <MdIconPack.MdNoteAdd size={30}/> </button>
          {noteForm}
          <AddMarkerLink onAddMarker={(marker) => this.addMarkerToMap(marker) } map={map} place={place} editingMap= {this.props.editingMap} marker={this.state.newMarker} />
        </div>
      </div>);

    return ReactDOM.createPortal(
    // Any valid React child: JSX, strings, arrays, etc.
    details,
    // A DOM element
    this.el,
    );
  }
}

export default EditPlaceDetailsContent;



// const noteForm = (this.state.showNoteForm) ? <NewNoteForm place={place} map={map} marker={this.state.newMarker} editingMap={this.props.editingMap} onAddNote={ note => this.addNoteToMarker(note)}/> : null;

// <AddMarkerLink onAddMarker={(marker) => this.addMarkerToMap(marker) } map={map} place={place} editingMap= {this.props.editingMap} marker={this.state.newMarker} />
