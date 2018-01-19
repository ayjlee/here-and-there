
//first we import our dependencies…
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const Map = require('./model/maps');
const User = require('./model/users');

//and create our instances
const app = express();
const router = express.Router();

//set our port to either a predetermined port number if you have set
//it up, or 3001
const port = process.env.API_PORT || 3001;

//db config- connect to my MongoDB database
mongoose.connect('mongodb://HereandThereAda:Maps4U@ds237967.mlab.com:37967/here-and-there-data');

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// use sessions for tracking logins
  // secret is used to sign the session ID cookie
  // saveUninitialized forces a session that is uninitialized to be saved to store
  // resave forces session to be saved back to the session store, even if session was never modified during the request
  // app.use(session({
  //   secret: 'isWizard',
  //   resave: true,
  //   saveUninitialized: false,
  // }));


//now we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

//adding the /users route to our /api router
  // router.route('/users')
  //   .get(function(req, res) {
  //     User.find(function(err, users) {
  //       if (err) {
  //         res.send(err);
  //       }
  //       res.json(users);
  //     })
  //   })
  //   .post(function(req, res) {
  //     if (req.body.email && req.body.googleIdToken) {
  //       const userData = {
  //         name: req.body.name,
  //         email: req.body.email,
  //         googleIdToken: req.body.googleIdToken,
  //         savedMaps: req.body.savedMaps,
  //         savedMarkers: req.body.savedMarkers,
  //       };
  //
  //       // using schema.create to create new User and insert their data into the database
  //       User.create(userData, function (err, user) {
  //         if (err) {
  //           return next(err);
  //         } else {
  //           // on successful user creation, set current session id to user's id
  //           req.session.userId = user._id;
  //           // when logged in, redirect to user's library. TODO: setup library path
  //           return res.redirect('/library');
  //         }
  //       })
  //     }
  //   });

//adding the /maps route to our /api router
router.route('/maps')
 //retrieve all maps from the database
  .get(function(req, res) {
 //looks at our Map Schema
   Map.find(function(err, maps) {
    if (err) {
      res.send(err);
    }
      //responds with a json object of our database maps.
    res.json(maps)
  });
  })
 //post new map to the database
 .post(function(req, res) {
  var map = new Map();
  //body parser lets us use the req.body
  map.author = req.body.author;
  map.name = req.body.name;
  map.save(function(err) {
   if (err) {
     res.send(err);
   }
   res.json({ message: `Map successfully added! the request body is ${req.body}` });
  });
});

router.route('/maps/:map_id')
  .get(function(req, res) {
  //looks at our Map Schema
    Map.findById(req.params.map_id, function(err, map) {
     if (err) {
       res.send(err);
     }
      //responds with a json object of our database maps.
     res.json(map);
    });
  })
  .put(function(req, res) {
    Map.findById(req.params.map_id, function(err, map) {
      if (err) {
        res.send(err);
      }
      (req.body.author) ? map.author = req.body.author : null;
      (req.body.name) ? map.name = req.body.name : null;
      (req.body.savedMarkers) ? map.savedMarkers = req.body.savedMarkers: null;
      (req.body.savedPlaces) ? map.savedPlaces = req.body.savedPlaces : null;
      map.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: `Map has been updated with author ${map.author}, name ${map.name},  saved Markers ${map.savedMarkers}, and savedPlaces ${map.savedPlaces} ` });
      });
    });
  })
  .delete(function(req, res) {
    Map.remove({ _id: req.params.map_id }, function(err, map) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'map has been deleted' });
    });
  });

// setup route to logout at GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete current session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        // redirect to home page
        return res.redirect('/');
      }
    });
  }
});

//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
 // console.log('server is set up');
});
