
var qurvey = angular.module('Qurvey', [
  'qurvey.controllers',
  'qurvey.services',
  // 'qurvey.directives',
  'ui.router'
]);

qurvey.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/'); // Initialize home route
  $urlRouterProvider.otherwise('/'); // Default route
  
  $stateProvider
    .state('login', {
      url: '/',
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html',
      controller: 'SignUpController'
    })
    .state('account', {
      url: '/account',
      templateUrl: 'views/account.html',
      controller: 'AccountController'
    })
    .state('questions', {
      url: '/questions',
      templateUrl: 'views/questions.html',
      controller: 'QuestionController'
    })
    .state('ask', {
      url: '/ask',
      templateUrl: 'views/ask.html',
      controller: 'AskController'
    });

}]);


