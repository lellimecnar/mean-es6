export class PhotoListController {
	title: String = 'Photos';

	tiles: Array = [];

	static $inject = ['Api'];
	constructor(Api) {
		Api.Photos.query((result) => {
			angular.forEach(result, (photo) => {
				photo.file.path = '/files/' + photo.file.path;
				this.tiles.push(photo);
			});
		});
	}
}