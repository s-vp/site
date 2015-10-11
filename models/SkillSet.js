var keystone = require('keystone'),
	Types = keystone.Field.Types;

var SkillSet = new keystone.List('SkillSet', {
	label: 'SkillSet',
	singular: 'SkillSet',
	plural: 'SkillSets',
	path: 'skillset',
	track: true,
	sortable: true,
	defaultSort: 'name', 
	//sortContext: ':'
	autokey: { path: 'key', from: 'name', unique: true },
	searchFields: 'name'
});
SkillSet.add(
	'SkillSets', {	
	name: { type: String, required: true , index: true, initial: true  },
	tag: { type: Types.Relationship, ref: 'SkillTag',  index: true },	
	published: { type: Boolean, default: true, hidden: true },
	highlighted: { type: Boolean, default: true, hidden: true }
});
SkillSet.schema.virtual('url').get(function() {
	return '/SkillSet/' + this.key; });
SkillSet.defaultColumns = 'name, tag|20%, updatedAt|20%';

/**
 * Relationships
 */

SkillSet.relationship({ path: 'skills', ref: 'Skill', refPath: 'skillset' });
SkillSet.relationship({ path: 'profiles', ref: 'Profile', refPath: 'skillset' });

SkillSet.register();