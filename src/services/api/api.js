import { Photos } from './photos';

export class Api {

	URL_PREFIX = '/api/';

	static $inject = ['$resource'];
	constructor($resource) {
		this.Photos = new Photos($resource, this.URL_PREFIX);
	}
}