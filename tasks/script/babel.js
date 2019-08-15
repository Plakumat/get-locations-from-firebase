'use strict';
const config = require('../../config');
const param = require('../../param');

import gulp from 'gulp';
import pump from 'pump';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import gulpif from 'gulp-if';

gulp.task('script:babel', callback => {
	//let polyfill = 'node_modules/babel-polyfill/dist/polyfill.js';
	pump([
		// gulp.src([polyfill, config.script.src]),
		gulp.src(config.script.src),
		babel(),
		gulpif(param.production, sourcemaps.init()),
		gulpif(param.production, uglify()),
		concat('main.js'),
		gulpif(param.production, sourcemaps.write('.', { sourceRoot: '/src' })),
		gulpif(param.production,
			gulp.dest(config.script.temp),
			gulp.dest(config.script.dist)
		)
	], callback);
});
