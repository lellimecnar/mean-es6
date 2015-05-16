export class PhotoListController {
	title:String = 'Photos';
	tiles: Array = [];

	static $inject = ['$rootScope'];
	constructor($rootScope) {
		for (var i = 0; i <= 50; i++) {
			this.tiles.push({
				icon: 'camera_roll.svg',
				title: 'Item',
				background: 'darkBlue'
			});
		}
	}
}