var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Softskill = new keystone.List('Softskill', {
	map: { name: 'category' },
	label: 'Softskills',
	singular: 'Softskill',
	plural: 'Softskills',
	path: 'softskills',
	track: true,
	sortable: true, 
	//sortContext: ':'
	autokey: { path: 'key', from: 'category skills', unique: true },
	searchFields: 'skills'
});
Softskill.add(
	'Soft Skills', {	
	category: { type: String, required: true , note: 'This field is required.' },
	skills: { type: Types.TextArray, index: true, initial: true },
	//years: { label: 'Years of Experience', type: Number, initial: true }, 
	/*selfrate: {label: 'Rate yourself', type: Types.Select, numeric: true, options: [
		{ value: 1, label: 'Entry Level' }, 
		{ value: 2, label: 'Still Learning' }, 
	//	{ value: 2, label: 'Heard Something' },
		{ value: 3, label: 'Intermediate' },
		{ value: 3, label: 'Average' },
		{ value: 4, label: 'Advanced' },
		{ value: 4, label: 'Certified'},
		{ value: 5, label: 'Master/Trainer/Mentor' }
	//	{ value: 5, label: 'Godlike' },
	]},  
	//people: { type: Types.Relationship, ref: 'User', many: true },
	//Softskill.relationship({ path: 'users', ref: 'User', refPath: 'skills' });
	//Skill.relationship({ path: 'employer', ref: 'Employer', refPath: 'employer' });
	*/
	who: { type: Types.Relationship, ref: 'User', initial: true, many: true },
	isgeneric: { type: Boolean, initial: true },
	highlighted:	{ type: Boolean, noedit: true, default: true, hidden: true }
});
Softskill.schema.virtual('url').get(function() {
	return '/skills/' + this.key; });
Softskill.defaultColumns = 'category|20%, skills, profile|20%, updatedAt|20%';

/**
 * Relationships
 */
Softskill.relationship({ path: 'profiles', ref: 'Profile', refPath: 'softskills' });
Softskill.relationship({ path: 'employers', ref: 'Employer', refPath: 'softskills' });


Softskill.register();