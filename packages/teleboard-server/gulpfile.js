const {series, parallel, src, dest} = require('gulp');
const ts = require('gulp-typescript');
const sm = require('gulp-sourcemaps');
const rimraf = require('rimraf');
const path = require('path');

// Declare constants
const tsProject = ts.createProject('tsconfig.json');
const distDir = path.join(__dirname, '../../dist/server');

// Cleaning the distribution files
function clean(cb) {
	rimraf(distDir, cb);
}

// Typescript source files
function typescript() {
	return tsProject.src()
		.pipe(sm.init())
		.pipe(tsProject())
		.pipe(sm.write())
		.pipe(dest(distDir))

	// const tsr = tsProject.src().pipe(tsProject());

	// return tsr.js.pipe(dest(distDir));
}

// Required staticly served web resources
function webroot() {
	return src("src/http/public/**/*")
		.pipe(dest(path.join(distDir, '/http/public')));
}

exports.clean = clean;
exports.default = series(clean, parallel(typescript, webroot));