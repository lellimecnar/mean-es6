var Mongoose = require('mongoose');

module.exports = {
	title: String,
	description: {
		type: String,
		default: ''
	},
	cover: {
		type: Mongoose.Schema.ObjectId,
		ref: 'photo',
		default: null
	},
	created: {
		type: Date,
		default: Date.now
	}
};