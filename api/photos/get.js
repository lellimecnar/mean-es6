module.exports = function(req, res, next) {
	req.app.db.model('Photo').find({}, function(err, photos) {
		if (!err) {
			res.json(photos);
		}
	});
};