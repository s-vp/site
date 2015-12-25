var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(done) {
	keystone.list('Skill').model.find().exec(function(err, skills) {	
		async.each(skills, function(skill, nextSave) {
			var back = skill.skillset
			skill.set({	skillset: null}).save();
			skill.set({				
				skillset : back
			}).save(function(err) {
				return nextSave();
			});
		}, function(err) {
			return done();
		});
	});
};

//exports.__defer__ = true;

