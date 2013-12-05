var app = app || {};

/**
 * Renders a single File Group item
 */
app.FileGroupView = Backbone.View.extend({
	tagName: 'div',
	className: 'fileGroupContainer',
	template: _.template($('#fileGroupTemplate').html()),
	render : function() {
		this.$el.html( this.template( this.model.toJSON() ) );
        return this;
	} 	
});