import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MapMarker from './MapMarker';
import { Link } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import NewNoteForm from '../forms/AddNoteForm';
import * as FontAwesome from 'react-icons/lib/fa';
import * as MdIconPack from 'react-icons/lib/md';
import AddMarkerLink from './AddMarkerLink';

class ViewMarkerDetailsContent extends Component {
  constructor(props) {
    super(props);
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.
    this.el = document.createElement('div');
    const place = this.props.place;
    const map = this.props.map;
    this.newMarker = {
      position: place.position,
      place_name: place.place_name,
      notes: [],
      tags: [],
      place_id: place.place_id,
    };
    this.addNoteToMarker = this.addNoteToMarker.bind(this);
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
    console.log('adding marker to map in place details content');
    this.props.addMarkerToMap(marker);
  }
  addNoteToMarker(note) {
    console.log('adding note to marker in place details content')
    const currentNotes = this.newMarker.notes
    // const stringNote = `${note.author}: ${note.text} (${note.type})`
    const updatedNotes = currentNotes.push(note);
    this.newMarker.notes = currentNotes;
    console.log('the notes for this marker are:');
    console.log(this.newMarker.notes);
  }
  render() {
    const place = this.props.place;
    const map = this.props.map;
    console.log('map in viewmarkerdetails content is:');
    console.log(map);
    const details = (<div id="place-details">
      <h2> this is the info window </h2>
      <p>Name: {place.name} </p>
      <img src="" width="16" height="16" id="place-icon" />
      <span id="place-name"  className="title"></span>
      <span id="place-address"></span>
      <p> Available Place info: {place.place_id} </p>
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
