import React, { Component } from "react";
import GoogleLogin from '../widgets/GoogleLogin';
import NewMapForm from '../forms/AddMapForm';

class NewMapPage extends Component {
  render() {
    return (
      <div className="full-page">
        <NewMapForm url="http://localhost:3001/api/maps" pollInterval={2000}/>
      </div>
    );
  }
}

export default NewMapPage;
