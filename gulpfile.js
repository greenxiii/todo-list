var gulp = require('gulp'),
		autoprefixer = require('gulp-autoprefixer'),
		notify = require('gulp-notify'),
		less = require('gulp-less'),
		plumber = require('gulp-plumber'),
		path = require('path'),
		beep = require('beepbeep'),
		exec = require('child_process').exec,
		bs = require('browser-sync').create(),
		KarmaServer = require('karma').Server;


var onError = function (err) {
	beep();
	console.log(err);
};

gulp.task('browser-sync', ['styles-compile'], function() {
	bs.init({
		server: {
			baseDir: "./"
		},
		open: false
	});
});

gulp.task('tests', function(done){
	return new KarmaServer({
		configFile: __dirname + '/karma.local.conf.js',
		singleRun: true
	}, done).start();
});

gulp.task('styles-compile', function() {
	return gulp.src('app/styles/global.less')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(less({
			paths: [ path.join(__dirname, 'less', 'includes') ]
		}))
		.pipe(autoprefixer('last 2 version'))
		.pipe(gulp.dest('app'))
		.pipe(notify({ message: 'Styles-compile task complete' }));
});

gulp.task('serve', ['styles-compile', 'tests', 'watch']);

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('app/styles/*.less', ['styles-compile', bs.reload]);
	gulp.watch(['app/**/*.html', 'app/**/*.js'], ['tests', bs.reload]);
});