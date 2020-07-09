const helper = require('../helper.js');
const packageJSON = require("../../package.json");
const sourceDir = packageJSON.pathconfig.sourcedir;
const targetDir = packageJSON.pathconfig.targetdir;

const paths = {
	watch: [sourceDir+"/img/**/*"],
	src: [sourceDir+"/img/**/*"],
	target: targetDir+"/img/"
};

const task = function img() {
	return helper.task(arguments.callee.name);
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