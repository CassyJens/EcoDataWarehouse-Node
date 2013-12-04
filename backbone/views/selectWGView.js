var app = app || {};

app.WgSelectView = Backbone.View.extend({
	
	el: '#select-working-group',

	initialize: function() {
		// this.template = _.template($('#select-wg-template').html());
		// this.collection.bind("reset", this.render, this);
		app.myWgs.fetch();
		this.render();
	},

	render: function () {
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
	}
});