
angular.module('qurvey.controllers')

.controller('MainController', function($scope, $state, Main) {
  
  $scope.searchTerm = '';
  $scope.currentUser = '';
  
  $scope.questions = function() {
    $state.go('main.questions');
  };
  
  $scope.search = function() {
    // Invoke Search service
    // console.log('MainController search ran', $scope.searchTerm);
    
  };
  
  $scope.profile = function() {
    $state.go('profile');
  };

  $scope.settings = function() {
    $state.go('settings');
  };

  // Logs user out and redirects to /login
  $scope.logout = function() {
    // Calls /auth/logout
    Main.logout()
      .then(function(){
        $state.go('login');
      })
      .catch(function(data){
        console.error('Error with login: ', data)
      });
  };
  
  // Checks current session for username
  $scope.currentUsername = function(){
    // Calls /auth/checkSession
    Main.currentUser()
      .then(function(data){
        console.log('main.currentUser fn: ', data);
        $scope.currentUser = data.data.username;
      })
      .catch(function(data){
        console.error('Error with login: ', data)
      });
  }();

});