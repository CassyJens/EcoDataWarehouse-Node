var app = app || {};

app.WorkingGroup = Backbone.Model.extend({	
	idAttribute: '_id',
	defaults: {
		name: 'Working Group',
		description: 'A working group.'
	}
});