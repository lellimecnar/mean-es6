module.exports = function(req, res, next) {
	var Photo = req.app.db.model('Photo');
	Photo.create(req.body, function(err, data) {
		if (!err) {
			res.json({msg: 'Successfully created!', data: data});
		} else {
			res.json({msg: 'Error!', data: err});
		}
	});
};