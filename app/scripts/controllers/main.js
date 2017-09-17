'use strict';

/**
 * @ngdoc function
 * @name messageBoardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the messageBoardApp
 */
angular.module('messageBoardApp')
  .controller('MainCtrl', function ($scope, $http) {

      $scope.text = '';
      $scope.messages = [];

      $scope.send = function(){
          if ($scope.text){
              $http.post('http://localhost:8080/messages', {text: $scope.text})
              .then(function success(response) {
                  var msg = response.data;
                  $scope.messages.push(msg);
              }, function error(response) {
                  console.log('Error creating message: ', $scope.text);
              });
          }
      };
  });
