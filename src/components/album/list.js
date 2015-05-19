export class AlbumListController {
	title: String = 'Albums';

	tiles: Array = [];

	static $inject = ['Api'];
	constructor(Api) {
		Api.Albums.query((result) => {
			angular.forEach(result, (album) => {
				this.tiles.push(album);
			});
		});
	}
}