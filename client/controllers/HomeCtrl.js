
angular.module('qurvey.controllers')

.controller('HomeController', function($scope, $state, Main, Graph, Search, $mdMedia, $mdDialog, Login) {

  // open login dialog
  // $scope.login = function(ev) {
  //   $state.go('login');
  // };
  
  // Stores username and password
  $scope.username = '';
  $scope.password = '';
  // State for disabling Login button
  $scope.submitCheck = true;
  
  // Checks if username and password are filled out
  $scope.loginButtonCheck = function(){
    if ( $scope.username.length >= 1 && $scope.password.length >= 1) {
      // Enables Login button
      $scope.submitCheck = false;
      // Removes invalid error, if showing
      var invalid = document.getElementById('invalid');
      invalid.classList.remove('invalid-show');
      invalid.classList.add('invalid-hide');
    } else {
      // Disables Login button
      $scope.submitCheck = true;
    }
  };

  // Sends username and password to /auth/login
  $scope.userLogin = function(){
    // Creates login info object to send to API
    var userInfo = { 
      username: $scope.username,
      password: $scope.password
    };
    // Calls /auth/login POST with userInfo
    Login.login(userInfo)
      .then(function(data){
        // If vaildUser is true, change state to questions
        if ( data.status === 200) {
          // Change state to questions
          $state.go('main');
        // Else
        } else {
          // Display 'Invalid user error'
          var invalid = document.getElementById('invalid');
          invalid.classList.remove('invalid-hide');
          invalid.classList.add('invalid-show');
        }
      })
      .catch(function(data){
        console.error('Error with login: ', data)
      });
      
    // Clears inputs
    $scope.username = '';
    $scope.password = '';
  };
  
  // Open signup dialog
  $scope.signup = function(ev){
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
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: './views/signup.html',
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
  
});
