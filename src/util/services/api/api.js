import { Albums } from './albums';
import { Photos } from './photos';


export class Api {

	URL_PREFIX = '/api/';

	static $inject = ['$resource'];
	constructor($resource) {
		this.Albums = new Albums($resource, this.URL_PREFIX);
		this.Photos = new Photos($resource, this.URL_PREFIX);
	}
}