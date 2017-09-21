'use strict';

/**
 * @ngdoc function
 * @name messageBoardApp.controller:MessageBoardCtrl
 * @description
 * # MessageBoardCtrl
 * Controller of the messageBoardApp
 */
angular.module('messageBoardApp')
  .controller('MessageBoardCtrl', function ($scope, $http) {

      $scope.text = '';
      $scope.messages = [];
      $scope.messageResponses = [];
      $scope.users = [];
      $scope.selectedUser = '';
      $scope.selectedMessage = '';
      $scope.isCollapsed = true;

      $scope.addMessage = function(){
          if ($scope.text){
              $http.post('http://localhost:8080/messages', {text: $scope.text, userId: $scope.selectedUser })
              .then(function success(response) {

                  $scope.messages.push(response.data);
                  $scope.clearForm();
                  $scope.getMessages();

              }, function error(response) {
                  console.log('Error creating message: ', response);
              });
          }
      };

      $scope.respondMessage = function(){
          if ($scope.text){
              $http.post('http://localhost:8080/messages',
              { text: $scope.text, userId: $scope.selectedUser, originalMessageId: $scope.selectedMessage })
              .then(function success(response) {

                  console.log(response.data);
                  $scope.clearForm();

              }, function error(response) {
                  console.log('Error responding to message: ', response);
              });
          }
      };

      $scope.getResponses = function(){
            $http.get('http://localhost:8080/responses', { params: { originalMessageId: $scope.selectedMessage } })
            .then(function success(response) {
               $scope.messageResponses = response.data;

            }, function error(response) {
                console.log('Error retrieving responses to a message id: ' + $scope.selectedMessage, response);
            });
      };

      $scope.getMessages = function(){
            $http.get('http://localhost:8080/messages').then(function success(response) {
               $scope.messages = response.data;

            }, function error(response) {
                console.log('Error retrieving all messages.', response);
            });
      };

      $scope.filterMessagesByUser = function(){
            $http.get('http://localhost:8080/messages', { params: { userId: $scope.selectedUser } })
            .then(function success(response) {
               $scope.messages = response.data;

            }, function error(response) {
                console.log('Error retrieving messages by user id: ' + $scope.selectedUser, response);
            });
      };

      $scope.getUsers = function(){
            $http.get('http://localhost:8080/users').then(function success(response) {
               $scope.users = response.data;

            }, function error(response) {
                console.log('Error retrieving all users.', response);
            });
      };

      $scope.selectMessage = function(message){
           $scope.selectedMessage = message.id;
           $scope.isCollapsed = !$scope.isCollapsed;
           if (!$scope.isCollapsed){
              $scope.getResponses();
           }
      };

      $scope.clearForm = function() {
           $scope.text = '';
           $scope.selectedUser = '';
      };

      $scope.init = function() {
           $scope.getMessages();
           $scope.getUsers();
      };

      $scope.init();

  });
