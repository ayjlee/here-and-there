import React, { Component } from "react";
import * as MdIconPack from 'react-icons/lib/md';

class AddMarkerLink extends Component {
  constructor(props) {
    super(props);
    this.state= {
      isClicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    console.log('clicking button');
  }
  render() {
    if (!this.props.place) {
      return <div> Loading map... </div>
    }
    return (
      <button onClick ={this.handleClick} alt="add-place-to-map"><MdIconPack.MdAddLocation /> {this.props.place.name} </button>
    );
  }
}

export default AddMarkerLink;
