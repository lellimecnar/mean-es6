import { AppController } from 'components/app/app';
import * as PhotoComponent from 'components/photo/photo';
import * as SidenavComponent from 'components/sidenav/sidenav';
import * as AlbumComponent from 'components/album/album';

var app = angular.module('app', [
	'ngNewRouter',
	'ngAnimate',
	'ngAria',
	'ngMaterial'
])

.config([
	'$componentLoaderProvider',
function($componentLoaderProvider) {
	$componentLoaderProvider
		.setCtrlNameMapping(function (name) {
			return name.split('_').map(function(segment) {
				return segment.charAt(0).toUpperCase() + segment.slice(1)
			}).join('') + 'Controller';
		})
		.setTemplateMapping(function (name) {
			name = name.replace('_', '/');
			if (name.indexOf('/') == -1) {
				name = [name, name.split('/').pop()].join('/');
			}

			return 'components/' + name + '.html';
		});
}])

.controller('AppController', AppController);

[
	PhotoComponent,
	SidenavComponent,
	AlbumComponent
].forEach(function(component) {
	Object.keys(component).forEach(function(controllerName) {
		var controller = component[controllerName];

		controller.prototype.activate = [
			'$rootScope',
			'$scope',
			'$router',
			'$routeParams',
			'$location',
		function($rootScope, $scope, $router, $routeParams, $location) {
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
		}];

		app.controller(controllerName, controller);
	});
});