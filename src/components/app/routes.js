export var $routeConfig = [
	{
		path: '/',
		redirectTo: '/albums'
	},
	{
		path: '/albums',
		components: {
			default: 'album_list',
			sidenav: 'sidenav'
		}
	},
	{
		path: '/album/create',
		components: {
			default: 'album_create',
			sidenav: 'sidenav'
		}
	},
	{
		path: '/photos',
		components: {
			default: 'photo_list',
			sidenav: 'sidenav'
		}
	}
];