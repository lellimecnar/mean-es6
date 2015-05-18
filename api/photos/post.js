module.exports = function(req, res, next) {

	if (req.files && req.files.photo) {
		var Photo = req.app.db.model('Photo'),
			photo = req.body;

		req.files.photo.path = req.files.photo.path.replace(/^uploads\/api\//, '');
		photo.file = req.files.photo;

		Photo.create(photo, function(err, data) {
			if (!err) {
				res.json({msg: 'Successfully created!', data: data});
			} else {
				res.json({msg: 'Error!', data: err});
			}
		});
	}

};