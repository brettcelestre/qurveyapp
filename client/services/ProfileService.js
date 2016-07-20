
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

  return {
    getAnswersQuestions: getAnswersQuestions
  };
  
}]);