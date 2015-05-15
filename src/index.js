import { HomeController } from 'components/home/home';

export class AppController {

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

.controller('AppController', AppController)
.controller('HomeController', HomeController);
