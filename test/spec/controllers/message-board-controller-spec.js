'use strict';

describe('Controller: MessageBoardCtrl', function () {

  // load the controller's module
  beforeEach(module('messageBoardApp'));

   var scope, httpBackend, http, controller;

   var message1 = {text: "hello!", userId: 1};
   var response1 = {id: 1, text: "hello!", createDate: 1505786631000, userId: 1};
   var message2 = {text: "hello back!", userId: 1, originalMessageId: 1};
   var response2 = {id: 2, text: "hello back!", createDate: 1505786931000, userId: 1, originalMessageId: 1};

 // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $http) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    http = $http;
    controller = $controller;

    scope.messages = [];

    httpBackend.whenGET("http://localhost:8080/messages").respond([response1]);

    controller('MessageBoardCtrl', {
      $scope: scope,
      $http: http
    });
  }));

  it('should add a new message', function() {
      httpBackend.whenPOST("http://localhost:8080/messages", message1).respond(200, response1);

      scope.text = response1.text;

      scope.addMessage();

      httpBackend.flush();

      expect(scope.messages.length).toBe(1);
      expect(scope.messages[0].text).toBe('hello!');
  });

  it('should respond to a message', function() {
        httpBackend.whenPOST("http://localhost:8080/messages", message2).respond(200, response2);

        scope.text = response2.text;

        scope.respondMessage();

        httpBackend.flush();

        expect(scope.messages.length).toBe(1);
    });


  it('should filter messages by user id', function() {
        httpBackend.whenGET("http://localhost:8080/messages", { params: { userId: 1 }}).respond(200, message1);

        scope.text = message1.text;

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
