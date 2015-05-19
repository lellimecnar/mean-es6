module.exports = function(req, res, next) {
	req.app.db.model('Album').find({}, function(err, albums) {
		if (!err) {
			res.json(albums);
		}
	});
};