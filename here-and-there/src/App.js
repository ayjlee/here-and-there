// import {Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
import './App.css';
import {
  Route,
  NavLink,
  Redirect,
  BrowserRouter,
  Switch,
} from 'react-router-dom';
// TODO: look up pros/cons of using Hashrouter over BrowserRouter
import Home from './components/pages/Home';
import Library from './components/pages/Library';
import SignIn from './components/pages/SignIn';
import NewMapPage from './components/pages/NewMap';
import EditMapContainer from './components/widgets/EditMapContainer';
import ViewMapContainer from './components/widgets/MapContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  render() {
    return (
      <BrowserRouter>
        <div id="main">
          <h1 id="title">here and there</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/newmap">Build a New Map</NavLink></li>
            <li><NavLink to="/library">Library</NavLink></li>
            <li><NavLink to="/sign-in">Sign In</NavLink></li>
          </ul>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/newmap" component={NewMapPage} />
              <Route path="/edit-map/:map_id" component={EditMapContainer} />
              <Route path="/maps/:map_id" component={ViewMapContainer} />
              <Route path="/library" component={Library}/>
              <Route path="/sign-in" component={SignIn}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

// edit map link:
// <li><NavLink to="/edit-map/:map_id">Edit a Map</NavLink></li>
