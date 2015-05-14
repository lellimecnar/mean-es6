import { HomeCtrl } from 'app/home/home';

export class AppCtrl {

	static $inject = ['$router'];
	constructor($router) {
		$router.config([
			{
				path: '/',
				component: 'home'
			}
		]);
	}
}

angular.module('app', [
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
			return name.charAt(0).toUpperCase() + name.slice(1) + 'Ctrl';
		})
		.setTemplateMapping(function(name) {
			name = ['app', name, name.split('/').pop()].join('/');
			return name + '.html';
		});
}])

.controller('AppCtrl', AppCtrl)
.controller('HomeCtrl', HomeCtrl);
