export class PhotoListController {
	title:String = 'Photos';
	tiles: Array = [];

	static $inject = ['$rootScope', 'Api'];
	constructor($rootScope, Api) {
		this.tiles.push(Api.Photos.get({
			id: '555974691a069d6628600f08'
		}));
	}
}