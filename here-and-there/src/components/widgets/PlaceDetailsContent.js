import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MapMarker from './MapMarker';
import { Link } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import NewNoteForm from '../forms/AddNoteForm';
import * as FontAwesome from 'react-icons/lib/fa';
import * as MdIconPack from 'react-icons/lib/md';
import AddMarkerLink from './AddMarkerLink';

class PlaceDetailsContent extends Component {
  constructor(props) {
    super(props);
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.
    this.el = document.createElement('div');
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
  render() {
    const place = this.props.place;
    const map = this.props.map;
    const newMarker = {
      position: place.geometry.location,
      place_name: place.name,
      notes: '',
      place_id: place.place_id,
      savedToMap: false,
      map: map,
    }
    const details = (<div id="place-details">
      <h2> this is the info window </h2>
      <p>Name: {place.name} </p>
      <img src="" width="16" height="16" id="place-icon" />
      <span id="place-name"  className="title"></span>
      <span id="place-address"></span>
        <AddMarkerLink onAddMarker={this.addMarkerToMap} map={map} place={place} editingMap= {this.props.editingMap}/>
      <p> Available Place info: {place.place_id} </p>
      <a>Add Note<MdIconPack.MdNoteAdd /> </a>
      <h2> This is the form to add a new note</h2>
        <NewNoteForm place={place} map={map} />
    </div>)

    return ReactDOM.createPortal(
    // Any valid React child: JSX, strings, arrays, etc.
    details,
    // A DOM element
    this.el,
    );
  }
}

export default PlaceDetailsContent;
