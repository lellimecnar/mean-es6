var Mongoose = require('mongoose');

module.exports = {
	title: String,
	album: {
		type: Mongoose.Schema.ObjectId,
		ref: 'album',
		default: null
	},
	created: {
		type: Date,
		default: Date.now
	},
	file: {
		size: Number,
		extension: String,
		path: String,
		mimetype: String,
		name: String,
		originalname: String
	}
};