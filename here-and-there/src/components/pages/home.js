// top level react pages cannot be react class because React Router passes parameters in urls which are passed as parameters not props

import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className= "sidepane-placeholder">
        <h2>Hello</h2>
        <p>it me</p>

        <p>home.</p>
      </div>
    );
  }
}

export default Home;
