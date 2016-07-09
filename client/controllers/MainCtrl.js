
angular.module('qurvey.controllers')

.controller('MainController', function($scope, $state) {
  
  $scope.searchTerm = '';
  
  $scope.questions = function() {
    $state.go('main.questions')
  };
  
  $scope.search = function() {
    // Invoke Search service
  };
  
  $scope.profile = function() {
    console.log('MainController profile()');
    $state.go('profile');
  };

  $scope.settings = function() {
    console.log('MainController settings()');
    $state.go('settings');
  };

  $scope.logout = function() {
    console.log('MainController logout()');
    $state.go('login');
  };

});