var User = require('./usersModel.js');

module.exports = {
  allUsers: function(req, res) {
    User.find({traits:'happy'}, function(err, Users) {

      res.send(Users);
    });

  },
  newUser: function(req, res) {
    console.log(req.body);
    var newUser = new User(req.body);
    newUser.save(function(err, newUser) {
      if (err) {
        res.send(err);
        return console.error(err);
      }

      res.send(newUser);
    });
  }
};