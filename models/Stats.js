var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Stats = new keystone.List('Stats', {
	label: 'Stats',
	singular: 'Stat',
	plural: 'Stats',
	path: 'stats',
	track: true,
	sortable: true, 
	//sortContext: ':'
	searchFields: 'name'
});
Stats.add(
	'Some Stats', {	
	name: { type: String, index: true, initial: true },
	description: { type: Types.Text },
	skill: { type: Types.Relationship, ref: 'Skill', index: true },
	who: { type: Types.Relationship, ref: 'User' },
	years: { label: 'Years of Experience', type: Number, initial: true, index: true }, 
	selfStat: {label: 'How would you rate yourself ?', type: Types.Select, numeric: true, options: [
		{ value: 1, label: 'Young Padawan' }, 
		{ value: 1, label: 'Entry Level' }, 
		{ value: 2, label: 'Still Learning' }, 
		{ value: 2, label: 'Heard Something' },
		{ value: 3, label: 'Intermediate' },
		{ value: 3, label: 'Average' },
		{ value: 4, label: 'Advanced' },
		{ value: 4, label: 'Certified Master'},
		{ value: 5, label: 'Guru/Kernel Hacker' },
		{ value: 5, label: 'Godlike' }
	]},  
});
Stats.schema.virtual('url').get(function() {
	return '/stats/' + this.key; });
Stats.defaultColumns = 'name, category|20%, skills, updatedAt|20%';


/**
 * Relationships
 */

//Stats.relationship({ path: 'skills', ref: 'Stats', refPath: 'Stats' })
//Stats.relationship({ path: 'profiles', ref: 'Profile', refPath: 'skills' });
//Stats.relationship({ path: 'employers', ref: 'Employer', refPath: 'technologies' });


Stats.register();