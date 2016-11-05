angular.module('app').service('TodoService', function($http, $localStorage, CONFIG, $q, $state) {
	this.GetProjects = function(callback) {
		$http.get(CONFIG.apiUrl + '/projects')
			.success(function (response) {
				callback(response.data);
			})
			.error(function(response) {
				console.log(response);
			});
	};

	this.CreateProject = function(projectTitle, callback) {
		$http.post(CONFIG.apiUrl + '/projects', {title: projectTitle})
			.success(function (response) {
				console.log(response.data);
				callback(response.data);
			})
			.error(function(response) {
				console.log(response);
			});
		
	};

	this.RemoveProject = function(projectId, callback) {
		$http.delete(CONFIG.apiUrl + '/projects/' + projectId)
			.success(function (response) {
				callback(response);
			})
			.error(function(response) {
				console.log(response);
			});
	};

	this.CreateTask = function(taskTitle, projectId, callback) {
		$http.post(CONFIG.apiUrl + '/tasks', {
			title: taskTitle,
			projectId: projectId
		})
		.success(function (response) {
			console.log(response.data);
			callback(response.data);
		})
		.error(function(response) {
			console.log(response);
		});
		
	};

	this.RemoveTask = function(taskId, callback) {
		$http.delete(CONFIG.apiUrl + '/tasks/' + taskId)
			.success(function (response) {
				callback(response);
			})
			.error(function(response) {
				console.log(response);
			});
	};
});