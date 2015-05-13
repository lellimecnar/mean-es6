var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	db = mongoose.connect('mongodb://localhost:27017/mean-es6'),
	path = require('path'),
	fs = require('fs'),
	glob = require('glob'),
	changeCase = require('change-case'),

	apiPath = './api',
	httpMethods = [
		'get',
		'head',
		'post',
		'put',
		'delete',
		'trace',
		'options',
		'connect',
		'patch'
	],
	apiGlobPath = '**/@('+httpMethods.join('|')+').js',

	dbPath = './db';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.db = db;

glob(apiGlobPath, {
		nocase: true,
		cwd: apiPath
	},
	function(err, filePaths) {
		if(!err) {
			filePaths.forEach(function(filePath) {
				var fullPath = path.join(apiPath, filePath);
				m = ('/' + filePath).match(/^(.*\/)(.+)\.js$/);

				if (m) {
					if (m[1] !== '/') {
						m[1] = m[1].replace(/\/$/, '');
					}
					app[m[2].toLowerCase()](m[1], require('./' + fullPath)(app));
				} else {

				}
			});
		}
	});


glob('**/*.js', {
		nocase: true,
		cwd: dbPath
	},
	function(err, filePaths) {
		if (!err) {
			filePaths.forEach(function(filePath) {
				var name = changeCase.pascal(filePath.replace(/\.[^\.]+$/, '')),
					fullPath = path.join(dbPath, filePath);
				console.log(fullPath, name);
				config = require('./' + fullPath);

				if (config.schema) {
					var schema = new mongoose.Schema(config.schema);
					db.model(name, schema);
				}

				if (config.params) {
					Object.keys(config.params).forEach(function(key) {
						app.param(key, function(req, res, next, val) {
							var model = db.model(name);
							config.params[key](req, res, next, val, model, db);
						});
					});
				}
			});
		}
	});


var server = app.listen(8080, function () {
  console.log('Example app listening at http://localhost:8080')
});