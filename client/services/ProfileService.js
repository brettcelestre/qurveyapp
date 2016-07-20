
angular.module('qurvey.services')

.service('Profile', ['$http', function($http) {

  // Sends POST req to statistics/usersAnswersQuestions to retrieve current user answers questions data
  var getAnswersQuestions = function(data) {
    return $http({
      method: 'POST',
      url: '/api/statistics/usersAnswersQuestions',
      data: JSON.stringify(data)
    }).then(function(data) {
      return data;
    }, function(error) {
      return error;
    });
  };
  
  // Sends POST req to /api/answers
  var submitAnswer = function(data) {
    return $http({
      method: 'POST',
      url: '/api/answers',
      data: JSON.stringify(data)
    }).then(function(data) {
      return data;
    }, function(error) {
      return error;
    });
  };

  return {
    submitAnswer: submitAnswer,
    getAnswersQuestions: getAnswersQuestions
  };
  
}]);