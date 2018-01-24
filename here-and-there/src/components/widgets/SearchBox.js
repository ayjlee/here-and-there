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
    this.resultMarker = null;
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
    let infoWindow = new google.maps.InfoWindow();

    const autocomplete = new google.maps.places.Autocomplete(node);

    // autocomplete.bindTo('bounds', map);
    //

    autocomplete.addListener('place_changed', () => {
      infoWindow.close();
      if (this.resultMarker) {
        this.resultMarker.setMap(null);
        this.resultMarker = null;
      }
      const place = autocomplete.getPlace();

      if (!place.geometry) {
        return;
      }
      if (place.geometry.location) {
        map.panTo(place.geometry.location);
        map.setCenter(place.geometry.location);
      } else if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
        // map.setCenter(place.geometry.location);
        // // map.panTo(place.geometry.viewport);
        // map.panTo(place.geometry.location);
        // map.setCenter(place.geometry.location);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
      const pref = {
        map: map,
        position: place.geometry.location,
      };
      const newPlaceMarker = new google.maps.Marker(pref);
      this.resultMarker = newPlaceMarker;
      console.log('this result marker position is');
      console.log(this.resultMarker.position);
      // map.panTo(newPlaceMarker.position);
      // map.setCenter(newPlaceMarker.position);

      const name = place.name ? place.name : 'unavailable';
      const photo = (place.photos && place.photos.length > 0 ) ? place.photos[0].getUrl({'maxWidth': 75, 'maxHeight': 75}) : 'photo unavailable';
      const rating = place.rating? (place.rating + ' stars'): 'unavailable';
      const address = place.formatted_address ? place.formatted_address : 'unavailable';
      const phone_num = place.formatted_phone_number ? place.formatted_phone_number : 'unavailable';
      const opening_hours = place.opening_hours ? place.opening_hours.weekday_text.join(" ") : 'unavailable';
      const categories = place.types ? place.types.join(', ') : 'unavailable';
      const website = place.website ? place.website : 'unavailable';

      // const address = [
      //           (place.address_components[0] && place.address_components[0].short_name || ''),
      //           (place.address_components[1] && place.address_components[1].short_name || ''),
      //           (place.address_components[2] && place.address_components[2].short_name || '')
      //         ].join(' ');

      const iw = new google.maps.InfoWindow({
        content: '',
      });

      console.log('place photo format is:');
      console.log(photo);
      const iwBox = (
        <div id="info-window-content">
          <p>Name: {name} </p>
          <img src={photo} />
          <p>Website: {website} </p>
          <p>Rating: {rating}</p>
          <p>Address: {address} </p>
          <p>Phone Number: {phone_num} </p>
        </div>
      );

      const iwContent = ReactDOMServer.renderToString(iwBox);
      //
      google.maps.event.addListener(newPlaceMarker, 'click', function() {
        iw.setContent(iwContent);
        iw.open(map, newPlaceMarker);
      });

      const placeDetails = <EditPlaceDetailsContent root={this.placeInfoRoot} place={place} map={map} google={google} />

      this.props.showPlaceDetails(place);
    });
  }

  render() {
    return (
      <div id="search-box">
        <form onSubmit={this.onSubmit}>
            <input
              id='googleSearch'
              ref='autocomplete'
              type="text"
              placeholder="Search for a place to add to your map" />
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
