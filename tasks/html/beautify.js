'use strict';
const config = require('../../config');
const param = require('../../param');

import gulp from 'gulp';
import pump from 'pump';
import beautify from 'gulp-html-beautify';

gulp.task('html:beautify', callback => {
	pump([
		gulp.src(`${config.html.dist}**/*.html`, { base: './' }),
		beautify({
			"indent_size": 2,
			"indent_with_tabs": true,
			"preserve_newlines": true,
			"end_with_newline": false,
			"preserve_newlines": false,
		}),
		gulp.dest('./')
	], callback);
});
