module.exports = function (app) {
	return function(req, res, next) {
		var routes = app._router.stack
				.filter(function(item) {
					return item.route;
				})
				.map(function(item) {
					if (item.route) {
						delete item.route.stack;
						item.route.methods = Object.keys(item.route.methods);
						return item.route;
					}
				});

		res.json({msg: 'Here are some options...', data: routes});
	};
};