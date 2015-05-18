module.exports = function(req, res, next) {
	res.json({msg: 'It Worked!!!', data: req.photo});
	next();
};