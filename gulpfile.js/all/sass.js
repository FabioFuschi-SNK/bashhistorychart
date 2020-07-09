const helper = require('../helper.js');
const packageJSON = require("../../package.json");
const sourceDir = packageJSON.pathconfig.sourcedir;
const targetDir = packageJSON.pathconfig.targetdir;


const { src, dest } = require('gulp');

const args = require('yargs').argv;
const isDev = (args.build==true);

const gif = require('gulp-if');
const gless = require('gulp-sass');
const gpostcss = require('gulp-postcss');
const gsourcemaps = require('gulp-sourcemaps');

const LessPluginGlob = require('less-plugin-glob');

const autoprefixer = require('autoprefixer');
const PostCssPlugins = [
	autoprefixer(packageJSON.autoprefixerconfig)
];


const paths = {
	watch:[sourceDir+"/sass/**/*"],
	src:[sourceDir+"/sass/style.less"],
	target:targetDir+"/css/",
	sourcemaps:"../maps",
};


const task = function sass() {
	return helper.task(arguments.callee.name, [
	    src(paths.src[taskName]),
		gif(isDev, gsourcemaps.init()),
		gsass().on('error',gsass.logError),
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
		title: 'Sass Error on Line ' + error.line + '',
		message: error.message
	}
}

module.exports = {
	"paths": paths,
	"task" : task,
	"watch": watch,
	"error": error
}