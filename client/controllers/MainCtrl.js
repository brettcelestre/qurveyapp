
angular.module('qurvey.controllers')

.controller('MainController', function($scope, $state, Main, Graph, Search, $mdMedia, $mdDialog) {
  
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
        $state.go('home');
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
  $scope.search = function() {
    // Converts search term to lower case
    var searchLowerCase = $scope.searchTerm.toLowerCase();
    // Sets Main.searchTerm to current search input
    Search.search({search: searchLowerCase})
      .then(function(data){
        console.log('Search Complete --------------');
      })
      .catch(function(data){
        console.error('Error with login: ', data)
      });
    // Changes state to search-results
    $state.go('search-results');
  };
  
  $scope.ask = function(ev) {
    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: './views/main.ask.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      console.log('answer: ', answer);
      if ( answer.complete ) {
        console.log('answer with hide: ', answer.complete);
        $mdDialog.hide();
      }
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };

  // Redirects to 'settings' view, currently disabled
  // $scope.settings = function() {
  //   $state.go('settings');
  // };
  
});
