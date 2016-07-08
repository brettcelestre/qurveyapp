var User = require('../users/usersModel.js');

module.exports = {
  login: function(req, res) {
    res.send('login');
  },
  signup: function(req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err, newUser) {
      if (err) {
        res.send(err);
        return console.error(err);
      } else {  
        res.status(201).send(newUser);
      }
    });
  }
};