'use strict';
const config = require('../../config');
const param = require('../../param');

import gulp from 'gulp';
import pump from 'pump';
import hash from 'gulp-hash';

gulp.task('hash', callback => {
	pump([
		gulp.src([
			`${config.temp}**/vendor*.+{js,css}`,
			`${config.temp}**/main*.+{js,css}`,
		]),
		hash(),
		gulp.dest(config.dist)
	], callback);
});
