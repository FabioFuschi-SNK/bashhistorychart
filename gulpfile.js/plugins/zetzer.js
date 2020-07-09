const helper = require('../helper.js');
const packageJSON = require("../../package.json");
const sourceDir = packageJSON.pathconfig.sourcedir;
const targetDir = packageJSON.pathconfig.targetdir;

const zetzers = require('gulp-zetzer');

const paths = {
	watch: [sourceDir+"/sites/**/*",sourceDir+"/partials/**/*",sourceDir+"/templates/**/*"],
	src: [sourceDir+"/sites/**/*"],
	target: targetDir+"/sites/"
};

const task = function zetzer() {
	return helper.task("zetzer",
		zetzers({
			partials: sourceDir + "/partials",
			templates: sourceDir + "/templates/",
			dot_template_settings: {
				strip: false
			},
			env: packageJSON.frontendconfg
		})
	);
}

const watch = {
	"path": paths.watch, 
	"option": { ignoreInitial: false }
};

const error = function(error){
	return {
		title: error.plugin + ' ' + error.name,
		message: error.message
	}
}

module.exports = {
	"paths": paths,
	"task" : task,
	"watch": watch,
	"error": error
}