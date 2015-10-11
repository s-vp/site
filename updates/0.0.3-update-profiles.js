var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(done) {
	keystone.list('Profile').model.find().exec(
		function(err, profiles) {	
		async.each(profiles, function(profile, nextSave) {
			var back = profile.who
			profile.set({ who: null }).save();
			profile.set({				
				who : back
			}).save(function(err) {
				return nextSave();
			});
		}, function(err) {
			return done();
		});
	});
};

//exports.__defer__ = true;

