// this creates the user objects for testing the graph


var User = function(name, password, traits) {
  this.username = name;
  this.traits = [];
  this.password = password;
  // iterate over traits and add to traits obj
  for (var i = 0; i < traits.length; i++) {
    this.traits.push(traits[i]);
  }
};
module.exports = User;