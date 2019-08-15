'use strict';
const config = require('../../config');
const param = require('../../param');

import gulp from 'gulp';
import pump from 'pump';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import gulpif from 'gulp-if';

gulp.task('script:vendor', callback => {
	pump([
		gulp.src(config.script.vendor.src),
		gulpif(param.production, uglify()),
		concat('vendor.js'),
		gulpif(param.production,
			gulp.dest(config.script.temp),
			gulp.dest(config.script.dist)
		)
	], callback);
});
