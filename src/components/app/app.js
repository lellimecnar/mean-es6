import { $routeConfig } from './routes';

export class AppController {

	static $inject = ['$rootScope','$router', '$location', '$mdUtil', '$mdSidenav', '$controller'];
	constructor($rootScope, $router, $location, $mdUtil, $mdSidenav, $controller) {
		$router.config($routeConfig);

		this.$mdSidenav = $mdSidenav;
		this.$mdUtil = $mdUtil;
		this.$router = $router;

		$rootScope.$on('$routeActivated', (e, router, params, controller) => {
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