// top level react pages cannot be react class because React Router passes parameters in urls which are passed as parameters not props

import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="full-page">
        <div id="welcome-msg-box">
          <h1 id="welcome-intro-name">here and there</h1>
          <div id="home-subtitle">
            <h2>  Build maps and share your favorite places with friends</h2>
          </div>


          <Link to="/newmap" id="home-start-link">
            Let's get started!
          </Link>
        </div>
        <div>
          Image will go here
        </div>
      </div>
    );
  }
}

export default Home;
