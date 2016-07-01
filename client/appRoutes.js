angular.module('appRoutes', [])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
  
  .when('/login', {
    templateUrl: 'views/login.html'
  })

  .when('/createaccount', {
    templateUrl: 'views/createaccount.html'
  })
  
  .when('/account', {
    templateUrl: 'views/account.html'
  })
  
  .when('/questions', {
    templateUrl: 'views/questions.html'
  })

  .when('/ask', {
    templateUrl: 'views/ask.html'
  })

  .otherwise({
    redirectTo: "/login"
  });

  $locationProvider.html5Mode({
    // uncommenting the line below would cosmetically make the urls look nicer in the browser without showing the "/#" in each route. However, it causes refresh not to work.
    // enabled: true,
    // This line was added because we seemed to be getting an error without it
    requireBase: false
  });

}]);