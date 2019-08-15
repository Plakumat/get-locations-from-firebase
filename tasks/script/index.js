'use strict';
const config = require('../../config');
const param = require('../../param');

import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('script', (callback) => {
	runSequence(
		'script:vendor',
		'script:babel',
		'script:babel:pages',
		callback
	);
});
