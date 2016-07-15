
angular.module('qurvey.controllers')

.controller('SearchController', function($scope, $state, Main, Graph, Search, Recent) {
  
  // Stores search term from nav bar search input
  $scope.searchTerm = Search.searchResults.term;
  
  // Stores search results
  $scope.searchData = Search.searchResults.data;
  
  // Returns amount of answer options
  $scope.questionCount = function(questions) {
    var count = 0;
    for ( var key in questions ) {
      if ( questions[key].length >= 2 ){
        count++;
      }
    }
    return count;
  };
  
  // Submits single answer to database
  $scope.answer = function(text, z, questionID, userAnswer, dataID ) {
    // Check to see if the user has already answered this question
    // This disables a user to vote on a single question more than once
    if ( userAnswer ) {
      console.log('This user has already answered this question');
      // TODO -------------------------------------------- ***
      // Notify user they've already voted on this question
      // The below code attempts to trigger the warning message for the selected
      // question.
      
      // Iterates over recentData
      $scope.recentData.forEach(function(val) {
        // Finds exact question
        if ( val._id === questionID ) {
          console.log('val.alreadyVotedWarning: ', val.alreadyVotedWarning);
          // Shows 'Already voted' message
          val.alreadyVotedWarning = true;
          // $scope.$apply(function(){
          //   val.alreadyVotedWarning = true;
          // });
          console.log('val.alreadyVotedWarning after: ', val.alreadyVotedWarning);
        }
      });

    // If the user has not answered this question
    } else if ( !userAnswer ) {
      // Gets current user
      Main.currentUser()
        .then(function(data){
          // Saves username
          var user = data.data.username;
          // Creates answerData object for Recent.submitAnswer POST req
          var answerData = {
            // Answer's text
            text: text,
            // responseIndex = letter a-e chosen
            responseIndex: z,
            // Username string
            user: user,
            // Question ID
            question: questionID,
            // Creates a new date for this answer
            createdAt: new Date(),
          };
          // Sends POST req to /api/answers
          Recent.submitAnswer(answerData)
            .then(function(data){
              // Sends POST req to /api/graph with the question id
              Graph.getGraph(answerData.question)
              .then(function(graphData){
                // Graph is appended to the DOM inside of GraphService.js
              })
              .catch(function(data){
                console.error('Error with login: ', data)
              });
            })
            .then(function(data){
              // Updates the counter after submitting vote
              // Iterates over recentData
              $scope.searchData.forEach(function(val) {
                // Finds exact question
                if ( val._id === questionID ) {
                  // Increments chosen response by 1
                  val.responses[z] += 1;
                  val.userAnswer = z;
                  // Update button to indicate user voted that option
                  val.classes[z] = 'md-raised md-primary';
                  // Marks question as answered, disabled users ability to vote twice
                  val.userAnswered = true;
                }
              });
            })
            .catch(function(data){
              console.error('Error with login: ', data)
            });
        })
        .catch(function(data){
          console.error('Error with login: ', data)
        });
    }
  };

});
