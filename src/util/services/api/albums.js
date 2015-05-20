export class Albums {

	constructor($resource, URL_PREFIX) {
		return new $resource(URL_PREFIX + 'albums', null, {
			get: {
				method: 'GET',
				url: URL_PREFIX + 'albums/:id'
			},
			update: {
				method: 'PUT',
				url: URL_PREFIX + 'albums/:id'
			}
		});
	}
}