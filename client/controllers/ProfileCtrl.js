
angular.module('qurvey.controllers')

.controller('ProfileController', function($scope, $state, Main) {

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
      })
      .catch(function(data){
        console.error('Error with login: ', data)
      });
  }();
  
  // Stores data to display in profile.html
  $scope.user = Main.userObject.username;
  $scope.traits = Main.userObject.traits;
  $scope.userQuestionTotal = Object.keys(Main.userObject.questionsAsked).length;
  $scope.userAnswerTotal = Object.keys(Main.userObject.questionsAnswered).length;
  
  // console.log('Main.userObject.username Profile Data: ', Main.userObject.username);
  
  // Sets up userQuestion function to display this users questions
  $scope.userQuestions = function(){
  //   console.log('userQuestions function ran');
  //   GET and display all users questions
  };
  
  // Sets up userAnswers function to display this users answers
  $scope.userAnswers = function(){
    // console.log('userAnswers function ran');
    // GET and display all users answers
  };

});