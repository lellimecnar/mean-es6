export class Photos {

	constructor($resource, URL_PREFIX) {
		return new $resource(URL_PREFIX + 'photos/', null, {
			get: {
				method: 'GET',
				url: URL_PREFIX + 'photos/:id'
			}
		});
	}
}