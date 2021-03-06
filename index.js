var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	mongoose = require('mongoose'),
	db = mongoose.connect('mongodb://localhost:27017/mean-es6'),
	lazyRest = require('lazy-rest')(app, db)

	$path = require('path'),
	$mkdir = require('mkdirp').sync;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(multer({
	dest:'./uploads',
	changeDest: function(dest, req, res) {
		var path = $path.join(dest, req.url);
		$mkdir(path);
		return path;
	}
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(lazyRest());
app.use(express.static('./public'));
app.use('/files', express.static('./uploads/api'));

var server = app.listen(8080, function () {
  console.log('Listening at http://localhost:8080');
});