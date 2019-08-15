'use strict';
const config = require('../config');
const param = require('../param');

import gulp from 'gulp';
import pump from 'pump';
import bump from 'gulp-bump';

// Upgrade version at package.json
// Default value: minor
// Change value with param name --build=major or --b=major
// Available options: patch, minor, major
//
// "name": "Project Name",
// "version": "1.0.0", => "1.1.0",
//

gulp.task('version', function (callback) {
	pump([
		gulp.src(config.package),
		bump({
			type: `${param.build}`,
		}),
		gulp.dest('./')
	], callback);
});
