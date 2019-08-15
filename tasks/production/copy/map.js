'use strict';
const config = require('../../../config');
const param = require('../../../param');

import gulp from 'gulp';
import pump from 'pump';

gulp.task('copy:map', callback => {
	pump([
		gulp.src(`${config.copy.map}`, { base: `./${config.temp}` }),
		gulp.dest(`${config.dist}`),
	], callback);
});
