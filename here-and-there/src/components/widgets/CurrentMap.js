import { GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const evtNames = ['ready', 'click', 'dragend'];
const camelize = function(str) {
  return str.split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
};

export class CurrentMap extends Component {
  constructor(props) {
    super(props);

    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng,
      },
    }
    this.rebindMap = this.rebindMap.bind(this);
  }
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude,
            },
            currentBounds: null,
          });
        },
      );
      }
    }
    this.loadMap();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
    if (prevProps.children !== this.props.children) {
      this.renderChildren();
      this.rebindMap();
    }
  }
  rebindMap() {
    const { children } = this.props;
    if ((!children) || (children[0] === null)) return;
    const google = this.props.google;
    const map = this.map;
    const bounds = new google.maps.LatLngBounds();
    React.Children.map(children, (c) => {
      if (c !== null) {
        if (c.props.markerData) {
          bounds.extend(c.props.markerData.position);
        }
      }
    });
    map.fitBounds(bounds);
  }
  recenterMap() {
    const map = this.map;
    const curr = this.state.currentLocation;
    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      const center = new maps.LatLng(curr.lat, curr.long);
      map.panTo(center);
    }
  }
  handleEvent(evtName) {
    let timeout;
    const handlerName = `on${camelize(evtName)}`;
    return (e) => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        if (this.props[handlerName]) {
          this.props[handlerName](this.props, this.map, e);
        }
      }, 0);
    }
  }
  loadMap() {
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node= ReactDOM.findDOMNode(mapRef);
      const { initialCenter, zoom } = this.props;
      const {lat, lng} = this.state.currentLocation;
      const center = new maps.LatLng(lat,lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
      
      evtNames.forEach((e) => {
        this.map.addListener(e, this.handleEvent(e));
      });

      maps.event.trigger(this.map, 'ready');
      this.props.action(this.map);

      // need to trgger this.forceupdate because MArker(children) will be rendered first; we need to forceUpdate when the map is loaded so that MapMarker has a this.map
      this.forceUpdate();
    }
  }
  renderChildren() {
    const { children } = this.props;
    if (!children) return;
    // use React.cloneElement() to add props to a child inside a component; here we use to append the map instance, map center, and google prop; return null if there are no children passed so we can have CurrentMaps without children;
    return React.Children.map(children, (c) => {
      if (c !== null) {
        return React.cloneElement(c, {
          map: this.map,
          google: this.props.google,
          mapCenter: this.state.currentLocation,
        });
      }
    });
  }
  render() {
    const style = {
      width: '100%',
      height: '50vh',
    };
    return (
      <div ref="map" style= {style}>
        The CurrentMap will load here
        {this.renderChildren()}
      </div>
    );
  }
}
CurrentMap.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  centerAroundCurrentLocation: PropTypes.bool,
  savedToAccount: PropTypes.bool,
  action: PropTypes.func,
};
CurrentMap.defaultProps = {
  zoom: 13,
  // Seattle location by default
  initialCenter: {
    lat: 47.6062,
    lng: -122.3321,
  },
  centerAroundCurrentLocation: false,
  savedToAccount: false,
  onDragend() {
    console.log('moving');
  },
  onClick() {
    console.log('clicking');
  },
  onReady() {
    console.log('ready');
  }
};
evtNames.forEach((e) => {
  CurrentMap.propTypes[camelize(e)] = PropTypes.func;
});

export default CurrentMap;
