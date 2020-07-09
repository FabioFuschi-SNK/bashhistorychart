const glob = require("glob");
const { watch, parallel } = require('gulp');
const packageJSON = require("../package.json");
const browserSync = require('browser-sync');

let tasks = {};
let build = [];

glob.sync("*", {cwd: "./gulpfile.js/plugins"}).forEach(function (file, index) {
	let taskName = file.split(".")[0];
    tasks[taskName] = require('./plugins/' + file);
	exports[taskName] =  tasks[taskName].task;
	build.push(exports[taskName]);
});

exports.default = function() {
	browserSync(packageJSON.browsersyncconfig);
	for (var task in tasks) {
	  	watch(tasks[task].watch.path, tasks[task].watch.option, exports[task] );
	}
};

exports.build = parallel(build);