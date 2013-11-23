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
		alert("render");
		console.log("rendering fg select list");
		var selectedWG = $('select#prototypewg').val();
		var updatedCollection = this.collection.where({wgs: selectedWG});
		console.log("selectedWG: " + selectedWG);
		console.log("updatedCollection.length " + updatedCollection.length);
		var renderedContent = this.template({collection : updatedCollection});
		$(this.el).html(renderedContent);
		return this;
	}	
});