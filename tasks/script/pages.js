'use strict';
const config = require('../../config');
const param = require('../../param');

var fs = require('fs');
var path = require('path');

import gulp from 'gulp';
import pump from 'pump';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import gulpif from 'gulp-if';

// Find folder(s) under the pages folder
function getFolders(dir) {
	return fs.readdirSync(dir)
		.filter(file => fs.statSync(path.join(dir, file)).isDirectory());
}

gulp.task('script:babel:pages', done => {
	// List of folders
	let folders = [];
	if (fs.existsSync(`${config.css.pages.base}`)) folders = getFolders(`${config.css.pages.base}`);
	// If folders are not empty
	if (folders.length > 0) {
		let tasks = folders.map(folder => {
			// pump([
			gulp.src(`${config.css.pages.base}/${folder}/**/*.js`)
				.pipe(babel())
				// Sourcemap init n here if it's not a production build
				.pipe(gulpif(param.production, sourcemaps.init()))
				.pipe(gulpif(param.production, uglify()))
				// Concat js files as folder name
				.pipe(concat(`${folder}.js`))
				.pipe(gulpif(param.production, sourcemaps.write('.', { sourceRoot: '/src' })))
				.pipe(gulp.dest(config.script.dist));
			// ]);
		});
	};

	done();
});
