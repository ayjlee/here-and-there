import React, { Component } from "react";
import GoogleLogin from '../widgets/GoogleLogin';
import NewMapForm from '../forms/AddMapForm';

class NewMapPage extends Component {
  render() {
    return (
      <div className= "full-page">
        <NewMapForm />
      </div>
    );
  }
}

export default NewMapPage;
