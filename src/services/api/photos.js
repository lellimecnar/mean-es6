export class Photos {

	constructor($resource, URL_PREFIX) {
		return new $resource(URL_PREFIX + 'photos/', null, {
			get: {
				method: 'GET',
				url: URL_PREFIX + 'photos/:id'
			},
			query: {
				method: 'GET',
				url: URL_PREFIX + 'photos'
			},
			save: {
				method: 'POST',
				url: URL_PREFIX + 'photos',
				transformRequest: function(data) {
					var form = new FormData();
					angular.forEach(data, function(val, key) {
						if (val instanceof FileList) {
							angular.forEach(val, function(file, index) {
								form.append(key + '_' + index, file);
							});
						} else {
							form.append(key, val);
						}
					});

					return form;
				}
			}
		});
	}
}