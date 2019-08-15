'use strict';
const config = require('../../config');
const param = require('../../param');

import gulp from 'gulp';
import pump from 'pump';
import cached from 'gulp-cached';

gulp.task('copy:image', callback => {
	pump([
		gulp.src(`${config.copy.image}`, { base: `./${config.src}` }),
		cached('image'),
		gulp.dest(`${config.dist}`),
	], callback);
});
