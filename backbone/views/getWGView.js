/* 
	Represents a distinct Working Group item.
*/
var app = app || {};

app.WgView = Backbone.View.extend({
	
	tagName: 'select',
	template: _.template($("#wg-template").html()),
	intitialize: function() {
		this.render();
	},
	render: function () {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	}

});