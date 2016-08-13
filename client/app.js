
var ctrl = require('./controllers/controller.js');
var askctrl = require('./controllers/AskCtrl.js');
var graphctrl = require('./controllers/GraphCtrl.js');
var loginctrl = require('./controllers/LoginCtrl.js');
var mainctrl = require('./controllers/MainCtrl.js');
var profilectrl = require('./controllers/ProfileCtrl.js');
var homectrl = require('./controllers/HomeCtrl.js');
var guestionctrl = require('./controllers/QuestionCtrl.js');
var recentctrl = require('./controllers/RecentCtrl.js');
var searchctrl = require('./controllers/SearchCtrl.js');
var signupctrl = require('./controllers/SignUpCtrl.js');
var statisticsctrl = require('./controllers/StatisticsCtrl.js');
var topctrl = require('./controllers/TopCtrl.js');
var service = require('./services/services.js');
var askservice = require('./services/AskService.js');
var graphservice = require('./services/GraphService.js');
var loginservice = require('./services/LoginService.js');
var mainservice = require('./services/MainService.js');
var profileservice = require('./services/ProfileService.js');
var questionservice = require('./services/QuestionService.js');
var recentservice = require('./services/RecentService.js');
var searchservice = require('./services/SearchService.js');
var signupservice = require('./services/SignUpService.js');
var statisticsservice = require('./services/StatisticsService.js');
var topservice = require('./services/TopService.js');

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
    .state('home', {
      url: '/',
      params: { 
        autoActivateChild: 'home.entry'
      },
      views: {
        'main': {
          templateUrl: 'views/home.html',
          controller: 'HomeController'   
        }
      }
    })
    
    // Entry Form state config
    .state('home.entry', {
      parent: 'home',
      url: '/entry',
      views: {
        'entry': {
          templateUrl: 'views/entry.html',
          controller: 'HomeController'   
        }
      }
    })
    
    // Login state config
    .state('login', {
      url: '/login',
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
    })

    // Search Results
    .state('search-results', {
      parent: 'main.questions',
      url: '/search',
      views: {
        'feed': {
          templateUrl: 'views/search.html',
          controller: 'MainController'
        }
      }
    })

    // Profile state config
    .state('profile', {
      parent: 'main',
      url: '/profile',
      params: { 
        autoActivateChild: 'profile-questions'
      },
      views: {
        'content': {
          templateUrl: 'views/profile.html',
          controller: 'ProfileController'
        }
      }
    })
    
    // Profile Questions Feed
    .state('profile-questions', {
      parent: 'profile',
      url: '/questions',
      views: {
        'profile-feed': {
          templateUrl: 'views/profile.questions.html',
          controller: 'ProfileController'
        }
      }
    })
    
    // Profile Answers Feed
    .state('profile-answers', {
      parent: 'profile',
      url: '/answers',
      views: {
        'profile-feed': {
          templateUrl: 'views/profile.answers.html',
          controller: 'ProfileController'
        }
      }
    });
    
}])

.run(['$rootScope', '$state', '$stateParams', 'Main',
  function ($rootScope, $state, $stateParams, Main) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    
    // Listens and invokes anonymous function each for any state change
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      var aac;
      if(aac = toState && toState.params && toState.params.autoActivateChild) {
        $state.go(aac);
      }

    });
    
    Main.currentUser().then(function(data) {
      if (data.data.username) {
        $state.go('main');
      }
    });
    
    // Search
    // console.log('RUN Search.searchTerm: ', Search.searchTerm);
    
}]);

