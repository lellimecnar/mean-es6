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

	static $inject = [];
	constructor() {
	}

	// activate = [function() {
	// }]

	save() {
		this.submit();
		// console.log(this.$scope.album_create_form);
		// console.log(this.formData);
		// this.$scope.album_create_form.$setSubmitted(true);
	}

	submit() {
		if (this.$scope.album_create_form.$valid) {
			console.log(this.formData);
			this.close();
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