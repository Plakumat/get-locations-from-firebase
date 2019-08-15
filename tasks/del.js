'use strict';
const config = require('../config');
const param = require('../param');

import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';

gulp.task('del', callback => {
	runSequence(
		'del:assets',
		'del:html',
		callback);
});

// Delete all assets outputs
gulp.task('del:assets', callback => {
	return del([
		`${config.temp}assets/**/*.*`, // Temporary folder for output
		`${config.dist}assets/**/*.*`, // Static file output
		`${config.build}assets/**/*.*`, // Compressed output
	], { force: true }, callback);
});

// Delete all html outputs
gulp.task('del:html', callback => {
	return del([
		`${config.temp}**/*.html`, // Temporary folder for output
		`${config.dist}**/*.html`, // Static file output
	], { force: true }, callback);
});
