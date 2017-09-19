'use strict';

describe('Controller: MessageBoardCtrl', function () {

  // load the controller's module
  beforeEach(module('messageBoardApp'));

   var scope, httpBackend, http, controller;

   var message = {id: 1, text: "hello!", createDate: 1505786731000, userId: 1};

 // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $http) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    http = $http;
    controller = $controller;

    scope.messages = [];

    httpBackend.whenGET("http://localhost:8080/messages").respond([message]);

    controller('MessageBoardCtrl', {
      $scope: scope,
      $http: http
    });
  }));

  it('should add a new message', function() {
      httpBackend.whenPOST("http://localhost:8080/messages", message).respond(200, message);

      scope.text = message.text;

      scope.addMessage();

      httpBackend.flush();

      expect(scope.messages.length).toBe(1);
      expect(scope.messages[0].text).toBe('hello!');
  });

  it('should filter messages by user id', function() {
        httpBackend.whenGET("http://localhost:8080/messages", { params: { userId: 1 }}).respond(200, message);

        scope.text = message.text;

        scope.filterMessagesByUser();

        httpBackend.flush();

        expect(scope.messages.length).toBe(1);
        expect(scope.messages[0].text).toBe('hello!');
   });


  it('should load a list of messages', function () {

      httpBackend.expectGET("http://localhost:8080/messages");

      httpBackend.flush();

      expect(scope.messages.length).toBe(1);
   });

});
