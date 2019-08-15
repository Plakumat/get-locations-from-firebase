'use strict';
const config = require('../../config');
const param = require('../../param');

import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('css', callback => {
	runSequence(
		'scss',
		'scss:pages',
		callback);
});
