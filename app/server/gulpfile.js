const {series, parallel, src, dest} = require('gulp');
const ts = require('gulp-typescript');
const rimraf = require('rimraf');

// Load our TypeScript options from the tsconfig
const project = ts.createProject('tsconfig.json');

// Cleaning the distribution files
function clean(cb) {
	rimraf('dist', cb);
}

// Typescript source files
function typescript() {
	const tsr = project.src().pipe(project());

	return tsr.js.pipe(dest('dist'));
}

// Required staticly served web resources
function webroot() {
	return src("src/http/public/**/*").pipe(dest('dist/http/public'));
}

exports.clean = clean;
exports.default = series(clean, parallel(typescript, webroot));