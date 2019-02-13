var keystone = require('keystone'),
	Types = keystone.Field.Types;

var myStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
  	path: keystone.expandPath('./uploads'),
  	publicPath: '/public/uploads',
  },
});
var Profile = new keystone.List('Profile', {
	map: { name: 'title' }, 
	label: 'Profiles',
	singular: 'Profile',
	plural: 'Profiles',
	path: 'profiles',
	track: true,
	searchFields: 'title, summary, objective',
	drilldown: 'who',
	autokey: { path: 'key', from: 'title', unique: true }

});
Profile.add(
   'Profile Summary', {
	title: { type: String, required: true, width: 'medium', default: 'Sr Consultant' , note: 'This field is required.' },
	objective: { type: Types.Markdown, index: true },
	summary: { type: Types.Markdown, index: true },
	logourl: { type: Types.Url, label: 'Image url to be used as a logo for your profile' },  
	image: { type: Types.CloudinaryImage },
	file: { type: Types.File, storage: myStorage, path: '/home/nodejs/node/s-vp/public/files', publicPath: '/files' }
},
	'Profile Attributes', {
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft' },
	publishedAt: { type: Types.Date, dependsOn: { state: 'published' } },
	template: { type: Types.Select, options: 'default, custom', default : 'default' },
	experience: { type: Boolean, initial: false },
	isAvailable: { label: 'Publish contact info', type: Boolean }
}, 'Relationships', {
	who: { type: Types.Relationship, ref: 'User', index: true },
	skillset: { type: Types.Relationship, ref: 'SkillSet', many: true, index: true },
	skills: { type: Types.Relationship, ref: 'Skill', many: true, index: true },
	tags: { type: Types.Relationship, ref: 'SkillTag', many: true, index: true },
	jobs: { type: Types.Relationship, ref: 'Job', many: true },
	references: { type: Types.Relationship, ref: 'Employer', many: true },
	education: { type: Types.Relationship, ref: 'Education', many: true }
}, 
	'Some Stats', {
	views: { type: Number, noedit: true, hidden: true }, 
	highlighted:	{ type: Boolean, noedit: true, default: true, hidden: true }
});

// Virtuals
// ------------------------------


Profile.schema.virtual('url').get(function() {
	return '/profiles/profile/' + this.key;
});


Profile.schema.virtual('summary.trim').get(function() {
	return this.summary.html.slice(0,256)+'&nbsp;.... &nbsp; <a class="mt-1" href="'+this.url+'">expand >> </a>';
});

// Methods
// ------------------------------


Profile.defaultColumns = 'title, updatedBy|20%, updatedAt|20%';

/**
 * Relationships
 */


//Profile.relationship({ path: 'user', ref: 'User', refPath: 'profile'});

Profile.register();

