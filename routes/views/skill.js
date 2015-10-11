var keystone = require('keystone');

var Skill = keystone.list('Skill'),
	SkillComment = keystone.list('SkillComment');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;	
	// Init locals
	locals.section = 'skills';
	locals.filters = {
		skill: req.params.skill
	};
	
	view.on('init', function(next) {

		Skill.model.findOne()
			//-.where('state', 'published')
			.where('key', locals.filters.skill)
			.sort('sortOrder')
			.populate('author skillset')
			.exec(function(err, skill) {
				if (err) return res.err(err);
				if (!skill) return res.notfound('Skill not found');
				locals.skill = skill;
				locals.skill.populateRelated('comments[author]', next);
			});

	});	
	view.on('post', { action: 'create-comment' }, function(next) {
		// handle form
		var newSkillComment = new SkillComment.model({
				skill: locals.skill.id,
				author: locals.user.id
			}),
			updater = newSkillComment.getUpdateHandler(req, res, {
				errorMessage: 'There was an error creating your comment:'
			});
			
		updater.process(req.body, {
			flashErrors: true,
			logErrors: true,
			fields: 'content'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				req.flash('success', 'Your comment has been added successfully.');
				return res.redirect('/skills/' + locals.skill.key);
			}
			next();
		});

	});
	
	// Render the view
	view.render('site/skill');
	
}
