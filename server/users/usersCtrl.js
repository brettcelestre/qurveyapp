// callbacks used by /users routes

// model imported to interact with db
var User = require('./usersModel.js');

module.exports = {
  allUsers: function(req, res) {

    // check if admin user
    if (req.session.user.username !== 'admin') {
      res.status(403).redirect('/');
    } else { 
      User.find({}, function(err, allUsers) {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else {
          res.status(200).send(allUsers);
        }
      });
    }

  },
  findUser: function(req, res) {
    // check if admin user
    if (req.session.user.username !== 'admin') {
      res.status(403).redirect('/');
    } else {  
      User.findOne({username: req.body.username})
      .populate('questionsAsked')
      .populate('questionsAnswered')
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
  }
};