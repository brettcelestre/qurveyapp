
angular.module('qurvey.services')

.service('Graph', ['$http', function($http) {
  
  // Sends POST req to /auth/login with username and password
  var getGraph = function(data) {
    return $http({
      method: 'POST',
      url: '/api/graph',
      data: JSON.stringify(data)
      // data: data
    }).then(function(data) {
      return data;
    }, function(error) {
      return error;
    });
  };

  return {
    getGraph: getGraph
  };
  
}]);