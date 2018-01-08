import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class SearchBox extends Component {
  onSubmit(e) {
    e.preventDefault();
  }
  componentDidMount() {
    this.renderAutoComplete();
  }
  componentDidUpdate(prevProps) {
    const {google, map} = this.props;
    if (map !== prevProps.map) {
      this.renderAutoComplete();
    }
  }
  renderAutoComplete() {
    console.log('in renderAutoComplete')
    const {google, map} =this.props;
    console.log('the props in renderAutocomplete are:')
    console.log(this.props);
    console.log(google);
    // TODO: Change conditional back to the commented out one below
    if (!google || !map) return;
    const aref = this.refs.autocomplete;
    const node = ReactDOM.findDOMNode(aref);
    console.log('the node for renderAutoComplete is:')
    console.log(node);
    let autocomplete = new google.maps.places.Autcomplete(node);
    console.log('the autocomplete object is:');
    console.log(autocomplete);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
    })
  }

  render() {

    return (
      <div id= "search-box">
        <form onSubmit={this.onSubmit}>
            <input
              ref='autocomplete'
              type="text"
              placeholder="Enter a location" />
            <input
              className='submit-search'
              type='submit'
              value='Go' />
          </form>

      Search Box should be added here
      </div>
    );
  }
}

export default SearchBox;
