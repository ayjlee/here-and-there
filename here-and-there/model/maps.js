
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
var MapsSchema = new Schema({
 author: String,
 name: String,
 city: String,
 country: String,
 markers: Array,
});
//export our module to use in server.js
module.exports = mongoose.model('Map', MapsSchema);
