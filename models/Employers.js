var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Employer = new keystone.List('Employer', {
	label: 'Employers',
	singular: 'Employer',
	plural: 'Employers',
	path: 'employers',
	track: true,
	sortable: true, 
	defaultSort:  '-joined',
	defaultColumns: 'company|20%, createdBy|%20, updatedBy|%20',
	map: { name: 'company' },
	autokey: { path: 'key', from: 'company', unique: true },
	searchFields: 'company'

});
Employer.add(	
	'Company Details',{
	company: { label: 'Company Name', type: String, required: true, initial: true },
	compurl: { type: Types.Url, initial: true },
	info: { type: Types.Embedly, from: 'compurl', collapse: true },
	address: { type: Types.Location, collapse: true },
});
Employer.schema.virtual('url').get(function() {
	return '/employers/' + this.key; });
Employer.register();