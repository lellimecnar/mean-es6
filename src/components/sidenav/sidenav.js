export class SidenavController {
	menuItems: Array = [
	{
		route: '/',
		icon: 'photo_library',
		name: 'Photos'
	},
	{
		route: '/albums',
		icon: 'photo_album',
		name: 'Albums'
	}
	];

	static $inject = ['$router'];
	constructor($router) {
		this.$router = $router;
	}

	navigateTo(route, e) {
		console.log(route);
	}
}