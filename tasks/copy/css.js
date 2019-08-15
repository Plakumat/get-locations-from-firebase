'use strict';
const config = require('../../config');
const param = require('../../param');

import gulp from 'gulp';
import pump from 'pump';
import cached from 'gulp-cached';

gulp.task('copy:css', callback => {
	pump([
		gulp.src(`${config.copy.css}`, { base: `./${config.src}` }),
		cached('css'),
		gulp.dest(`${config.dist}`),
	], callback);
});
