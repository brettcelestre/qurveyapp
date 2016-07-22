
angular.module('qurvey.controllers')

// Functioning Unit Testing Controller declaration
// .controller('LoginController', ['$scope', function($scope, $state, Login) {

// Functioning Controller declaration
.controller('QuestionController', function($scope, $state) {
  
  // CSS classes for menu buttons inside of main.questions.html
  $scope.buttonQuestion = 'menu-button-selected menu-button';
  $scope.buttonAsk = 'menu-button';
  
  // CSS classes for filter options inside of main.questions.filter.html
  $scope.buttonTop = 'menu-button-selected';
  $scope.buttonRecent = 'menu-button';
  
  $scope.questions = function(){
    // Updates button color for question / ask
    $scope.buttonQuestion = 'menu-button-selected';
    $scope.buttonAsk = 'menu-button';
    // Changes state to filter
    $state.go('main.questions.filter');
  };
  
  $scope.ask = function(){
    // Updates button color for question / ask
    $scope.buttonQuestion = 'menu-button';
    $scope.buttonAsk = 'menu-button-selected';
    // Changes state to ask
    $state.go('main.ask');
  };
  
  $scope.top = function(){
    // Updates button color for top / recent
    $scope.buttonTop = 'menu-button-selected';
    $scope.buttonRecent = 'menu-button';
    // Updates state to top
    $state.go('main.questions.top');
  };
  
  $scope.recent = function(){
    // Updates button color for top / recent
    $scope.buttonRecent = 'menu-button-selected';
    $scope.buttonTop = 'menu-button';
    // Updates state to recent
    $state.go('main.questions.recent');
  };
  
  // Set up a state change function for graph, disabled for now
  // $scope.graph = function(){
  //   $state.go('main.questions.graph');
  // };
  
// Closing Function Controller declaration
});

// Closing Function Unit Testing Controller declaration
// }]);