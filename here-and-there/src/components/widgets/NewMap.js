import React, { Component } from 'react';
import marked from 'marked';
class NewMap extends Component {
  rawMarkup() {
    const rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div id='new-map'>
        <h3> name of map: {this.props.name}</h3>
        <span dangerouslySetInnerHTML={ this.rawMarkup() } />
      </div>
    );
  }
}
export default NewMap;
