import React, { Component } from 'react';
import SearchBox from  '../widgets/SearchBox';
import ReactDOM from 'react-dom';
import NewMapForm from '../forms/AddMapForm';
import { Route } from 'react-router-dom';
import MapContainer from '../widgets/MapContainer';
import EditMapContainer from '../widgets/EditMapContainer';

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
        <Route path="/buildmap" component={EditMapContainer}/>
      </section>
    );
  }
}

export default BuildMap;
