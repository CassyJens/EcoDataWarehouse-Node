var app = app || {};

app.FileGroups = Backbone.Collection.extend({
	model: Fg,
	url: '/fgs'
});
