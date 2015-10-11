var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Skill = new keystone.List('Skill', {
	label: 'Skills',
	singular: 'Skill',
	plural: 'Skills',
	path: 'skills',
	track: true,
	sortable: true, 
	//sortContext: ':'
	defaultSort: 'skillset',
	autokey: { path: 'key', from: 'name', unique: true },
	drilldown: 'skillset',
	searchFields: 'name,embed'
});
Skill.add(
	'Skills', {	
	name: { type: String, required: true, initial: true, index: true },
	skillset: { label: 'Category', type: Types.Relationship, ref: 'SkillSet', initial: true, index: true },	
	skillurl: { label: 'Url', type: Types.Url, initial: true },
	embed: { type: Types.Embedly, from: 'skillurl' },
	brief: { type: Types.Html, wysiwyg: true, height: 150 },
	extended: { type: Types.Html, wysiwyg: true, height: 450 },
		//extended: { type: Types.Html, wysiwyg: true, height: 450 },	
	highlighted: { type: Boolean, noedit: true, default: true, hidden: true }
});
Skill.schema.virtual('url').get(function() {
	return '/skills/' + this.key; 
	});


//
// TODO: Autoupdate Description from EMbedly values  
//
//Skill.schema.set('extended', Skill.schema.path('embed.description'));

/*Skill.schema.pre('save', function(next) {	
	var skill = this;	//this.list.schema.path(this.path, [this.schema]);
	console.log(this.embed.description);	 
	next();
	});
*/

Skill.defaultColumns = 'name, skillset|40%, updatedAt|20%';
/**
 * Relationships
 */


Skill.relationship({ path: 'profiles', ref: 'Profile', refPath: 'skills' });


Skill.register();