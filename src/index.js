import * as PhotoComponent from 'components/photo/photo';
import * as SidenavComponent from 'components/sidenav/sidenav';
import * as AlbumComponent from 'components/album/album';

function ctrlNameMapping(name) {
	return name.split('/').map(function(segment) {
		return segment.charAt(0).toUpperCase() + segment.slice(1)
	}).join('') + 'Controller';
}

function templateMapping(name) {
	if (name.indexOf('/') == -1) {
		name = [name, name.split('/').pop()].join('/');
	}

	return 'components/' + name + '.html';
}

export class AppController {

	static $inject = ['$rootScope','$router', '$location', '$mdUtil', '$mdSidenav', '$controller'];
	constructor($rootScope, $router, $location, $mdUtil, $mdSidenav, $controller) {
		this.$mdSidenav = $mdSidenav;
		this.$mdUtil = $mdUtil;
		this.$router = $router;

		$rootScope.pageTitle = 'App Title';

		$rootScope.$on('$locationChangeSuccess', () => {
			var path = $location.path(),
				route = $router.recognize(path),
				name = route.viewports.default.component,
				controllerName = ctrlNameMapping(name),
				controller = $controller(controllerName);

			$rootScope.$route = {
				path: path,
				route: route,
				name: name,
				controller: controller
			};

			if (!controller.nav || controller.nav === 'sidenav') {
				controller.nav = {
					label: 'Menu',
					icon: 'menu',
					click: this.toggleNav.bind(this)
				};
			} else {
				switch (controller.nav) {
					case 'back':
						controller.nav = {
							label: 'Back',
							icon: 'arrow_back',
							click: this.back.bind(this)
						};
						break;
					default:
						controller.nav.click = controller.nav.click.bind(controller);
						break;
				}
			}

			if (controller.actions) {
				controller.actions.forEach((action) => {
					action.click = action.click.bind(controller);
				});
			}
		});

		$router.config([
			{
				path: '/',
				components: {
					default: 'photo/list',
					sidenav: 'sidenav'
				}
			},
			{
				path: '/albums',
				components: {
					default: 'album/list',
					sidenav: 'sidenav'
				}
			},
			{
				path: '/album/create',
				components: {
					default: 'album/create',
					sidenav: 'sidenav'
				}
			}
		]);
	}

	toggleNav(callback) {
		this.$mdSidenav('left')
			.toggle()
			.then(() => {
				(callback || angular.noop)();
			});
	}

	closeNav(callback) {
		this.$mdSidenav('left')
			.close()
			.then(() => {
				(callback || angular.noop)();
			});
	}

	nav(url, e) {
		if (this.$router.recognize(url)) {
			this.closeNav();
			this.$router.navigate(url);
			e.preventDefault();
		}
	}

	back() {
		window.history.back();
	}
}

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
		.setCtrlNameMapping(ctrlNameMapping)
		.setTemplateMapping(templateMapping);
}])

.controller('AppController', AppController);

[

	PhotoComponent,
	SidenavComponent,
	AlbumComponent

].forEach(function(component) {
	Object.keys(component).forEach(function(controllerName) {
		app.controller(controllerName, component[controllerName]);
	});
});

