'use strict';
const config = require('../../../config');
const param = require('../../../param');

import gulp from 'gulp';
import pump from 'pump';
import pug from 'gulp-pug';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';

gulp.task('pug:convert', callback => {
	pump([
		gulp.src(`${config.pug.src}`),
		pug({
			filters: {
				'dotnet': (code) => `\n${code}\n`,
			},
			pretty: true,
		}),
		rename((path) => path.extname = `.html`),
		gulpif(param.production,
			gulp.dest(config.temp),
			gulp.dest(config.dist)
		)
	], callback);
});
