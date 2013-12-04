<<<<<<< HEAD
var app = app || {};

app.WorkingGroups = Backbone.Collection.extend({
	model: app.WorkingGroup,
=======
var WorkingGroups = Backbone.Collection.extend({
	model: Wg,
>>>>>>> 3aff4a17e672105911bdd80a91007482c18a8b8f
	url: '/wgs'
});
