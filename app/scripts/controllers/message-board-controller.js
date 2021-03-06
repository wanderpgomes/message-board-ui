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

      var baseUrl = 'https://localhost:8443';

      $scope.text = '';
      $scope.responseText = '';
      $scope.messages = [];
      $scope.messageResponses = [];
      $scope.users = [];
      $scope.selectedUser = '';
      $scope.selectedMessage = '';
      $scope.isCollapsed = true;
      $scope.city = '';
      $scope.cityInfo = { name : '', coord : {}, main: {} };

      $scope.addMessage = function(){
          if ($scope.text){
              $http.post(baseUrl + '/messages',
              { text: $scope.text,
                userId: $scope.selectedUser,
                city: $scope.cityInfo.name,
                latitude: $scope.cityInfo.coord.lat,
                longitude: $scope.cityInfo.coord.lon,
                temperature: $scope.cityInfo.main.temp})
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
          if ($scope.responseText){
              $http.post(baseUrl + '/messages',
              { text: $scope.responseText, userId: $scope.selectedUser, originalMessageId: $scope.selectedMessage })
              .then(function success() {
                  $scope.getResponses();
                  $scope.isCollapsed = false;
                  $scope.clearForm();

              }, function error(response) {
                  console.log('Error responding to message: ', response);
              });
          }
      };

      $scope.getResponses = function(){
            $http.get(baseUrl + '/responses', { params: { originalMessageId: $scope.selectedMessage } })
            .then(function success(response) {
               $scope.messageResponses = response.data;

            }, function error(response) {
                console.log('Error retrieving responses to a message id: ' + $scope.selectedMessage, response);
            });
      };

      $scope.getMessages = function(){
            $http.get(baseUrl + '/messages').then(function success(response) {
               $scope.messages = response.data;

            }, function error(response) {
                console.log('Error retrieving all messages.', response);
            });
      };

      $scope.filterMessagesByUser = function(){
            $http.get(baseUrl + '/messages', { params: { userId: $scope.selectedUser } })
            .then(function success(response) {
               $scope.messages = response.data;

            }, function error(response) {
                console.log('Error retrieving messages by user id: ' + $scope.selectedUser, response);
            });
      };

      $scope.getUsers = function(){
            $http.get(baseUrl + '/users').then(function success(response) {
               $scope.users = response.data;

            }, function error(response) {
                console.log('Error retrieving all users.', response);
            });
      };

      $scope.getCityInfo = function() {
        if ($scope.city){
           $http.get('https://api.openweathermap.org/data/2.5/weather',
            { params: { q: $scope.city, units: 'metric', appid: '1268ca2589e6cf4656173d406c87a086' } })
           .then(function success(response) {
              $scope.cityInfo = response.data;

           }, function error(response) {
               console.log('Error retrieving city temperature and location: ' + $scope.city, response);
           });
         }
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
           $scope.responseText = '';
           $scope.selectedUser = '';
           $scope.city = '';
           $scope.cityInfo = {};
      };

      $scope.init = function() {
           $scope.getMessages();
           $scope.getUsers();
      };

      $scope.init();

  });
