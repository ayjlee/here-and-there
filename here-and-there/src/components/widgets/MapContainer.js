import {GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import CurrentMap from './CurrentMap';
import SearchBox from  './SearchBox';

export class MapContainer extends React.Component {
  render() {
    const style = {
      width: '80vw',
      height: '80vh',
    }
    if (!this.props.loaded) {
      return <div>Loading Map Container...</div>
    }
    console.log('this.props.google is:');
    console.log(this.props.google);
    return (
      <div>
        <SearchBox google={this.props.google }/>
        <CurrentMap google= {this.props.google}/>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAPI_KEY,
  libraries: ['places', 'visualization'],
})(MapContainer);
