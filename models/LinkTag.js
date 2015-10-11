var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Link Tags Model
 * ===============
 */

var LinkTag = new keystone.List('LinkTag', {
	track: true, 
	autokey: { from: 'name', path: 'key', unique: true }
});

LinkTag.add({
	name: { type: String, required: true }
});


/**
 * Relationships
 * =============
 */

LinkTag.relationship({ ref: 'Link', refPath: 'tags', path: 'links' });


/**
 * Registration
 * ============
 */

LinkTag.register();
