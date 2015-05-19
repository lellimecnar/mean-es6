module.exports = function(req, res, next) {
	req.app.db.model('Album').create(req.body, function(err, data) {
		if (!err) {
			res.json(data);
		} else {
			res.json(err);
		}
	});
};