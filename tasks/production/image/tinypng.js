'use strict';
const config = require('../../../config');
const param = require('../../../param');

import gulp from 'gulp';
import pump from 'pump';
import tinypng from 'gulp-tinypng';

gulp.task('image:tinypng', callback => {
	pump([
		gulp.src(`${config.image.src}`, { base: './' }),
		tinypng(config.image.tinypng),
		gulp.dest('./')
	], callback);
});
