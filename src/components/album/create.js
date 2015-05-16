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

	static $inject = ['$rootScope', '$router'];
	constructor($rootScope, $router) {
		this.$rootScope = $rootScope;
		this.$router = $router;
	}

	save() {
		console.log('Saved');
		this.close();
	}

	cancel() {
		console.log('Cancelled');
		this.close();
	}

	close() {
		window.history.back();
	}
}