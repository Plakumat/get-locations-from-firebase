'use strict';
const config = require('../../config');
const param = require('../../param');

import gulp from 'gulp';
import uglify from 'gulp-uglify';
import pump from 'pump';

gulp.task('script:uglify', callback => {
	pump([
		gulp.src(`${config.script.src}`),
		uglify(),
		gulp.dest(config.script.dist),
	], callback);
});
