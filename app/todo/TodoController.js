angular.module('app').controller('TodoController', function($scope, TodoService) {
	var self = this;
	this.refreshProjects = function() {
		angular.element('.modal').modal('hide');
		TodoService.GetProjects(function(res) {
			$scope.projects = res;
			self.clearFields();
		});
	};
	this.clearFields = function() {
		$scope.title = '';
		$scope.addTaskForm.title.$pristine = true;
		$scope.addProjectForm.title.$pristine = true;
	};
	this.refreshProjects();

	$scope.addProject = function(data) {
		var projectTitle = data.title.$viewValue;
		TodoService.CreateProject(projectTitle, function(res) {
			self.refreshProjects();
		});
	};

	$scope.editProject = function(data) {
		var projectTitle = data.title.$viewValue;
		TodoService.CreateProject(projectTitle, function(res) {
			self.refreshProjects();
		});
	};

	$scope.removeProject = function(id) {
		TodoService.RemoveProject(id, function(res) {
			self.refreshProjects();
		});	
	};

	$scope.addTask = function(data) {
		var TaskTitle = data.title.$viewValue;
		TodoService.CreateTask(TaskTitle, self.currentProjectId, function(res) {
			self.refreshProjects();
		});
	};

	$scope.removeTask = function(id) {
		TodoService.RemoveTask(id, function(res) {
			self.refreshProjects();
		});	
	};
});