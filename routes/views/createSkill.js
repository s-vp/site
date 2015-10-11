var keystone = require('keystone'),
	Skill = keystone.list('Skill');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.section = 'me';
	locals.page.title = 'Add a new Skill';
	
	view.on('post', { action: 'add-link' }, function(next) {

		// handle form
		var newSkill = new Skill.model({
				author: locals.user.id,
				publishedDate: new Date()
			}),

			updater = newSkill.getUpdateHandler(req, res, {
				errorMessage: 'There was an error adding your Skill:'
			});
		
		// automatically pubish posts by admin users
		if (locals.user.isAdmin) {
			newSkill.state = 'published';
		}
		
		updater.process(req.body, {
			flashErrors: true,
			logErrors: true,
			fields: 'skillurl,name,brief,extended'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				req.flash('success', 'Your Skill has been added' + ((newSkill.state == 'draft') ? ' and will appear on the site once it\'s been approved' : '') + '.');
				return res.redirect('/links');
			}
			next();
		});

	});
	
	view.render('site/createSkill');
	
}
