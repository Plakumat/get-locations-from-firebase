'use strict';

const dirs = {
	src: 'development/', // Source Codes
	dist: './production/', // Static file output
	temp: '.temp/', // Temporary folder for output
	package: './package.json',
};

let config = {
	src: `${dirs.src}`,
	temp: `${dirs.temp}`,
	dist: `${dirs.dist}`,
	package: `${dirs.package}`,
	copy: {
		html: `./${dirs.src}layouts/**/*.html`,
		image: `./${dirs.src}assets/image/**/*`,
		css: `./${dirs.src}assets/css/**/*.css`,
		svg: `./${dirs.src}assets/svg/**/*`,
		data: `./${dirs.src}assets/data/**/*.json`,
		font: `./${dirs.src}assets/font/**/*.{woff,woff2}`,
		map: `./${dirs.temp}assets/**/*.map`,
	},
	html: {
		base: `./${dirs.src}layouts`,
		watch: `./${dirs.src}layouts/**/*.html`,
		temp: `./${dirs.temp}`,
		dist: `./${dirs.dist}`,
		pages: {
			base: `./${dirs.src}pages`,
			src: `./${dirs.src}pages/**/*.html`,
		},
		shared: `./${dirs.src}shared/**/*.html`,
	},
	pug: {
		src: `./${dirs.src}layouts/**/*.pug`,
		includes: [`./${dirs.src}shared/**/*.pug`, `./${dirs.src}pages/**/*.pug`],
		html: `./${dirs.src}layouts/**/*.html`,
		dist: `./${dirs.src}layouts/`,
	},
	css: {
		watch: `./${dirs.src}assets/**/*.scss`,
		src: `./${dirs.src}assets/**/*.scss`,
		pages: {
			base: `./${dirs.src}pages`,
			src: `./${dirs.src}pages/**/*.scss`,
		},
		temp: `./${dirs.temp}assets/css`,
		dist: `./${dirs.dist}assets/css`,
		scss: {
			development: {
				options: {
					outputStyle: 'nested',
				},
			},
			production: {
				options: {
					outputStyle: 'expanded',
				},
			},
		},
	},
	script: {
		watch: `./${dirs.src}assets/**/*.js`,
		src: `./${dirs.src}assets/script/*.js`,
		pages: {
			base: `./${dirs.src}pages`,
			src: `./${dirs.src}pages/**/*.js`,
		},
		temp: `./${dirs.temp}assets/script`,
		dist: `./${dirs.dist}assets/script`,
		vendor: {
			watch: `./${dirs.src}assets/script/vendor/**/*.js`,
			src: `./${dirs.src}assets/script/vendor/**/*.js`,
		},
		polyfill: {
			watch: `./${dirs.src}assets/script/polyfill/polyfill.min.js`,
			src: `./${dirs.src}assets/script/polyfill/polyfill.min.js`,
			dist: `./${dirs.src}assets/script`,
		},
	},
	image: {
		src: `./${dirs.dist}assets/image/**/*.{png,jpg,jpeg}`,
		tinypng: 'wrWzkIKBloKA7ceWzpVkqx9hItVMDdvm',
	},
};

let fs = require('fs');
if (fs.existsSync('../gulp.config.js')) config = require('../gulp.config');

module.exports = config;
