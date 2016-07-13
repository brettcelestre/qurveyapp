
angular.module('qurvey.controllers')

.controller('ProfileController', function($scope, $state, Main) {
  
  $scope.init = function(){
    Main.currentUser()
      .then(function(){
        $scope.user = Main.userObject.username;
        $scope.traits = Main.userObject.traits;
        $scope.userQuestionTotal = Object.keys(Main.userObject.questionsAsked).length;
        $scope.userAnswerTotal = Object.keys(Main.userObject.questionsAnswered).length;
      })
      .catch(function(data){
        console.error('Error with login: ', data)
      });
  }();
  
  $scope.user = Main.userObject.username;
  $scope.traits = Main.userObject.traits;
  $scope.userQuestionTotal = Object.keys(Main.userObject.questionsAsked).length;
  $scope.userAnswerTotal = Object.keys(Main.userObject.questionsAnswered).length;
  
  console.log('Main.userObject.username PROFILE: ', Main.userObject.username);
  
  //Main.currentUser.username;
  
  $scope.userQuestions = function(){
    console.log('userQuestions function ran');
  };
  
  $scope.userAnswers = function(){
    console.log('userAnswers function ran');
    
  };

});