var $diff = require('object-diff');

module.exports = function(req, res, next) {
	req.app.db.model('Photo')
		.findByIdAndUpdate(req.photo._id, {
			$set: $diff(req.photo, req.body)
		}, function(err, result) {
			if (!err) {
				res.json(result);
			}
		});
};