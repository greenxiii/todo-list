angular.module('app').controller('MainController', function($scope, AuthService, $localStorage) {
	$scope.user = {
		firstName: $localStorage.currentUser.firstName,
		lastName: $localStorage.currentUser.lastName
	}

	$scope.logout = AuthService.Logout;
});