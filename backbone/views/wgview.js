var WgView = Backbone.View.extend({
	
	wgTmpl: _.template($('#wgItem-template').html()),

	intitialize: function() {
		this.render();
	},
	
	render: function () {
		this.$el.html( this.wgTmpl( this.model.toJSON()));
		return this;
	}

});