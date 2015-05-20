export class AlbumFormController {
	title = 'New Album';

	actions = [
		{
			label: 'Cancel',
			click: this.cancel.bind(this)
		},
		{
			label: 'Save',
			click: this.submit.bind(this),
			disabled: () => {
				return !this.$scope.albumForm.$valid;
			},
			class: {
				'md-primary': true
			}
		}
	];

	formData = {};

	static $inject = ['Api', '$mdDialog', '$scope'];
	constructor(Api, $mdDialog, $scope) {
		this.Api = Api;
		this.$mdDialog = $mdDialog;
		this.$scope = $scope;
	}

	submit() {
		if(this.$scope.albumForm.$valid) {
			this.Api.Albums.save(this.formData, (result) => {
				this.$mdDialog.hide(result);
			});
		}
	}

	cancel() {
		this.$mdDialog.cancel();
	}
}