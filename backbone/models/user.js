var User = Backbone.Model.extend({	
	idAttribute: '_id',
	defaults: {
		first: 'Cassy',
		last: 'Jens',
		description: 'This user is awesome',
		password: 'myPassword'
	}
});