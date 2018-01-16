const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
const MapMarkerSchema = new Schema({
  author: String,
  place_name: String,
  map_id: String,
  position: Object,
  place_id: String,
  notes: [String],
});

module.exports = mongoose.model('MapMarker', MapMarkerSchema);
