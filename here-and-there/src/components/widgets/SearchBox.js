import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
  renderAutoComplete() {
    const {google, map} = this.props;
    // TODO: Change conditional back to the commented out one below
    if (!google || !map) return;
    const aref = this.refs.autocomplete;
    const node = ReactDOM.findDOMNode(aref);

    let autocomplete = new google.maps.places.Autocomplete(node);

    // autocomplete.bindTo('bounds', map);
    //
    autocomplete.addListener('place_changed', () => {

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
        const newPlaceMarker = new google.maps.Marker(pref);
        console.log('the new place marker is:');
        console.log(newPlaceMarker);

        const iw = new google.maps.InfoWindow({
          content: `place is: ${place}`,
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

      Search Box should be added here
      </div>
    );
  }
}

export default SearchBox;
