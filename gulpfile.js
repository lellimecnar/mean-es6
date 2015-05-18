var gulp = require('gulp'),
	g = require('gulp-load-plugins')(),
	sync = g.sync(gulp).sync,
	del = require('del'),
	glob = require('glob'),
	fs = require('fs'),
	path = require('path'),
	replaceExt = require('replace-ext'),
	changeCase = require('change-case');

gulp.task('clean', function(done) {
	del('./public', done);
})

gulp.task('icons', function() {
	return gulp.src([
		'./node_modules/material-design-icons/*/svg/production/ic_*_48px.svg'
	])
		.pipe(g.flatten())
		.pipe(g.rename(function(path) {
			path.basename = path.basename.match(/^ic_(.+)_48px/)[1];
		}))
		.pipe(gulp.dest('public/ico'))
		.pipe(g.connect.reload());
});

gulp.task('libs', ['icons'], function() {
	return gulp.src([
		'angular*/*.min.js',
		'angular*/*.min.js.map',
		'angular*/dist/*.min.js',
		'angular*/dist/*.min.js.map',
		'systemjs/dist/system.js',
		'systemjs/dist/system.js.map',
		'systemjs/node_*/es6-*/dist/*-loader.js',
		'systemjs/node_*/es6-*/dist/*-loader.js.map'
	], {
		cwd: './node_modules'
	})
		.pipe(g.flatten())
		.pipe(gulp.dest('public/libs'))
		.pipe(g.connect.reload());
});

gulp.task('js', function() {
	return gulp.src('**/*.js', {
		cwd: './src',
		base: './src'
	})
		.pipe(g.babel({
			stage: 0,
			modules: 'system',
			moduleIds: true
		}))
		// .pipe(g.uglify())
		.pipe(gulp.dest('public'))
		.pipe(g.connect.reload());
});

gulp.task('html', function() {
	return gulp.src('**/*.html', {
		cwd: './src',
		base: './src'
	})
		.pipe(g.inject(gulp.src([
			'libs/angular.min.js',
			'libs/*.js'
		], {
			read: false,
			cwd: './public',
			base: './public'
		})))
		.pipe(gulp.dest('public'))
		.pipe(g.connect.reload());
});

gulp.task('css', function(done) {
	g.file('index.styl', '')
		.pipe(g.stylus({
			'include css': true,
			use: require('nib')(),
			include: [
				'./node_modules/angular-material'
			],
			import: [
				'nib',
				'angular-material.css',
				'./src/**/*.styl'
			]
		}))
		.pipe(gulp.dest('public'))
		.pipe(g.connect.reload());
	done();
});

gulp.task('serve', function(done) {
	g.express.run(['./index.js']);

	done();
});

gulp.task('watch', ['serve'], function(done) {
	gulp.watch('./src/**/*.js', ['js']);
	gulp.watch('./src/**/*.styl', ['css']);
	gulp.watch('./src/**/*.html', ['html']);

	gulp.watch('./public/**/*', g.express.notify);

	done();
});

gulp.task('build', sync(['clean', 'libs', 'js', 'css', 'html']));

gulp.task('default', sync(['build', 'serve']));