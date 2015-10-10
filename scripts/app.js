var garageApp = angular.module('garageApp',['ngRoute','garageControllers']);

garageApp.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl:'views/list.html',
		controller: 'listController',
	})
	.otherwise({
		redirectTo:'/list'
	});
		
});
