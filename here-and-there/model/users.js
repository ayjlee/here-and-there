//import dependency
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an object that shows the shape of your database entries.
const UsersSchema = new Schema({
  name: String,
  email: String,
  googleIdToken: String,
  savedMaps: Array,
  savedMarkers: Array,
});
//export our module to use in server.js
module.exports = mongoose.model('User', UsersSchema);
