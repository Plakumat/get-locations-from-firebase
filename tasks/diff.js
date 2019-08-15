'use strict';
const config = require('../config');
const param = require('../param');

var fs = require('fs');
var path = require('path');

import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';

// Find file(s) under the pages folder
function getFiles(dir, types) {
	return fs.readdirSync(dir)
		.filter(file => types.some(item => item.endsWith(item)));
}

gulp.task('diff', callback => {
	runSequence(
		'del:diff:image',
		'del:diff:html',
		callback);
});

gulp.task('del:diff:image', done => {
	// List of files
	let srcFiles = getFiles(`./${config.src}assets/image/`, ['gif', 'jpg', 'jpeg', 'png']);
	let distFiles = getFiles(`./${config.dist}assets/image/`, ['gif', 'jpg', 'jpeg', 'png']);
	let lists = distFiles.map(file => {
		if (!srcFiles.includes(file)) del(`./${config.dist}assets/image/${file}`, { force: true });
	});
	done();
});


gulp.task('del:diff:html', done => {
	// List of files
	let srcFiles = getFiles(`./${config.src}layouts`, ['html']);
	let distFiles = getFiles(`./${config.dist}`, ['html']);
	let lists = distFiles.map(file => {
		if (!srcFiles.includes(file)) del(`./${config.dist}${file}`, { force: true });
	});
	done();
});
