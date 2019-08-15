'use strict';
const config = require('../../../config');
const param = require('../../../param');

import gulp from 'gulp';
import pump from 'pump';

gulp.task('copy:html:dist', callback => {
	pump([
		gulp.src(`${config.temp}*.html`, { base: `./${config.temp}` }),
		gulp.dest(config.html.dist)
	], callback);
});
