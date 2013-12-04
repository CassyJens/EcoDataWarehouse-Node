<<<<<<< HEAD
var app = app || {};

app.WgSelectView = Backbone.View.extend({
=======
var WgSelectView = Backbone.View.extend({
>>>>>>> 3aff4a17e672105911bdd80a91007482c18a8b8f
	
	el: '#select-working-group',

	initialize: function() {
<<<<<<< HEAD
		// this.template = _.template($('#select-wg-template').html());
		// this.collection.bind("reset", this.render, this);
		app.myWgs.fetch();
=======
		this.template = _.template($('#select-wg-template').html());
		this.collection.bind("reset", this.render, this);
>>>>>>> 3aff4a17e672105911bdd80a91007482c18a8b8f
		this.render();
	},

	render: function () {
<<<<<<< HEAD
		// var renderedContent = this.template({collection : this.collection.toJSON()});
		// $(this.el).html(renderedContent);
		this.addAll();
		return this;
	},

	addAll: function () {
		$(this.el).html('');
		app.myWgs.each(this.addOne, this);
	},

	addOne: function (wg) {
		var view = new app.WgView({ model: wg });
		$('#working-group-list').append( view.render().el );
=======
		var renderedContent = this.template({collection : this.collection.toJSON()});
		$(this.el).html(renderedContent);
		return this;
>>>>>>> 3aff4a17e672105911bdd80a91007482c18a8b8f
	}
});