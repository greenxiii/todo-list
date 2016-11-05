angular.module('app').service('AuthService', function($http, $localStorage, CONFIG, $q, $state) {
	this.Login = function(email, password, callback) {
		$http.post(CONFIG.apiUrl + '/auth/login', { email: email, password: password })
			.success(function (response) {
				if (response.token) {
					$localStorage.currentUser = { 
						email: email, 
						firstName: response.user.firstName,
						lastName: response.user.lastName,
						token: response.token 
					};
					$http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
					callback(true);
				} else {
					console.log(response);
					callback(response);
				}
			})
			.error(function(response) {
				console.log(response);
				callback(response);
			});
	}

	this.FacebookLogin = function(email, password, callback) {
		var deferred = $q.defer();
	    FB.init({ 
	      appId: CONFIG.fbAppId,
	      status: true, 
	      cookie: true, 
	      xfbml: true,
	      version: 'v2.4'
	    });

	    FB.getLoginStatus(function(response) {
		    if (response.status === 'connected') {
		    	console.log('Logged in.');
	        	deferred.resolve(response.authResponse);
		    } else {
		    	console.log('initiate FB login...');
		    	FB.login(function(res) {
		      		if(res.status === "connected" ) {
			        	deferred.reject('Error occured');
		        	} else {
	  		      		console.log('Logged in.');
	            	deferred.resolve(response.authResponse);
		        	}
		      	});
		    }
		  });

    	return deferred.promise;
	}

	this.Logout = function() {
		$state.go('login');
		delete $localStorage.currentUser;
		$http.defaults.headers.common.Authorization = '';
	}

	this.SignUp = function(user, callback) {
		callback(user);
		$http.post(CONFIG.apiUrl + '/users', user)
		.success (function(response) {
			if (response.token) {
				$localStorage.currentUser = { 
					email: email, 
					firstName: response.user.firstName,
					lastName: response.user.lastName,
					token: response.token 
				};
				$http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
				callback(true);
			} else {
				console.log(response);
				callback(response);
			}
		})
		.error(function(response) {
			console.log(response);
			callback(response);
		});
	}
});