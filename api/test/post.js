module.exports = function (app) {
	return function(req, res, next) {
		var Test = app.db.model('Test');
		Test.create(req.body, function(err, data) {
			if (!err) {
				res.json({msg: 'Successfully created!', data: data});
			} else {
				res.json({msg: 'Error!', data: err});
			}
		});
	};
};