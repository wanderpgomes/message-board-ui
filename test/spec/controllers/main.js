'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('messageBoardApp'));

   var scope, httpBackend, http, controller;


 // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $http) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    http = $http;
    controller = $controller;

    controller('MainCtrl', {
      $scope: scope,
      $http: http
    });
  }));

  it('should add a new message', function() {
      var message = {text: 'message'};
      httpBackend.whenPOST("http://localhost:8080/messages", message).respond(200, message);

      scope.text = message.text;

      scope.send();

      httpBackend.flush();

      expect(scope.messages.length).toBe(1);
      expect(scope.messages[0]).toBe('message');
    });

});
