
angular.module('Qurvey', [
  'qurvey.controllers',
  'qurvey.services',
  // // 'qurvey.directives',
  'ui.router'
])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/'); // Initialize home route
  $urlRouterProvider.otherwise('/'); // Default route
  
  $stateProvider
    // Login state config
    .state('login', {
      url: '/',
      views: {
        'main': {
          templateUrl: 'views/login.html',
          controller: 'LoginController'   
        }
      }
    })
    
    // Sign up state config
    .state('signup', {
      url: '/signup',
      views: {
        'main': {
          templateUrl: 'views/signup.html',
          controller: 'SignUpController'
        }
      }
    })
    
    // Account state config
    .state('account', {
      url: '/account',
      templateUrl: 'views/account.html',
      controller: 'AccountController'
    })
    
    // Main Content Page after logging in
    .state('main', {
      url: '/main',
      // Sets default children views
      params: { 
        autoActivateChild: 'main.questions'
      },
      views: {
        'main': {
          templateUrl: 'views/main.html',
          controller: 'MainController'
        }
      }
    })
    
    // Main > Questions Section. Auto populates with Top filter selected
    .state('main.questions', {
      parent: 'main',
      url: '/questions',
      params: { 
        autoActivateChild: 'main.questions.filter'
      },
      views: {
        'content': {
          templateUrl: 'views/main.questions.html',
          controller: 'QuestionController'
        }
      }
    })
    
    .state('main.questions.filter', {
      parent: 'main.questions',
      // url: '/questions',
      views: {
        'feed': {
          templateUrl: 'views/question-filter.html',
          controller: 'QuestionFilterController'
        }
      }
    })
    
    .state('main.ask', {
      parent: 'main.questions',
      url: '/main/ask',
      views: {
        'feed': {
          templateUrl: 'views/main.ask.html',
          controller: 'AskController'
        }
      }
    });

  
}])

.run(['$rootScope', '$state', '$stateParams',
  function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      var aac;
      if(aac = toState && toState.params && toState.params.autoActivateChild) {
        $state.go(aac);
      }
    });
    
}]);









// angular
//     .module('app', []);


// var qurvey = angular.module('Qurvey', [
//   'qurvey.controllers',
//   'qurvey.services',
//   // 'qurvey.directives',
//   'ui.router'
// ]);

// qurvey.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
//   $urlRouterProvider.when('', '/'); // Initialize home route
//   $urlRouterProvider.otherwise('/'); // Default route
  
//   $stateProvider
//     // .state('login', {
//     //   url: '/',
//     //   templateUrl: 'views/login.html',
//     //   controller: 'LoginController'
//     // })
//     .state('login', {
//       url: '/',
//       views: {
//         'main': {
//           templateUrl: 'views/login.html',
//           controller: 'LoginController'   
//         }
//       }
//       // templateUrl: 'views/login.html',
//       // controller: 'LoginController'
//     })
//     .state('signup', {
//       url: '/signup',
//       templateUrl: 'views/signup.html',
//       controller: 'SignUpController'
//     })
//     .state('account', {
//       url: '/account',
//       templateUrl: 'views/account.html',
//       controller: 'Accou1ntController'
//     })
//     .state('main', {
//       parent: 'login',
//       url: '/main',
//       controller: 'MainController',
//       templateUrl: 'views/main.html'
//     })
//     .state('main.questions', {
//       url: '/questions',
//       templateUrl: 'views/questions.html',
//       controller: 'QuestionsController'
//       // views : {
//       //   '@' : {
//       //     // templateUrl: "/App/WebSite/programsComplete.html"
//       //     templateUrl: 'views/questions.html',
//       //     controller: 'QuestionsController'
//       //   }
//       // }
//     })
//     .state('main.ask', {
//       url: '/main/ask',
//       templateUrl: 'views/ask.html',
//       controller: 'AskController'
//     });

// }]);



// qurvey.config.set({
//   files: [
//     'build/angular.js',
//     'build/angular-mocks.js'  // Adds ngMock for unit tests
//   ]
// });