module.exports = {
	testId: function(req, res, next, val, model, db) {
		model.findById(val, function(err, item) {
			if (!err) {
				req.test = item;
			}
			next();
		});
	}
};