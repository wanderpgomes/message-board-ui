'use strict';

describe('Controller: MessageBoardCtrl', function () {

  // load the controller's module
  beforeEach(module('messageBoardApp'));

   var scope, httpBackend, http, controller;

   var message1 = {text: "hello!", userId: 1};
   var response1 = {id: 1, text: "hello!", createDate: 1505786631000, userId: 1};
   var message2 = {text: "hello back!", userId: 1, originalMessageId: 1};
   var response2 = {id: 2, text: "hello back!", createDate: 1505786931000, userId: 1, originalMessageId: 1};
   var users = {name:"user1"};

 // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $http) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    http = $http;
    controller = $controller;

    scope.messages = [];

    httpBackend.whenGET("http://localhost:8080/messages").respond([response1]);
    httpBackend.whenGET("http://localhost:8080/users").respond([users]);

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

   it('should get city temperature and location', function() {
       var cityInfo = { "coord": { "lon": -79.42, "lat": 43.7 },
                        "main": { "temp": 20.72 },
                        "name": "Toronto"};

       httpBackend.whenGET("http://api.openweathermap.org/data/2.5/weather",
         { params: { q: scope.city, units: 'metric', appid: '1268ca2589e6cf4656173d406c87a086' } }).respond(200, cityInfo);

       scope.cityInfo = cityInfo;

       scope.getCityInfo();

       httpBackend.flush();

       expect(scope.cityInfo).toBeTruthy();
  });


  it('should load a list of messages', function () {

      httpBackend.expectGET("http://localhost:8080/messages");

      httpBackend.flush();

      expect(scope.messages.length).toBe(1);
   });

   it('should load a list of all users', function () {

      httpBackend.expectGET("http://localhost:8080/users");

      httpBackend.flush();

      expect(scope.users.length).toBe(1);
   });

});
