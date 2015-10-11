var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Skill Comments Model
 * ===================
 */

var SkillComment = new keystone.List('SkillComment', {
	nocreate: true
});

SkillComment.add({
	skill: { type: Types.Relationship, ref: 'Skill', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	date: { type: Types.Date, default: Date.now, index: true },
	content: { type: Types.Markdown }
});


/**
 * Registration
 * ============
 */

SkillComment.defaultColumns = 'author, date|20%';
SkillComment.register();
