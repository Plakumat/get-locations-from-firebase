'use strict';
const config = require('../../config');
const param = require('../../param');

import gulp from 'gulp';
import pump from 'pump';
import cached from 'gulp-cached';
import gulpif from 'gulp-if';

gulp.task('copy:html', callback => {
	pump([
		gulp.src(`${config.copy.html}`, { base: `${config.html.base}` }),
		cached('html'),
		gulpif(param.production,
			gulp.dest(config.html.temp),
			gulp.dest(config.html.dist)
		)
	], callback);
});
