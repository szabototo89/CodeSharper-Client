const gulp = require('gulp');
const newer = require('gulp-newer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const bower = require('gulp-bower');
const inject = require('gulp-inject');
const mainBowerFiles = require('main-bower-files');

const paths = {
	jsSource: ["./public/src/js/**/*.js"],
	jsDestination: "./public/dist/js",
	htmlSource: "./public/src/**/*.html",
	htmlDestination: "./public/dist",
	bowerLib: './public/lib'
};

gulp.task('bower', function() {
	return bower()
			.pipe(gulp.dest(paths.bowerLib));
});

gulp.task('inject-bower', [ 'bower' ], function() {
	return gulp.src(paths.htmlSource)
			   .pipe(inject(
			   			gulp.src(mainBowerFiles(), { read: false }), 
			   			{
			   				name: "bower"
			   			})
			   		)
			   .pipe(gulp.dest(paths.htmlDestination));
});

// uses Babel for transpiling ES6
gulp.task('transpile', ['bower'], function() {
	return gulp.src(paths.jsSource)
			   .pipe(newer(paths.jsDestination))
			   .pipe(babel({ modules: 'amd' }))		// transpiles ES6 files
			   .pipe(concat("app.js"))				// combines JS files
			   .pipe(gulp.dest(paths.jsDestination));
});

// watching javascript folders
gulp.task('watch', function() {
	gulp.watch(paths.jsSource, [ 'inject-bower', 'transpile' ]);
});

gulp.task('default', [ 'watch' ]);