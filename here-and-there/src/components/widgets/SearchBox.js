import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MapMarker from './MapMarker';
import { Link } from 'react-router-dom';

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
    const {google, map} = this.props;
    console.log(`position is ${place.geometry.location}`);
    return <MapMarker map={map} google={google} position={place.geometry.location} placeId={place.place_id} />
  }
  addToMapLink(marker) {
    return (
      <div>
        <Link to="/library" className="add-marker-link">
          Add To Map
        </Link>
      </div>
    );
  }
  // makeIwContent(place) {
  //   const address = [
  //             (place.address_components[0] && place.address_components[0].short_name || ''),
  //             (place.address_components[1] && place.address_components[1].short_name || ''),
  //             (place.address_components[2] && place.address_components[2].short_name || '')
  //           ].join(' ');
  //   return (
  //     <div className="iw-content">
  //       <h2> this is the info window for the place: {place.name} </h2>
  //       <p>Address: {address} </p>
  //     </div>
  //   )
  // }
  renderAutoComplete() {
    const {google, map} = this.props;
    if (!google || !map) return;
    const aref = this.refs.autocomplete;
    const node = ReactDOM.findDOMNode(aref);
    let infoWindow = new google.maps.InfoWindow()
    const infoWindowContent = document.getElementById('info-window-content');
    console.log('infoWindowContent is:')
    console.log(infoWindowContent);

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
        const link = this.addToMapLink(newPlaceMarker);
        const address = [
                  (place.address_components[0] && place.address_components[0].short_name || ''),
                  (place.address_components[1] && place.address_components[1].short_name || ''),
                  (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');

        const iw = new google.maps.InfoWindow({
          content: `Place is: ${place.name}, address is: ${address}, link: ${link}`,
        });
        iw.open(map, newPlaceMarker);

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
