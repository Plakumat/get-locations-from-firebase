'use strict';
const config = require('../../config');
const param = require('../../param');

import gulp from 'gulp';
import pump from 'pump';
import inject from 'gulp-inject';
import strip from 'gulp-strip-comments';
import gulpif from 'gulp-if';

gulp.task('html:inject', callback => {
	let timehash = new Date().getTime();
	pump([
		gulp.src(`${config.html.dist}**/*.html`, { base: './' }),
		inject(
			gulp.src([`${config.dist}**/main*.css`], { read: false }), {
				relative: true,
				addRootSlash: true
			}
		),
		inject(
			gulp.src(`${config.dist}**/vendor*.js`, { read: false }), {
				relative: true,
				name: 'vendorjs',
				addRootSlash: true
			}
		),
		inject(
			gulp.src([`${config.dist}**/main*.js`], { read: false }), {
				relative: true,
				addRootSlash: true
			}
		),
		inject(gulp.src([`${config.dist}**/*.css`], { read: false }), {
			starttag: '<!-- page:{{path}} -->',
			relative: true,
			transform: function (path, file) {
				return `<link rel="stylesheet" href="/${path}?${timehash}">`;
			}
		}),
		inject(gulp.src([`${config.dist}**/*.js`], { read: false }), {
			starttag: '<!-- page:{{path}} -->',
			relative: true,
			transform: function (path) {
				return `<script src="/${path}?${timehash}"></script>`;
			}
		}),
		inject(gulp.src([config.html.pages.src, config.html.shared], { read: true }), {
			starttag: '<!-- inject:{{path}} -->',
			relative: true,
			addRootSlash: false,
			transform: function (path, file) {
				return file.contents.toString('utf8');
			}
		}),
		gulpif(param.production, strip()),
		gulp.dest('./'),
	], callback);
});
