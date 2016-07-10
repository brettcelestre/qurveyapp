
angular.module('qurvey.controllers')

.controller('AskController', function($scope, $state, Ask) {
  
  $scope.question = '';
  $scope.option1 = '';
  $scope.option2 = '';
  $scope.option3 = '';
  $scope.option4 = '';
  $scope.option5 = '';
  
  $scope.addOptionButtonThree = false;
  $scope.hideThree = true;
  $scope.addOptionButtonFour = false;
  $scope.hideFour = true;
  $scope.addOptionButtonFive = false;
  $scope.hideFive = true;
  
  $scope.searchFormValidation = function(){
    // Turn this back to false by default
    var question = false, option1 = false, option2 = false;
    // Check question length > 10
    if( $scope.question.replace(/\s+/g, '').length >= 10 ) {
      question = true;
    }
    // Checks option1 length >= 1
    if ( $scope.option1.length >= 1 ) {
      option1 = true;
    }
    // Checks option2 length >= 1
    if ( $scope.option2.length >= 1 ) {
      option2 = true;
    }
    
    // Check if more options were entered, add those validations to our return
    
    console.log('Form val: ', [ question, option1, option2 ]);
    // Returns array with boolean for all three inputs
    return [ question, option1, option2 ];
  };
  
  $scope.askQuestion = function(){
    var formValidation = $scope.searchFormValidation();
    console.log('formValidation: ', formValidation);
    // Check to make sure everything is valid
    if ( formValidation[0] && formValidation[1] && formValidation[2] ) {
      console.log('valid form');
      // Construct data object to send through ask
      var data = {
        question: $scope.question,
        answers: {
          a: $scope.option1,
          b: $scope.option2,
          c: $scope.option3,
          d: $scope.option4,
          e: $scope.option5
        },
      }
      console.log('data: ', data);
      
      // Invoke Search service
      Ask.ask(data)
        .then(function(){
          // Change state to main/question/recent - showing the recently created question
          $state.go('main.questions.recent');
        })
        .catch(function(data){
          console.error('Error with login: ', data)
        });
    // Form is not valid
    } else  {
      console.log('form is not valid');
      if ( !formValidation[0] ){
        // your question is not long enough
        console.log('need longer question: ');
      }
      if ( !formValidation[1] || !formValidation[2] ) {
        // You must add more options
        console.log('you need more options: ');
      }
    }
  };

});