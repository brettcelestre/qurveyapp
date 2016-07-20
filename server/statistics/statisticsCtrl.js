
// callbacks used by /api/stats routes

// models imported to interact with db
var Question = require('../questions/questionsModel.js');
var Answer = require('../answers/answersModel.js');
var User = require('../users/usersModel.js');

module.exports = {

  // return all stats based on single answer
  answerStatistics: function(req, res) {
    console.log('answerStatistics req.body: ', req.body);

    // question id          = req.body.id
    // option index letter  = req.body.index
    
    // Stores user answer objects
    var allAnswers = [],
        totalVoteCount = allAnswers.length,
    // Tracks stats for each trait
        traitStats = {};

    // Searches DB for selected question
    Question.find({_id: req.body.id})
      // Populate answerObjs
      .populate('answerObjs')
      // Populate user from within answerObjs
      .populate({path: 'answerObjs', populate: { path: 'user'}})
      .exec(function(err, questionData) {
        // Iterate through the answers
        questionData[0].answerObjs.forEach(function(val){
          // Create obj out of user data
          var userAnswer = {
            'index': val.responseIndex,
            'text': val.text,
            'username': val.user.username,
            'traits': val.user.traits
          }
          
          console.log('traits: ', val.user.traits);
          
          
          // Pushes userAnswer into allAnswers
          allAnswers.push(userAnswer);
          
          // Add traits to traitStats 
          val.user.traits.forEach(function(trait){
            var traitName = trait;
            
            // Check to see if the trait already exists
              // if it does, just increment counter
            // Else, created property with trait, initiate count at 0
            // traitStats[val.text] = {
            //   [trait]: count++
            // }
            
            
          })
          
          // console.log('index: ', val.responseIndex);
          // console.log('text: ', val.text);
          // console.log('username: ', val.user.username);
          
        });
        
        // console.log('questionData[0].answerObjs: ', questionData[0].answerObjs);
        console.log('allAnswers: ', allAnswers);
        console.log('totalVoteCount: ', totalVoteCount);
        console.log('traitStats: ', traitStats);
          
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.send(questionData);
        
        // User.populate(questionData, {
        //   path: 'traits',
        //   model: 'User'
        // }, function(err, traits) {
        // User.populate()}, function(err, traits) {
        //   if ( err ) {
        //     console.error(err);
        //   }
        // });
        
      }
    });
  },
  
  userAnswersQuestions: function(req, res){
    User.findOne( { _id: req.body.userid } )
        .populate('questionsAnswered')
        .populate({
          path: 'questionsAnswered',
          populate: { path: 'question'}
        })
        .exec(function(err, data) {
          if (err) {
            console.error(err);
            res.status(500).send(err);
          } else {
            res.send(data);
          }
    });
  }
  
  
};