var app = app || {};

/*
	Renders a single working group item.
*/
app.WorkingGroupView = Backbone.View.extend({
	tagName : 'div',
	className : 'workingGroupContainer',
	template : _.template( $('#workingGroupTemplate').html() ),
	render : function() {
		this.$el.html( this.template( this.model.toJSON() ) );
        return this;
	} 
});