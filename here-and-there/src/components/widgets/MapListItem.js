import React, { Component } from "react";
import axios from 'axios';

class MapListItem extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.onMyMapClick(this.props.item.id);
  }
  render() {
    return (
      <li onClick={this.onClick}>
        ...
      </li>
    )
  }
}

export default MapListItem;
