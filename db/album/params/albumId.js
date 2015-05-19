module.exports = function(req, res, next, val, model) {
	model.findById(val, function(err, item) {
		if (!err) {
			req.album = item;
			next();
		}
	});
};