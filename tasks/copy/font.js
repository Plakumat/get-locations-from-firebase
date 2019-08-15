'use strict';
const config = require('../../config');
const param = require('../../param');

import gulp from 'gulp';
import pump from 'pump';
import cached from 'gulp-cached';

gulp.task('copy:font', callback => {
	pump([
		gulp.src(`${config.copy.font}`, { base: `./${config.src}` }),
		cached('font'),
		gulp.dest(`${config.dist}`),
	], callback);
});
