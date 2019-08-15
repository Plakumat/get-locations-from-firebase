'use strict';
const config = require('../../config');
const param = require('../../param');

import gulp from 'gulp';
import pump from 'pump';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import combinemq from 'gulp-combine-mq';
import concat from 'gulp-concat';
import gulpif from 'gulp-if';

gulp.task('scss', callback => {
	pump([
		gulp.src(`${config.css.src}`),
		// Sourcemap init n here if it's not a production build
		gulpif(!param.production, sourcemaps.init()),
		sass(
			gulpif(param.production,
				config.css.scss.development.options,
				config.css.scss.production.options
			)
		),
		// Sourcemap init n here if it a production build cause of removing scss references
		gulpif(param.production, sourcemaps.init()),
		// Autoprefix settings can be found at root folder as filename: .browserslistrc
		autoprefixer(),
		// Merge and group all Media Queries in same place
		combinemq({ beautify: true, sort: true }),
		// Postcss setting can be found on root folder as filename: postcss.config.js
		gulpif(param.production, postcss()),
		concat('main.css'),
		sourcemaps.write('.', { sourceRoot: '/src' }),
		gulpif(param.production,
			gulp.dest(config.css.temp),
			gulp.dest(config.css.dist)
		),
	], callback);
});
