// top level react pages cannot be react class because React Router passes parameters in urls which are passed as parameters not props

import React, { Component } from "react";
import { Link } from 'react-router-dom';
import map from '../misc/map.png';

class Home extends Component {
  render() {
    return (
      <div className="full-page" id="welcome-page">
        <div id="welcome-msg-box">
          <div id="welcome-msg">
            <h1 id="welcome-intro-name">here and there</h1>
            <div id="home-subtitle">
              <h2>  Build maps and share your favorite places with friends</h2>
            </div>


            <Link to="/newmap" id="home-start-link">
              Let's get started!
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
