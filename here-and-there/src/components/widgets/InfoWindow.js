import React, { Component } from 'react';
// use ReactDomServer to translate the children of the <InfoWindow /> component in our <MapContainer /> into an HTML string
import ReactDOMServer from 'react-dom/server';

class InfoWindow extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    // console.log('in InfoWindow componentDidUpdate()');
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
  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      this.props.visible ? this.openWindow() : this.closeWindow();
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
    const { map, google, mapCenter } = this.props;

    const iw = this.infowindow = new google.maps.InfoWindow({
      content: ''
    });

    // iw.open(map, this.marker);
    // const iwBox = (<div id="info-window-content">
    //   <h2> this is the info window </h2>
    //   <p>Name: {place.name} </p>
    //   <img src="" width="16" height="16" id="place-icon" />
    //   <span id="place-name"  className="title"></span>
    //   <span id="place-address"></span>
    // </div>)

    // const iwContent = ReactDOMServer.renderToString(iwBox);
    // google.maps.event.addListener(newPlaceMarker, 'click', function() {
    //   iw.setContent(
    //     iwContent
    //   );
    //   iw.open(map, newPlaceMarker);
    // });

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
