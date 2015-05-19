var $diff = require('object-diff');

module.exports = function(req, res, next) {
	req.app.db.model('Album')
		.findByIdAndUpdate(req.album._id, {
			$set: $diff(req.album, req.body)
		}, function(err, result) {
			if (!err) {
				res.json(result);
			}
		});
};