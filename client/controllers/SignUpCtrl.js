
angular.module('qurvey.controllers')

.controller('SignUpController', function($scope, $state) {
  
  $scope.username = '';
  $scope.password = '';
  
  $scope.traits = ['Happy', 'Sad', 'Confused'];

});