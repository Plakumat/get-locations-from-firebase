'use strict';
const config = require('../../config');
const param = require('../../param');

import gulp from 'gulp';
import pump from 'pump';
import polyfit from 'gulp-polyfit';

gulp.task('script:polyfill', callback => {
	pump([
		gulp.src([config.script.src, config.script.pages.src]),
		polyfit({
			output: './polyfill', // output dir, default: './'
			minify: false,
			features: [], // extra polyfill features
			result: 'polyfill.json'
		}),
		gulp.dest(config.script.polyfill.dist)
	], callback);
});
