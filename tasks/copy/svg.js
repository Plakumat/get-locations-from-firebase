'use strict';
const config = require('../../config');
const param = require('../../param');

import gulp from 'gulp';
import pump from 'pump';
import svgmin from 'gulp-svgmin';
import cached from 'gulp-cached';

gulp.task('copy:svg', callback => {
	pump([
		gulp.src(`${config.copy.svg}`, { base: `./${config.src}` }),
		cached('svg'),
		svgmin({
			plugins: [{
				removeDoctype: true
			},
			{
				removeComments: true
			},
			{
				cleanupNumericValues: {
					floatPrecision: 2
				}
			},
			{
				convertColors: {
					names2hex: false,
					rgb2hex: false
				}
			}]
		}),
		gulp.dest(`${config.dist}`),
	], callback);
});
