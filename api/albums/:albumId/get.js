module.exports = function(req, res, next) {
	res.json(req.album);
	next();
};