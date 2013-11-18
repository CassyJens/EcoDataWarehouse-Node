var FgSelectView = Backbone.View.extend({
	
	el: '#select-file-group',

	initialize: function() {
		this.template = _.template($('#select-fg-template').html());
		this.collection.bind("reset", this.render, this);
		this.render();
	},

	render: function () {
		var renderedContent = this.template({collection : this.collection.toJSON()});
		$(this.el).html(renderedContent);
		return this;
	}	
});