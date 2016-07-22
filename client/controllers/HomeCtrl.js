
angular.module('qurvey.controllers')

.controller('HomeController', function($scope, $state, Main, Graph, Search, $mdMedia, $mdDialog) {

  $scope.login = function(){
    // Changes state to login
    $state.go('login');
  };
  
  $scope.signup = function(){
    // Changes state to filter
    $state.go('signup');
  };
  
});
