var mongoose = require('mongoose');

// schema for user
var UserSchema = new mongoose.Schema({

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

  // traits obj
  traits: [String]
  
});

module.exports = {
  model: mongoose.model('User', UserSchema),
  schema: UserSchema
};
