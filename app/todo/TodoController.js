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
		self.currentProjectId = '';
		self.currentProject = '';
		self.currentTask = '';
		$scope.addProjectForm.title.$pristine = true;
	};
	this.refreshProjects();

	$scope.addProject = function(data) {
		console.log(data);
		var projectTitle = data.title.$viewValue;
		TodoService.CreateProject(projectTitle, function(res) {
			self.refreshProjects();
		});
	};

	$scope.editProject = function(data) {
		var projectId = self.currentProject._id;
		var newProject = {
			title: data.title.$viewValue
		}
		TodoService.EditProject(projectId, newProject, function(res) {
			self.refreshProjects();
		});
	};

	$scope.removeProject = function(id) {
		TodoService.RemoveProject(id, function(res) {
			self.refreshProjects();
		});	
	};

	$scope.addTask = function(data, projectId) {
		var taskTitle = data.title.$viewValue;
		TodoService.CreateTask(taskTitle, projectId, function(res) {
			self.refreshProjects();
		});
	};

	$scope.editTask = function(data) {
		console.log(self.currentTask);
		var taskId = self.currentTask._id;
		var newTask = {
			title: data.title.$viewValue,
			priority: self.currentTask.priority,
			deadline: self.currentTask.deadline
		}
		TodoService.EditTask(taskId, newTask, function(res) {
			self.refreshProjects();
		});
	};

	$scope.changeTaskStatus = function(taskId, currentStatus) {
		var newTask = {
			status: !currentStatus
		}
		TodoService.EditTask(taskId, newTask, function(res) {
			self.refreshProjects();
		});
	};

	$scope.removeTask = function(id) {
		TodoService.RemoveTask(id, function(res) {
			self.refreshProjects();
		});	
	};
});