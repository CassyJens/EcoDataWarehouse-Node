var WgRoloView = Backbone.View.extend({
	
	wgRoloTemplate: _.template($('#wgRolo-template').html()),

	intitialize: function() {
		this.render();
	},
	
	render: function () {
		this.$el.html( this.wgTmpl( this.model.toJSON()));
		return this;
	}

});