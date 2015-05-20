export class AlbumViewController {
	title = '';
	album = {};
	nav = 'back';

	actions = [
		{
			label: 'Upload Photos',
			icon: 'file_upload',
			click: this.uploadClick
		},
		{
			label: 'Edit Album',
			icon: 'edit',
			click: this.editClick
		}
	];

	static $inject = ['Api', '$routeParams'];
	constructor(Api, $routeParams) {
		if ($routeParams.albumId) {
			Api.Albums.get({
				id: $routeParams.albumId
			}, (result) => {
				this.album = result;
				this.title = result.title;
			});
		}
	}

	uploadClick() {
		console.log('Upload');
	}

	editClick() {
		console.log('Edit');
	}
}