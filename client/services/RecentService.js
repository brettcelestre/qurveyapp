
angular.module('qurvey.services')

.service('Recent', ['$http', function($http) {
  
  // Sends GET req to /api/questions
  var recent = function() {
    return $http({
      method: 'GET',
      url: '/api/questions',
      // data: data
    }).then(function(data) {
      return data;
    }, function(error) {
      return error;
    });
  };

  return {
    recent: recent,
  };
  
}]);