var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Education = new keystone.List('Education', {
	label: 'Education',
	path: 'education',
	track: true,
	sortable: true, 
	defaultSort:  '-graduated',
	defaultColumns: 'title|50%, institute|20%, createdBy|%15, graduated|15%',
	map: { name: 'title' },
	autokey: { path: 'key', from: 'institute title', unique: true },
	searchFields: 'title, institute'
});
Education.add({	
	institute: { label: 'Institute Name', type: String, required: true, initial: true },
	title: { label: 'Name of the Course', type: String, required: true, initial: true },
	degree: {type: String },
	graduated: { type: Types.Date, format: 'YYYY-MM' },  	
	years: {type: Types.Number, collapse: true },
	eduurl: { type: Types.Url },
	embed: { type: Types.Embedly, from: 'eduurl' },
	description: { type: Types.Textarea, collapse: true },
});
Education.schema.virtual('url').get(function() {
	return '/education/' + this.key; });
Education.register();