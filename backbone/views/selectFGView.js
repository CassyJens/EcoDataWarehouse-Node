var FgSelectView = Backbone.View.extend({
	
	el: '#select-file-group',

	events: {
		"change .testclass" : "render"
	},

	initialize: function() {
		this.template = _.template($('#select-fg-template').html());
		this.collection.bind("reset", this.render, this);
		this.render();
	},

	render: function () {
		var selectedWG = $('select#prototypewg').val();
		var updatedCollection = this.collection.where({wgs: selectedWG});
		var renderedContent = this.template({collection : updatedCollection});
		$(this.el).html(renderedContent);
		return this;
	}	
});