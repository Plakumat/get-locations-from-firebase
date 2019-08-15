'use strict';
const config = require('../../config');
const param = require('../../param');

import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('html', callback => {
	runSequence(
		'html:beautify',
		callback);
});
