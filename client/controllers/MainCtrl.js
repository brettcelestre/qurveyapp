
angular.module('qurvey.controllers')

.controller('MainController', function($scope, $state, Main) {
  
  // Stores search term from nav bar search input
  $scope.searchTerm = '';
  // Stores current users name to display in nav bar
  $scope.currentUser = '';
  
  // Loads 'main.question' view in ui-view 'content'
  $scope.questions = function() {
    $state.go('main.questions');
  };
  
  // Redirects to 'profile' view
  $scope.profile = function() {
    $state.go('profile');
  };

  // Logs user out and redirects to /login
  $scope.logout = function() {
    // Calls /auth/logout and removes users session
    Main.logout()
      .then(function(){
        // Redirects to 'login' view
        $state.go('login');
      })
      .catch(function(data){
        console.error('Error with login: ', data)
      });
  };
  
  // Checks current session for username
  $scope.currentUsername = function(){
    // Calls /auth/checkSession
    // This updates MainService.js's userObject with all of the users data
    Main.currentUser()
      .then(function(data){
        // Updates currentUser which displays in the nav bar
        $scope.currentUser = data.data.username;
      })
      .catch(function(data){
        console.error('Error with login: ', data)
      });
  // Invoked on load
  }();
  
  // Function to submit a search, currently disabled
  // $scope.search = function() {
  //   Invoke Search service
  //   Submit $scope.searchTerm with GET req
  // };  

  // Redirects to 'settings' view, currently disabled
  // $scope.settings = function() {
  //   $state.go('settings');
  // };
  
});