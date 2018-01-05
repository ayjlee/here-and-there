const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
const MapMarkersSchema = new Schema({
  author: String,
  name: String,
  position: Object,
});

module.exports = mongoose.model('MapMarker', MapMarkersSchema);
