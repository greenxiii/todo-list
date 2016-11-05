angular.module('app').controller('AuthController', 
	function($scope, $location, AuthService,  $q, $http, CONFIG, $localStorage, $state) {
	$scope.loading = false;
	var self = this;
    $scope.login = function() {
        $scope.loading = true;
        AuthService.Login($scope.email, $scope.password, function (result) {
            if (result === true) {
                self.successHandler(result);
            } else {
                $scope.error = 'Email or password is incorrect';
                $scope.loading = false;
            }
        });
    };
    $scope.fbLogin = function() {
        AuthService.FacebookLogin()
        .then(function(res) {
        	$http.post(CONFIG.apiUrl + '/auth/login/facebook', { userID: res.userID, accessToken: res.accessToken })
        		.success(function (response) {
        			console.log(response);
        			if (response.token) {
                        $localStorage.currentUser = { 
                            firstName: response.user.firstName,
                            lastName: response.user.lastName,
                            token: response.token,
                            facebookId: response.user.facebookId
                        };
        				$http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
        				self.successHandler(response);
        			} else {
        				console.log(response);
        				$scope.error = response.message;
        			}
        		})
        		.error(function(response) {
        			console.log(response);
        			$scope.error = response.message.message;
        		});
        });
    };

    $scope.signUp = function() {
        var user = {
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            email: $scope.email,
            password: $scope.password
        }
        AuthService.SignUp(user, function(result) {
            if (result === true) {
                self.successHandler(result);
            } else {
                $scope.error = result.message;
                $scope.loading = false;
            }
        });
    };

    this.successHandler = function(data) {
        $state.go('main.todo');
    };
});