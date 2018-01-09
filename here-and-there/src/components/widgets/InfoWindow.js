import {GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import CurrentMap from './CurrentMap';
import SearchBox from  './SearchBox';
import MapMarker from './MapMarker';
// use ReactDomServer to translate the children of the <InfoWindow /> component in our <MapContainer /> into an HTML string
import ReactDOMServer from 'react-dom/server';

export class InfoWindow extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    console.log('in InfoWindow componentDidUpdate()');
    if (this.props.map !== prevProps.map) {
      this.renderInfoWindow();
    }

    if ((this.props.visible !== prevProps.visible) || (this.props.marker !== prevProps.marker)) {
      this.props.visible ? this.openWindow() : this.closeWindow();
    }

    if (this.props.children !== prevProps.children) {
      this.updateContent();
    }
  }
  updateContent() {
    const content = this.renderChildren();
    this.infowindow.setContent(content);
  }
  renderChildren() {
    const {children} = this.props;
    return ReactDOMServer.renderToString(children);
  }
  renderInfoWindow() {
    let {map, google, mapCenter} = this.props;

    const iw = this.infowindow = new google.maps.InfoWindow({
      content: ''
    });

    google.maps.event.addListener(iw, 'closeclick', this.onClose.bind(this));
    google.maps.event.addListener(iw, 'domready', this.onOpen.bind(this));
  }
  onOpen() {
    if (this.props.onOpen) this.props.onOpen();
  }
  onClose() {
    if (this.props.onClose) this.props.onClose();
  }
  openWindow() {
    this.infowindow.open(this.props.map, this.props.marker);
  }
  closeWindow() {
    this.infowindow.close();
  }
  render() {
    return null;
  }
}

export default InfoWindow;
