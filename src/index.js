import * as Services from 'util/services/services';
import * as App from 'components/app/app';
import * as Components from 'components/components';
import * as Directives from 'util/directives';

var app = angular.module('app', App.AppDependencies)
			.config(App.AppConfig);

angular.forEach(Services, function(service, name) {
	app.service(name, service);
});

angular.forEach(Components, function(controller, name) {
	activate.$inject = ['$rootScope', '$scope', '$router', '$routeParams', '$location'];
	function activate($rootScope, $scope, $router, $routeParams, $location) {
		var $this = this;

		this.$rootScope = $rootScope;
		this.$scope = $scope;
		this.$router = $router;
		this.$routeParams = $routeParams;

		$rootScope.$route = {
			path: $location.path(),
			name: $router.name,
			controller: $this
		};

		$rootScope.$broadcast('$routeActivated', $router, $routeParams, this);
	};

	controller.prototype.activate = activate;

	app.controller(name, controller);
});

angular.forEach(Directives, function(directive, name) {
	app.directive(directive.$selector, directive);
});

app.controller('AppController', App.AppController);