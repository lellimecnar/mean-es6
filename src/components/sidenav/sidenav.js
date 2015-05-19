export class SidenavController {
	menuItems: Array = [
		{
			route: '/albums',
			icon: 'photo_album',
			name: 'Albums'
		},
		{
			route: '/photos',
			icon: 'photo_library',
			name: 'Photos'
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