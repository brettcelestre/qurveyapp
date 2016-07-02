
angular.module('qurvey.controllers')

.controller('LoginController', function($scope, $state) {
  
  $scope.username = '';
  $scope.password = '';
  
  $scope.validPassword = false;

  $scope.userLogin = function(){
    console.log('login: ');
  };

  $scope.signUp = function(){
    // Change state to signup
    $state.go('signup');
  };

});