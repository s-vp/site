var keystone = require('keystone'),
	async = require('async'),
	_ = require('underscore'),
	User = keystone.list('User'),
	Skill = keystone.list('Skill'),
	SkillSet = keystone.list('SkillSet'),
	Profile = keystone.list('Profile');


exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;

	// Set locals
	locals.section = 'profiles';
	//locals.page.title = 'Profiles';

	locals.filters = {
		profile: req.params.profile
	};
	

	locals.data = {
		profiles: [], 
		skills: [],
		skillsets: []
	};

	// Load the galleries by sortOrder
	//view.query('galleries', keystone.list('Gallery').model.find().sort('sortOrder'));
	
	
	view.on('init', function(next) {
		SkillSet.model.find().sort('defaultSort')
			//.sort('category')
			.exec(function(err, skillsets) {			
				if (err || !skillsets.length) {
					return next(err);
				}
				locals.data.skillsets = skillsets;
				next();
				});				
	
	view.on('init', function(next) {
		Profile.model.findOne()
			.where('state', 'published')
			.where('key', locals.filters.profile)
			.populate('who skills skillset tags jobs references education').sort('defaultSort')
			.exec(function(err, profile) {
				if (err) return res.err(err);
				if (!profile) return res.notfound('Profiles not found');
				locals.profile = profile;
				next();
			});

	});
	


	});

	view.on('init', function(next) {
		Skill.model.find()
			.exec(function(err, skills) {			
				if (err || !skills.length) {
					return next(err);
				}
				locals.data.skills = skills;
				next();
				});   					

	});
	/*Softskill.model.find()
		//.sort('category')
		.exec(function(err, skills) {			
			if (err || !skills.length) {
				return next(err);
			}
			locals.data.skills = skills;
			});	
	*/
	//Profile.model.	

	//view.query('skills', Skill.model.find().sort('sortOrder').populate('skillset'));		
	//view.query('profiles', Profile.model.find().sort('sortOrder').where('state', 'published').populate('skillset'));	
	view.render('site/profile');
//	view.render('skills');

};
