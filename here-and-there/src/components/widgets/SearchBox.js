import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MapMarker from './MapMarker';
import { Link } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import NewNoteForm from '../forms/AddNoteForm';

export class SearchBox extends Component {
  onSubmit(e) {
    e.preventDefault();
  }
  componentDidMount() {
    this.renderAutoComplete();
  }
  componentDidUpdate(prevProps) {
    const {google, map} = this.props;
    if (map !== prevProps.map) {
      this.renderAutoComplete();
    }
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
  renderAutoComplete() {
    const {google, map} = this.props;
    if (!google || !map) return;
    const aref = this.refs.autocomplete;
    const node = ReactDOM.findDOMNode(aref);
    let infoWindow = new google.maps.InfoWindow()
    const infoWindowContent = document.getElementById('info-window-content');
    console.log('the map in search box props is a google map object, not the map list');
    console.log('the map data in search box props is');
    console.log(this.props.mapData);

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
        const pref = {
          map: map,
          position: place.geometry.location,
        };
        console.log('in autocomplete, when we get a place, the available information is:');
        console.log(place);
        console.log('position lat. is');
        console.log(place.geometry.location.lat);
        console.log('infoWindowContent is:')
        console.log(infoWindowContent);
        const newPlaceMarker = new google.maps.Marker(pref);

        // const iwContent = this.makeIwContent(place);
        // console.log('iwContent is:');
        // console.log(iwContent);
        const address = [
                  (place.address_components[0] && place.address_components[0].short_name || ''),
                  (place.address_components[1] && place.address_components[1].short_name || ''),
                  (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');

        // const iw = new google.maps.InfoWindow({
        //   content: `<div>Place is: ${place.name}, address is: ${address}</div><button onclick="addPlaceToMap()">Add Me to Map</button>`,
        // });
        const iw = new google.maps.InfoWindow({
          content: '',
        });

        const iwBox = (<div id="info-window-content">
          <h2> this is the info window </h2>
          <p>Name: {place.name} </p>
          <img src="" width="16" height="16" id="place-icon" />
          <span id="place-name"  className="title"></span>
          <span id="place-address"></span>
          <p> Available Place info: {place.place_id} </p>
            <h2> This is the form to add a new note</h2>

            <NewNoteForm place={place} marker={newPlaceMarker} map={map} />
        </div>);

        const iwContent = ReactDOMServer.renderToString(iwBox);
        google.maps.event.addListener(newPlaceMarker, 'click', function() {
          iw.setContent(iwContent);
          iw.open(map, newPlaceMarker);
        });

      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
        const pref = {
          map: map,
          position: place.geometry.location,
        };
        const newPlaceMarker = new google.maps.Marker(pref);
      }
    });
  }

  render() {

    return (
      <div id= "search-box">
        <form onSubmit={this.onSubmit}>
            <input
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
