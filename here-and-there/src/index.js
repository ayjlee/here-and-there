import {Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CurrentMap from './components/widgets/CurrentMap';
import MapContainer from './components/widgets/MapContainer';
import MapMarker from './components/widgets/MapMarker';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
// ReactDOM.render(<MapContainer />, document.getElementById('root'));
// registerServiceWorker();
