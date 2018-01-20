'use strict';
import path from 'path';
//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
// get reference to the client build directory

var Map = require('../here-and-there/model/maps');

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set
//it up, or 8080
var port = process.env.PORT || 8080;

//db config- connect to my MongoDB database
mongoose.connect('mongodb://HereandThereAda:Maps4U@ds237967.mlab.com:37967/here-and-there-data');

const staticFiles = express.static(path.join(__dirname, '../../here-and-there/build'));
// pass the static files (react app) to the express app.
app.use(staticFiles);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now we can set the route path & initialize the API
router.get('/', function (req, res) {
  res.json({ message: 'API Initialized!' });
});

//adding the /maps route to our /api router
router.route('/maps')
//retrieve all maps from the database
.get(function (req, res) {
  //looks at our Map Schema
  Map.find(function (err, maps) {
    if (err) {
      res.send(err);
    }
    //responds with a json object of our database maps.
    res.json(maps);
  });
})
//post new map to the database
.post(function (req, res) {
  var map = new Map();
  //body parser lets us use the req.body
  map.author = req.body.author;
  map.name = req.body.name;
  map.save(function (err) {
    if (err) {
      res.send(err);
    }
    res.json(map._id);
  });
});

router.route('/maps/:map_id').get(function (req, res) {
  //looks at our Map Schema
  Map.findById(req.params.map_id, function (err, map) {
    if (err) {
      res.send(err);
    }
    //responds with a json object of our database maps.
    res.json(map);
  });
}).put(function (req, res) {
  Map.findById(req.params.map_id, function (err, map) {
    if (err) {
      res.send(err);
    }
    req.body.author ? map.author = req.body.author : null;
    req.body.name ? map.name = req.body.name : null;
    req.body.savedMarkers ? map.savedMarkers = req.body.savedMarkers : null;
    req.body.savedPlaces ? map.savedPlaces = req.body.savedPlaces : null;
    map.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Map has been updated with author ' + map.author + ', name ' + map.name + ',  saved Markers ' + map.savedMarkers + ', and savedPlaces ' + map.savedPlaces + ' ' });
    });
  });
}).delete(function (req, res) {
  Map.remove({ _id: req.params.map_id }, function (err, map) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'map has been deleted' });
  });
});

//Use our router configuration when we call /api
app.use('/*', staticFiles)
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function () {
  console.log('api server running on port ' + port);
});
