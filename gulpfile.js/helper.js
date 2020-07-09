const pump = require('pump');
const { src, dest} = require('gulp');
const notifier = require("node-notifier");


const task = function(taskName,job){
	const paths =  require('./plugins/' + taskName + '.js').paths;
	const error =  require('./plugins/' + taskName + '.js').error;
	
	if(job != undefined){
		if(Array.isArray(job)){
			return pump( 
				job,
				function(err){
					if(err) {
						notifier.notify(error(err));
					};
				}
			);
		}else{
			return pump( 
				src(paths.src),
				job,
				dest(paths.target),
				function(err){
					if(err) {
						notifier.notify(error(err));
					};
				}
			);
		}
	}else{
		return pump( 
			src(paths.src),
			dest(paths.target),
			function(err){
				if(err) {
					notifier.notify(error(err));
				};
			}
		);
	}
}


module.exports = {
	"task": task
}