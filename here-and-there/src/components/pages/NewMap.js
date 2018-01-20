import React, { Component } from "react";
import NewMapForm from '../forms/AddMapForm';

class NewMapPage extends Component {
  render() {
    return (
      <div className="full-page">
        <NewMapForm url="here-and-there.herokuapp.com/api/maps" pollInterval={2000}/>
      </div>
    );
  }
}

export default NewMapPage;
