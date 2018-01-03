import {Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CurrentMap from './CurrentMap';

ReactDOM.render(<CurrentMap />, document.getElementById('root'));
registerServiceWorker();
