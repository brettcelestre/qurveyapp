var User = require('./usersModel.js');

module.exports = {
  allUsers: function(req, res) {
    User.find({}, function(err, allUsers) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(allUsers);
      }
    });

  },
  findUser: function(req, res) {
    User.findOne({username: req.body.username})
    .exec(function(err, foundUser) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else if (!foundUser) {
        res.status(404).send('user does not exist');
      } else {
        res.send(foundUser);
      }
    });    
  }
};