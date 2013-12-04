var app = app || {};

app.WorkingGroups = Backbone.Collection.extend({
	model: app.WorkingGroup,
	url: '/wgs'
});
