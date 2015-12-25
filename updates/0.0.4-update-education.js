var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(done) {
	keystone.list('Education').model.find().exec(function(err, edu) {	
		async.each(edu, function(edu, nextSave) {
			//var back = skill.skillset
			//edu.set({	institute: null}).save();
			edu.set({				
				institute : edu.name
			}).save(function(err) {
				return nextSave();
			});
		}, function(err) {
			return done();
		});
	});
};

//exports.__defer__ = true;
