export class AlbumCreateController {
	title = 'New Album';

	nav = {
		label: 'Cancel',
		icon: 'close',
		click: this.cancel
	};

	actions = [
		{
			label: 'Save',
			click: this.save
		}
	];

	formData = {
		title: ''
	};

	static $inject = ['Api'];
	constructor(Api) {
		this.Api = Api;
	}

	save() {
		this.submit();
	}

	submit() {
		if (this.$scope.album_create_form.$valid) {
			this.Api.Albums.save(this.formData, (result) => {
				this.close();
			});
		} else {

		}
	}

	cancel() {
		console.log('Cancelled');
		this.close();
	}

	close() {
		window.history.back();
	}
}