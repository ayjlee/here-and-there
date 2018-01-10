import React, { Component } from 'react';
import SearchBox from  '../widgets/SearchBox';
import ReactDOM from 'react-dom';
import NewMapForm from '../forms/AddMapForm';
import { Route } from 'react-router-dom';
import MapContainer from '../widgets/MapContainer';

class BuildMap extends Component {
  // onSubmit(e) {
  //   e.preventDefault();
  // }
  // componentDidMount() {
  //   this.renderAutoComplete();
  // }
  // componentDidUpdate(prevProps) {
  //   const {google, map} = this.props;
  //   if (map !== prevProps.map) {
  //     this.renderAutoComplete();
  //   }
  // }
  // renderAutoComplete() {
  //   const {google, map} =this.props;
  //   if (!google || !map) return;
  //   const aref = this.refs.autocomplete;
  //   const node = ReactDOM.findDOMNode(aref);
  //   let autocomplete = new google.maps.places.Autcomplete(node);
  //   autocomplete.bindTo('bounds', map);
  // }
  render() {
    return (
      <section id="build-map-page-content">
        <div className= "sidepane-placeholder">
          <h2>Build Your New Map</h2>
          <h4>name</h4>

          <h4> where to? </h4>
          <SearchBox />
          <h4>places to add </h4>

          <p> what happens to div height when I add more text </p>
        </div>
        <div id="map-container">
          <h4> Map will go here </h4>
          <Route component={MapContainer}/>
        </div>
      </section>
    );
  }
}

export default BuildMap;
