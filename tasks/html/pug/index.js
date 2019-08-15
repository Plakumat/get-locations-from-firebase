'use strict';
const config = require('../../../config');
const param = require('../../../param');

import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('pug', callback => {
	runSequence(
		'pug:convert',
		callback);
});
