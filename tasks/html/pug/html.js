'use strict';
const config = require('../../../config');
const param = require('../../../param');

import gulp from 'gulp';
import pump from 'pump';
import htmlpug from 'gulp-html2pug';
import rename from 'gulp-rename';

gulp.task('pug:html:convert', callback => {
	pump([
		gulp.src(`${config.pug.html}`),
		htmlpug({ tabs: true, fragment: false }),
		gulp.dest(config.pug.dist)
	], callback);
});
