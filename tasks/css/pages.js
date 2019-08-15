'use strict';
const config = require('../../config');
const param = require('../../param');

var fs = require('fs');
var path = require('path');

import gulp from 'gulp';
import pump from 'pump';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import combinemq from 'gulp-combine-mq';
import concat from 'gulp-concat';
import gulpif from 'gulp-if';
import wait from 'gulp-wait';

// Find folder(s) under the pages folder
function getFolders(dir) {
	return fs.readdirSync(dir)
		.filter(file => fs.statSync(path.join(dir, file)).isDirectory());
}

gulp.task('scss:pages', done => {
	// List of folders
	let folders = [];
	if (fs.existsSync(`${config.css.pages.base}`)) folders = getFolders(`${config.css.pages.base}`);
	// If folders are not empty
	if (folders.length > 0) {
		let tasks = folders.map(folder => {
			// pump([
			gulp.src(`${config.css.pages.base}/${folder}/**/*.scss`)
				.pipe(wait(500))
				// Sourcemap init n here if it's not a production build
				.pipe(gulpif(!param.production, sourcemaps.init()))
				.pipe(sass(
					gulpif(param.production,
						config.css.scss.development.options,
						config.css.scss.production.options
					)
				))
				// Sourcemap init n here if it a production build cause of removing scss references
				.pipe(gulpif(param.production, sourcemaps.init()))
				// Autoprefix settings can be found at root folder as filename: .browserslistrc
				.pipe(autoprefixer())
				// Merge and group all Media Queries in same place
				.pipe(combinemq({ beautify: true, sort: true }))
				.pipe(gulpif(param.production, postcss()))
				// Concat scss files as folder name
				.pipe(concat(`${folder}.css`))
				.pipe(sourcemaps.write('.', { sourceRoot: '/src' }))
				.pipe(gulp.dest(config.css.dist));
			// ]);
		});
	};

	done();

});
