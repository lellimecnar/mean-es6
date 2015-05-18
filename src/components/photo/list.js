export class PhotoListController {
	title:String = 'Photos';
	tiles: Array = [];

	static $inject = ['$rootScope', 'Api'];
	constructor($rootScope, Api) {
		Api.Photos.query((result) => {
			angular.forEach(result.data, (photo) => {
				photo.file.path = '/files/' + photo.file.path;
				this.tiles.push(photo);
			});
		});
	}
}