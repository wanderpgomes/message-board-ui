'use strict';

/**
 * @ngdoc overview
 * @name messageBoardApp
 * @description
 * # messageBoardApp
 *
 * Main module of the application.
 */
angular
  .module('messageBoardApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/message-board.html',
        controller: 'MessageBoardCtrl',
        controllerAs: 'messageBoardCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
