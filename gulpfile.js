const gulp = require('gulp');
const newer = require('gulp-newer');
const babel = require('gulp-babel');

const paths = {
	jsSrc: ["./public/src/js/**/*.js"],
	jsDest: "./public/dist/js"
};


gulp.task('js-combine', function() {

});

// uses Babel for transpiling ES6
gulp.task('transpile', function() {
	return gulp.src(paths.jsSrc)
			   .pipe(newer(paths.jsDest))
			   .pipe(babel({ modules: 'amd' }))
			   .pipe(gulp.dest(paths.jsDest));

});

// watching javascript folders
gulp.task('watch', function() {
	gulp.watch(paths.jsSrc, [ 'transpile' ]);
});

gulp.task('default', [ 'watch' ]);