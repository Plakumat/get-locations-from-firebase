'use strict';
let config = require('./config');
let param = require('./param');

import os from 'os';
let currentOS = os.EOL === '\r\n' ? 'chrome' : 'google chrome';

import gulp from 'gulp';
import watch from 'gulp-watch';
import runSequence from 'run-sequence';
import requireDir from 'require-dir';
requireDir('./tasks', { recurse: true });
import browserSync from 'browser-sync';
let bs = browserSync.create();
let reload = browserSync.reload;

var nodemon = require('gulp-nodemon');

// FIXME: Production tasks will be added to copy files from temp to dist
gulp.task('default', callback => {
	var injectTasks = [
		'del',
		'copy',
		['css', 'script'],
		'inject',
		'watch',
		callback,
	];
	if (param.server)
		injectTasks = [
			'del',
			'copy',
			['css', 'script'],
			'pug',
			'inject',
			'watch',
			'server',
			callback,
		];
	if (param.production)
		injectTasks = [
			'del',
			'copy',
			['css', 'script'],
			'hash',
			'pug',
			'copy:html:dist',
			'inject',
			'html',
			callback,
		];

	if (param.node)
		injectTasks = [
			"del",
			"copy",
			["css", "script"],
			'copy:pug',
			"watch",
			"browser-sync",
			callback
		];

	runSequence.apply(null, injectTasks);
});

gulp.task('server', callback => {
	bs.init({
		port: 4000,
		files: [`${config.dist}**/*.*`],
		server: {
			baseDir: ['./', config.dist],
		},
		browser: [currentOS],
		ui: false,
	});
	return callback;
});

gulp.task('browser-sync', ['nodemon'], function () {
	browserSync.init(null, {
		proxy: "http://localhost:5000",
		files: [`${config.dist}**/*.*`],
		browser: [currentOS],
		port: 7000,
		ui: false
	});
});

gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: '../node/index.js',
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task("watch", () => {
	function reportChanges(event) {
		console.log(`Type: ${event.event}`);
		console.log(`Path: ${event.path}`);
		reload({ stream: true });
	}

	watch(config.copy.image, { read: false }, e => {
		reportChanges(e);
		if (e.event === 'unlink') {
			gulp.start('del:diff:image');
		} else gulp.start('copy:image');
	});

	watch(config.copy.font, { read: false }, e => {
		reportChanges(e);
		gulp.start('copy:font');
	});

	watch(config.css.watch, { read: false }, e => {
		reportChanges(e);
		gulp.start('scss');
	});

	watch(config.css.pages.src, { read: false }, e => {
		reportChanges(e);
		gulp.start('scss:pages');
	});

	watch(config.script.vendor.watch, { read: false }, e => {
		reportChanges(e);
		gulp.start('script:vendor');
	});

	watch(config.script.watch, { read: false }, e => {
		reportChanges(e);
		gulp.start('script:babel');
	});

	watch(config.script.pages.src, { read: false }, e => {
		reportChanges(e);
		gulp.start('script:babel:pages');
	});

	watch(config.pug.src, { read: false }, e => {
		reportChanges(e);
		runSequence('pug', 'inject');
	});

	// watch(config.pug.includes, { read: false }, e => {
	// 	reportChanges(e);
	// 	runSequence("pug", "inject");
	// });

	// watch(config.html.watch, { read: false }, e => {
	// 	reportChanges(e);
	// 	runSequence("copy:html", "inject");
	// });

	// watch([config.html.pages.src, config.html.shared], { read: false }, e => {
	// 	reportChanges(e);
	// 	runSequence("inject");
	// });

	watch([`${config.dist}*.{css,js,html}`], { read: false }, e => {
		reportChanges(e);
		// if (e.event === "add") gulp.start("inject");
		// if (e.event === "unlink") runSequence(["diff"], "inject");
	});
});
