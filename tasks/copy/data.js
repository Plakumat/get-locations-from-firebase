'use strict';
const config = require('../../config');
const param = require('../../param');

import gulp from 'gulp';
import pump from 'pump';
import cached from 'gulp-cached';

gulp.task('copy:data', callback => {
	pump([
		gulp.src(`${config.copy.data}`, { base: `./${config.src}` }),
		cached('data'),
		gulp.dest(`${config.dist}`),
	], callback);
});
