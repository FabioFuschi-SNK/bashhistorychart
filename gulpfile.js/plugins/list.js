const helper = require('../helper.js');
const packageJSON = require("../../package.json");
const sourceDir = packageJSON.pathconfig.sourcedir;
const targetDir = packageJSON.pathconfig.targetdir;

const { src } = require('gulp');

const injects = require('gulp-inject');

const paths = {
	watch: [sourceDir+"/sites/**/*"],
	src: [sourceDir+"/index.html"],
	target: targetDir+"/"
};

const task = function list() {
	return helper.task(arguments.callee.name,
	    injects(src(paths.watch, {read: false }),	{
				transform: function(filepath){
					return '<li><a href="' + filepath.substr(sourceDir.length) + '">'+filepath.substr((sourceDir+"/sites").length)+'</a></li>';
				}
			}
		)

	);
}

const watch = {
	"path": paths.watch, 
	"option": { ignoreInitial: false }
};

module.exports = {
	"paths": paths,
	"task" : task,
	"watch": watch,
	"error": null
}