var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	db = mongoose.connect('mongodb://localhost:27017/mean-es6'),
	lazyRest = require('lazy-rest')(app, db);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(lazyRest());
app.use(express.static('./public'));

var server = app.listen(8080, function () {
  console.log('Listening at http://localhost:8080');
});