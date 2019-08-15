import yargs from "yargs";

// Default params for gulp tasks
//
// Production: Compile files for prepare to production server
// Build: Upgrade project version with patch, minor, major options
// Extension: Export template engine files (like pug) to HTML
//

let param =
	// .option('extension', {
	// 	alias: 'ext',
	// 	default: 'html'
	// })
	yargs
		.option("production", {
			alias: "p",
			default: false
		})
		.option("build", {
			alias: "b",
			default: "minor"
		})
		.option("node", {
			alias: "n",
			default: false
		})
		.option("server", {
			alias: "s",
			default: false
		}).argv;

module.exports = param;
