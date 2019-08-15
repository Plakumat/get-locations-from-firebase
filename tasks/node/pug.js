'use strict';
const config = require('../../config');
const param = require('../../param');

import gulp from 'gulp';
import pump from 'pump';
import cached from 'gulp-cached';
import gulpif from 'gulp-if';

gulp.task('copy:pug', callback => {
	pump([
		gulp.src(`${config.copy.pug}`, { base: `${config.src}` }),
		gulpif(param.production,
			gulp.dest(config.html.temp),
			gulp.dest(config.html.dist)
		)
	], callback);
});
