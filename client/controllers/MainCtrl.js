
angular.module('qurvey.controllers')

.controller('MainController', function($scope, $state, Main, Graph, Search, $mdMedia, $mdDialog, $timeout, $mdSidenav, $log) {
  
  // Stores search term from nav bar search input
  $scope.searchTerm = '';
  // Stores current users name to display in nav bar
  $scope.currentUser = '';
  
  $scope.menuClasses = 'menu';
  $scope.menuSearchClasses = 'menu-search';
  
  $scope.mainView = 'main-view';
  
  // Shows drop down menu
  $scope.showMenu = function(){
    if ( $scope.menuClasses === 'menu' ) {
      $scope.menuClasses = 'menu menu-show';
    } else {
      $scope.menuClasses = 'menu';
    }
  };
  
  // Shows drop down menu
  $scope.showSearch = function(){
    if ( $scope.menuSearchClasses === 'menu-search' ) {
      $scope.menuSearchClasses = 'menu-search menu-search-show';
      $scope.mainView = 'main-view-down';
    } else {
      $scope.menuSearchClasses = 'menu-search';
      $scope.mainView = 'main-view';
    }
  };
  
  // Hides menu if document is clicked
  // $(document).click(function(e){
  //   console.log('yo: ');
  //   if ( $scope.menuClasses === 'menu menu-show' ) {
  //     $scope.menuClasses = 'menu';
  //   }
  // });
  
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
    // Hides drop down menu
    $scope.menuClasses = 'menu';
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
  
  // ----------------Side nav for mobile test---------------------------
  
  // angular
  // .module('sidenavDemo1', ['ngMaterial'])
  // .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.toggleLeft = buildDelayedToggler('left');

  $scope.isOpenRight = function(){
    return $mdSidenav('right').isOpen();
  };
  /**
   * Supplies a function that will continue to operate until the
   * time is up.
   */
  function debounce(func, wait, context) {
    var timer;
    return function debounced() {
      var context = $scope,
          args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }
  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  function buildDelayedToggler(navID) {
    return debounce(function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }
  function buildToggler(navID) {
    return function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }
  }
  
  $scope.close = function () {
    // Component lookup should always be available since we are not using `ng-if`
    $mdSidenav('left').close()
      .then(function () {
        $log.debug("close LEFT is done");
      });
  };
  
  // Redirects to 'settings' view, currently disabled
  // $scope.settings = function() {
  //   $state.go('settings');
  // };
  
});
