
angular.module('qurvey.controllers')

.controller('MainController', function($scope, $state) {
  
  $scope.searchTerm = '';
  
  $scope.questions = function() {
    $state.go('main.questions')
  };
  
  $scope.search = function() {
    // Invoke Search service
    console.log('MainController search ran', $scope.searchTerm);
    
  };
  
  $scope.profile = function() {
    $state.go('profile');
  };

  $scope.settings = function() {
    $state.go('settings');
  };

  $scope.logout = function() {
    $state.go('login');
  };

});