angular.module('app', ['ui.router', 'ngStorage', 'ui.bootstrap.datetimepicker'])
	.config(config)
	.run(run);

function config($stateProvider, $urlRouterProvider, $httpProvider) {
	$urlRouterProvider.otherwise("/");
	$stateProvider
		.state('main', {
			templateUrl: 'app/main/index.html',
			controller: 'MainController',
			controllerAs: 'mainCtrl'
		})
		.state('main.todo', {
			url: '/',
			templateUrl: 'app/todo/index.html',
			controller: 'TodoController',
			controllerAs: 'todoCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'app/auth/index.html',
			controller: 'AuthController',
			controllerAs: 'authCtrl'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'app/auth/signup.html',
			controller: 'AuthController',
			controllerAs: 'authCtrl'
		});
	}

function run($rootScope, $http, $location, $localStorage) {

	if ($localStorage.currentUser) {
		$http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
	}

	$rootScope.$on('$locationChangeStart', function (event, next, current) {
		var publicPages = ['/login', '/signup'];
		var restrictedPage = publicPages.indexOf($location.path()) === -1;
		if (restrictedPage && !$localStorage.currentUser) {
			$location.path('/login');
		}
	});
}