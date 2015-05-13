module.exports = function (app) {
	return function(req, res, next) {
		res.json({msg: 'It Worked!!!', data: req.test});
	};
};