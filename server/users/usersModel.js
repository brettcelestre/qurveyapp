var mongoose = require('mongoose');

// schema for user
var Schema = mongoose.Schema;
var UserSchema = new Schema({

  // username
  username: {
    type: String,
    required: true,
    unique: true
  },

  // password
  password: {
    type: String,
    required: true
  },

  // traits array
  traits: [String]
  
});

module.exports = mongoose.model('User', UserSchema);
