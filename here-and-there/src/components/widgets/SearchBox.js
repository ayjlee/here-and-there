import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MapMarker from './MapMarker';
import { Link } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import NewNoteForm from '../forms/AddNoteForm';
import * as FontAwesome from 'react-icons/lib/fa';
import * as MdIconPack from 'react-icons/lib/md';
import AddMarkerLink from './AddMarkerLink';
import EditPlaceDetailsContent from './EditPlaceDetailsContent';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }
  onSubmit(e) {
    e.preventDefault();
  }
  componentDidMount() {
    this.renderAutoComplete();
    this.placeInfoRoot = document.getElementById('place-note-details-pane');
    // placeInfoRoot.appendChild(this.el);
  }
  componentDidUpdate(prevProps) {
    const {google, map} = this.props;
    if (map !== prevProps.map) {
      this.renderAutoComplete();
    }
  }
  onAddPlaceClick(e) {
    console.log('in add place click');
    console.log(e);
    console.log(this);
  }
  createMapMarker(place) {
    console.log('in createMapMarker');
    const { google, map, mapData } = this.props;
    console.log(`position is ${place.geometry.location}`);
    return <MapMarker map={map} google={google} position={place.geometry.location} placeId={place.place_id} />
  }
  addPlaceToMap(marker) {
    console.log('adding place to map');
  }
  addMarkerToMap(marker) {
    console.log('adding the following marker to map');
    console.log(marker);
    this.props.onAddMarker(marker);
  }
  renderAutoComplete() {
    const {google, map} = this.props;
    if (!google || !map) return;
    const aref = this.refs.autocomplete;
    const node = ReactDOM.findDOMNode(aref);
    let infoWindow = new google.maps.InfoWindow()
    // console.log('the map in search box props is a google map object, not the map list');
    // console.log('the map data in search box props is');
    // console.log(this.props.mapData);

    const autocomplete = new google.maps.places.Autocomplete(node);

    // autocomplete.bindTo('bounds', map);
    //
    autocomplete.addListener('place_changed', () => {
      infoWindow.close();
      const place = autocomplete.getPlace();

      if (!place.geometry) {
        return;
      }
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
      const pref = {
        map: map,
        position: place.geometry.location,
      };
      const newPlaceMarker = new google.maps.Marker(pref);

      const address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
              ].join(' ');

      const iw = new google.maps.InfoWindow({
        content: '',
      });

      const iwBox = (
        <div id="info-window-content">
          <h2> this is the info window </h2>
          <p>Name: {place.name} </p>
          <img src="" width="16" height="16" id="place-icon" />
          <span id="place-name"  className="title"></span>
          <span id="place-address"></span>
            <AddMarkerLink onClick={()=> console.log('clicking addmarker button')} onClickonAddMarker={this.addMarkerToMap} place={place}/>
          <p> Available Place info: {place.place_id} </p>
          <a>Add Note<MdIconPack.MdNoteAdd /> </a>
          <h2> This is the form to add a new note</h2>
            <NewNoteForm place={place} marker={newPlaceMarker} map={map} />
      </div>
    );

    // const iwLink = (
    //   <Link>
    // )
      const iwContent = ReactDOMServer.renderToString(iwBox);

      google.maps.event.addListener(newPlaceMarker, 'click', function() {
        iw.setContent(iwContent);
        iw.open(map, newPlaceMarker);
      });
      console.log('in render autocomplete, this.placeinforoot is:')
      console.log(this.placeInfoRoot);

      const placeDetails = <EditPlaceDetailsContent root={this.placeInfoRoot} place={place} map={map} google={google} />

      this.props.showPlaceDetails(place);

    });
  }

  render() {
    return (
      <div id= "search-box">
        <form onSubmit={this.onSubmit}>
            <input
              id='googleSearch'
              ref='autocomplete'
              type="text"
              placeholder="Enter a location" />
            <input
              className='submit-search'
              type='submit'
              value='Go' />
          </form>
      </div>
    );
  }
}

export default SearchBox;

// return ReactDOM.createPortal(
// // Any valid React child: JSX, strings, arrays, etc.
// placeDetails,
// // A DOM element
// this.placeInfoRoot,
// );
