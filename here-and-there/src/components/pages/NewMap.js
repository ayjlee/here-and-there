import React, { Component } from "react";
import NewMapForm from '../forms/AddMapForm';

class NewMapPage extends Component {
  render() {
    return (
      <div id="new-map-page">
        <h2 className="form-title"> Your New Map: </h2>
        <NewMapForm url="http://localhost:3001/api/maps" pollInterval={2000}/>
      </div>
    );
  }
}

export default NewMapPage;
