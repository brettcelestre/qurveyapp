
angular.module('qurvey.controllers')

.controller('ProfileController', function($scope, $state, Main, Graph, Profile) {
  
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

  // Initializes currently user data  
  $scope.init = function(){
    // Retrieves user data from MainService
    Main.currentUser()
      .then(function(){
        // Stores data to display in profile.html
        $scope.user = Main.userObject.username;
        $scope.traits = Main.userObject.traits;
        $scope.userQuestionTotal = Object.keys(Main.userObject.questionsAsked).length;
        $scope.userAnswerTotal = Object.keys(Main.userObject.questionsAnswered).length;
        // Run users data through filtering
        var userQuestions = Main.userObject.questionsAsked;
        // Iterates over
        userQuestions.forEach(function(dataVal){
          // Set userAnswered to false
          dataVal.userAnswered = false;  
          dataVal.classes = {
            a: 'md-raised',
            b: 'md-raised',
            c: 'md-raised',
            d: 'md-raised',
            e: 'md-raised'
          }
          // Cleans up createdAt string
          // Cuts off date string after date. Don't use this because
          // it messes up the filter inside of ng-repeat
          dataVal.createdAt = dataVal.createdAt.substring(0,10);
          // Hides 'already voted' warning
          dataVal.alreadyVotedWarning = false;
          // Adds username to object
          dataVal.username = $scope.user;
          // Iterate over this users previous answers
          Main.userObject.questionsAnswered.forEach(function(userVal) {
            // Check if this user has answered this question
            if ( userVal.question === dataVal._id ) {
              // If the user has answered this question, set userAnswered to true
              dataVal.userAnswered = true;
              // Store responseIndex in userAnswer
              dataVal.userAnswer = userVal.responseIndex;
              // Applies appropriate class
              dataVal.classes[userVal.responseIndex] = 'md-raised md-primary';
              // What is returned is a graph data set for this question id
              Graph.getGraph(dataVal._id)
              .then(function(graphData) {
                // The data is appended to the DOM inside of the service
              })
              .catch(function(data) {
                console.error('Error with login: ', data)
              });
            }
          });
          // Push this question into recentData
          $scope.userQuestions.push(dataVal);
        });
        
        // Sends POST to /api/statistics/getAnswersQuestions with user ID
        Profile.getAnswersQuestions({'userid': Main.userObject.userID })
          .then(function(data){
            // Iterates through each question        
            data.data.questionsAnswered.forEach(function(dataVal){
              // Set userAnswered to false
              dataVal.question.userAnswered = true;  
              dataVal.question.classes = {
                a: 'md-raised',
                b: 'md-raised',
                c: 'md-raised',
                d: 'md-raised',
                e: 'md-raised'
              }
              // Cleans up createdAt string
              // Cuts off date string after date. Don't use this because
              // it messes up the filter inside of ng-repeat
              dataVal.question.createdAt = dataVal.question.createdAt.substring(0,10);
              // Hides 'already voted' warning
              dataVal.question.alreadyVotedWarning = false;
              // Sets username inside node
              dataVal.question.username = $scope.user;
              // Iterate over this users previous answers
              Main.userObject.questionsAnswered.forEach(function(userVal) {
                // Check if this user has answered this question
                if ( userVal.question === dataVal.question._id ) {
                  // If the user has answered this question, set userAnswered to true
                  dataVal.question.userAnswered = true;
                  // Store responseIndex in userAnswer
                  dataVal.question.userAnswer = userVal.responseIndex;
                  // Applies appropriate class for button users voted
                  dataVal.question.classes[userVal.responseIndex] = 'md-raised md-primary';
                  // What is returned is a graph data set for this question id
                  Graph.getGraph(dataVal.question._id)
                  .then(function(graphData) {
                    // The data is appended to the DOM inside of the service
                  })
                  .catch(function(data) {
                    console.error('Error with login: ', data)
                  });
                }
              });
              // Push this question into recentData
              $scope.userAnswers.push(dataVal.question); 
            });
          })
          .catch(function(data) {
            console.error('Error with login: ', data)
          });
      })
      .catch(function(data){
        console.error('Error with login: ', data)
      });
  }();

  // Stores data to display in profile.html
  $scope.user = Main.userObject.username;
  $scope.traits = Main.userObject.traits;

  // $scope.userQuestions = Main.userObject.questionsAsked;
  $scope.userQuestions = [];
  $scope.userQuestionTotal = Object.keys(Main.userObject.questionsAsked).length;

  // $scope.userAnswers = Main.userObject.questionsAnswered;
  $scope.userAnswers = [];
  $scope.userAnswerTotal = Object.keys(Main.userObject.questionsAnswered).length;

  $scope.buttonQuestions = 'menu-button-selected menu-button';
  $scope.buttonAnswers = 'menu-button';

  // Sets up userQuestion function to display this users questions
  $scope.userQuestionsProfile = function(){
    // Updates button styles
    $scope.buttonQuestions = 'menu-button-selected menu-button';
    $scope.buttonAnswers = 'menu-button';
    $state.go('profile-questions');
  };
  
  // Sets up userAnswers function to display this users answers
  $scope.userAnswersProfile = function(){
    // Updates button styles
    $scope.buttonQuestions = 'menu-button';
    $scope.buttonAnswers = 'menu-button-selected menu-button';
    $state.go('profile-answers');
  };

});