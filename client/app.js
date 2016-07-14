
angular.module('Qurvey', [
  'qurvey.controllers',
  'qurvey.services',
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
    
    // Main Content Page after logging in
    .state('main', {
      url: '/main',
      // Sets default children ui-views to main.questions
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
    
    // Main > Questions Section.
    .state('main.questions', {
      parent: 'main',
      url: '/questions',
      // Sets default children ui-views to main.questions.filter
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
    
    // Main Question Filters
    .state('main.questions.filter', {
      parent: 'main.questions',
      // Sets default children ui-views to main.questions.top
      params: { 
        autoActivateChild: 'main.questions.top'
      },
      views: {
        'feed': {
          templateUrl: 'views/question-filter.html',
          controller: 'QuestionController'
        }
      }
    })
    
    // Main Question Filters
    .state('main.questions.graph', {
      parent: 'main.questions',
      views: {
        'feed': {
          templateUrl: 'views/graph.html',
          controller: 'GraphController'
        }
      }
    })
    
    // Main Questions
    .state('main.questions.top', {
      parent: 'main.questions.filter',
      url: '/top',
      views: {
        'question-feed': {
          templateUrl: 'views/main.questions.top.html',
          controller: 'QuestionController'
        }
      }
    })
    
    // Main Questions
    .state('main.questions.recent', {
      parent: 'main.questions.filter',
      url: '/recent',
      views: {
        'question-feed': {
          templateUrl: 'views/main.questions.recent.html',
          controller: 'QuestionController'
        }
      }
    })
    
    // Main Ask config
    .state('main.ask', {
      parent: 'main.questions',
      url: '/ask',
      views: {
        'feed': {
          templateUrl: 'views/main.ask.html',
          controller: 'AskController'
        }
      }
    })
    
    // Profile state config
    .state('profile', {
      parent: 'main',
      url: '/profile',
      views: {
        'content': {
          templateUrl: 'views/profile.html',
          controller: 'ProfileController'
        }
      }
    })
    
    // Setting state config
    .state('settings', {
      parent: 'main',
      url: '/settings',
      views: {
        'content': {
          templateUrl: 'views/settings.html',
          controller: 'ProfileController'
        }
      }
    });
    
}])

.run(['$rootScope', '$state', '$stateParams',
  function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    
    // Listens and invokes anonymous function each for any state change
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      var aac;
      if(aac = toState && toState.params && toState.params.autoActivateChild) {
        $state.go(aac);
      }
    });
    
}]);

