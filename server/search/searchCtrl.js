
// callbacks used by /api/answers routes

// models imported to interact with db
var Question = require('../questions/questionsModel.js');

module.exports = {
  
  allResults: function(req, res) {
    
    console.log('searchCtrl.allResults req.body: ', req.body);
    var searchTerm = '.*' + req.body.search + '.*';
    //
    Question.find({"questionSearch" : {$regex : searchTerm}})
      .populate('user', 'username')
      .exec(function(err, Questions) {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else {
          res.send(Questions);
        }
      });
    }
  
};