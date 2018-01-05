// import {Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import './App.css';
import {
  Route,
  NavLink,
  HashRouter,
  BrowserRouter,
  Switch,
} from 'react-router-dom';
// TODO: look up pros/cons of using Hashrouter over BrowserRouter
import Home from './components/pages/Home';
import Library from './components/pages/Library';
import BuildMap from './components/pages/BuildMap';
import MapContainer from './components/widgets/MapContainer';
import CurrentMap from './components/widgets/CurrentMap';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div id="main">
          <h1 id= "title">here and there</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/buildmap">Build a New Map</NavLink></li>
            <li><NavLink to="/library">Library</NavLink></li>
          </ul>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/buildmap" component={BuildMap}/>
              <Route path="/library" component={Library}/>
            </Switch>
            <div id="map-container">
              <h4> Map will go here </h4>
              <Route component={MapContainer}/>
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
