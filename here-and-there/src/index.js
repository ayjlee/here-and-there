import {Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CurrentMap from './CurrentMap';
import MapContainer from './MapContainer';

ReactDOM.render(<MapContainer />, document.getElementById('root'));
registerServiceWorker();
