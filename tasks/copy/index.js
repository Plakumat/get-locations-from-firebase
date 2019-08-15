'use strict';
const config = require('../../config');
const param = require('../../param');

import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('copy', callback => {

	let injectTasks = ['copy:css', 'copy:image', 'copy:svg', 'copy:data', 'copy:font', 'copy:html', 'inject', callback];
	if (param.production) injectTasks.unshift('del:assets');

	runSequence.apply(null, injectTasks);

});
