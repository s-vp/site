var keystone = require('keystone'),
	Types = keystone.Field.Types;

var SkillTag = new keystone.List('SkillTag', {
	map: { name: 'tag' },
	label: 'SkillTag',
	singular: 'SkillTag',
	plural: 'SkillTags',
	path: 'skilltag',
	track: true,
	sortable: true, 
	//sortContext: ':'
	autokey: { path: 'key', from: 'tag', unique: true },
	searchFields: 'tag'
});
SkillTag.add(
	'SkillTags', {	
	tag: { type: String, label: 'Skill Label', required: true , index: true, initial: true },
	published: { type: Boolean },
	highlighted:	{ type: Boolean, noedit: true, default: true, hidden: true }
});
SkillTag.schema.virtual('url').get(function() {
	return '/SkillTags/' + this.key; });
SkillTag.defaultColumns = 'tag|20%, updatedAt|20%';

/**
 * Relationships
 */

SkillTag.relationship({ path: 'skills', ref: 'Skill', refPath: 'tags' });
SkillTag.relationship({ path: 'skillset', ref: 'SkillSet', refPath: 'tag' });
SkillTag.relationship({ path: 'profiles', ref: 'Profile', refPath: 'tags' });


SkillTag.register();