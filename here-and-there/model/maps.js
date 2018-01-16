
//import dependency
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an object that shows the shape of your database entries.
const MapSchema = new Schema({
  author: String,
  name: String,
  url: String,
  savedMarkers: [Schema.Types.Mixed],
  savedPlaces: [Schema.Types.Mixed],
});
//export our module to use in server.js
module.exports = mongoose.model('Map', MapSchema);

// more fleshed out schema below:
  // author: String,
  // name: String,
  // city: String,
  // country: String,
  // position: Object,
  // url: String,
  // savedPlaces: Array,
