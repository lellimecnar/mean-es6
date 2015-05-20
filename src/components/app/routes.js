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
		path: '/album/:albumId',
		components: {
			default: 'album_view',
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