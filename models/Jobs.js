var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Job = new keystone.List('Job', {
	label: 'Jobs',
	singular: 'Job',
	plural: 'Jobs',
	path: 'jobs',
	track: true,
	sortable: true, 
	defaultSort:  '-joined',
	defaultColumns: 'title, company|20%, createdBy|%20, joined|20%, left|20%',
	map: { name: 'title' },
	autokey: { path: 'key', from: 'title', unique: true },
	searchFields: 'responsibilities, title, company, description'

});
Job.add(	
'Job',{	
	title: { type: String, required: true, initial: true },
	description: { type: Types.Markdown, index: true },
	joined: { type: Types.Date, format: 'YYYY-MM' },
	left: { type: Types.Date, format: 'YYYY-MM' },  	
	company: { type: Types.Relationship, ref: 'Employer',  index: true },
	responsibilities: { type: Types.TextArray, index: true },
	who: { type: Types.Relationship, ref: 'User', index: true, hidden: true } 
});
Job.schema.virtual('url').get(function() {
	return '/jobs/' + this.key; });
Job.schema.virtual('years').get(function() {
	return this._.left.format('YYYY')-this._.joined.format('YYYY'); });

Job.register();