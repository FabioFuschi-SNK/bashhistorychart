const helper = require('../helper.js');
const packageJSON = require("../../package.json");
const sourceDir = packageJSON.pathconfig.sourcedir;
const targetDir = packageJSON.pathconfig.targetdir;


const { src, dest } = require('gulp');

const args = require('yargs').argv;
const isDev = (args.build==true);

const gif = require('gulp-if');
const gless = require('gulp-less');
const gpostcss = require('gulp-postcss');
const gsourcemaps = require('gulp-sourcemaps');

const LessPluginGlob = require('less-plugin-glob');

const autoprefixer = require('autoprefixer');
const PostCssPlugins = [
	autoprefixer(packageJSON.autoprefixerconfig)
];


const paths = {
	watch:[sourceDir+"/less/**/*"],
	src:[sourceDir+"/less/style.less"],
	target:targetDir+"/css/",
	sourcemaps:"../maps",
};


const task = function less() {
	return helper.task(arguments.callee.name, [
	    src(paths.src),
		gif(isDev, gsourcemaps.init()),
		gless({plugins: [LessPluginGlob]}),
		gpostcss(PostCssPlugins),
		gif(isDev, gsourcemaps.write(paths.sourcemaps, {includeContent: true})),
		dest(paths.target)
	]);
}

const watch = {
	"path": paths.watch, 
	"option": { ignoreInitial: false }
};

const error = function(error){
	return {
		title: 'Less ' + error.name + ' on Line ' + error.lineNumber + '',
		message: error.fileName
	}
}

module.exports = {
	"paths": paths,
	"task" : task,
	"watch": watch,
	"error": error
}