var keystone = require('keystone'),
	async = require('async');
	
var Skill = keystone.list('Skill');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;	
	
	// Init locals
	locals.section = 'skills';
	locals.current = {
		sort: (req.query.sort == 'name') ? 'name' : 'updated'
	};
	locals.filters = {
		tag: req.params.tag
	};
	locals.data = {
		skills: [],
		tags: []
	};	
	// Load all categories
	view.on('init', function(next) {
		
		keystone.list('SkillTag').model.find().sort('tag').exec(function(err, results) {
			
			if (err || !results.length) {
				return next(err);
			}			
			locals.data.tags = results;
			
			// Load the counts for each category
			async.each(locals.data.tags, function(tag, next) {
				
				keystone.list('Skill').model.count().where('tag').in([tag.id]).exec(function(err, count) {
					tag.skillCount = count;
					next(err);
				});
				
			}, function(err) {
				next(err);
			});
			
		});
		
	});	
	// Load the current category filter
	view.on('init', function(next) {
		
		if (req.params.tag) {
			keystone.list('SkillSet').model.findOne({ key: locals.filters.tag }).exec(function(err, result) {
				locals.data.tag = result;
				next(err);
			});
		} else {
			next();
		}		
	});	
	view.on('render', function(next) {
		
		var q = keystone.list('Skill').model.find().sort('-publishedDate').populate('skillset');
		
		//if (locals.data.tag) {
		//	q.where('tags').in([locals.data.tag]);
		//}
		
		q.sort(locals.current.sort == 'name' ? 'name.last' : '-changedOn');
		
		q.exec(function(err, results) {
			if (err) return res.err(err);
			locals.data.skills = results;
			next();
		});
		
	});
	
	// Render the view
	view.render('site/skills');
	
}
