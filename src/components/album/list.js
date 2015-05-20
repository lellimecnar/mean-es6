export class AlbumListController {
	title = 'Albums';

	tiles = [];

	fab = {
		label: 'New Album',
		icon: 'add',
		click: this.showCreateDialog
	};

	static $inject = ['Api', '$mdDialog'];
	constructor(Api, $mdDialog) {
		this.$mdDialog = $mdDialog;

		Api.Albums.query((result) => {
			angular.forEach(result, (album) => {
				this.tiles.push(album);
			});
		});
	}

	showCreateDialog(e) {
		this.$mdDialog.show({
			controller: 'AlbumFormController',
			controllerAs: 'album_form',
			templateUrl: 'components/album/form.html',
			targetEvent: e,
			clickOutsideToClose: true
		}).then((result) => {
			if (result) {
				this.tiles.push(result);
			}
		});
	}
}