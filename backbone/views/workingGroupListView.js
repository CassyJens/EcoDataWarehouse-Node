var app = app || {};

/*
	Renders a dynamic collection of working groups.
*/

app.WorkingGroupListView = Backbone.View.extend({
	el: '#working-groups',
	initialize: function(){
		this.collection = new app.WorkingGroups();
		this.collection.fetch({reset: true});
		this.listenTo( this.collection, 'add', this.renderWorkingGroup );
		this.listenTo( this.collection, 'reset', this.render );
		this.render();
	},
	render: function() {
		this.collection.each(function(item){
			this.renderWorkingGroup(item);
		}, this);
	},
	renderWorkingGroup: function(item) {
		var workingGroupView = new app.WorkingGroupView({
			model: item
		});
		this.$el.append(workingGroupView.render().el);
	},
	events: {
	    'click #add-working-group':'addWorkingGroup'
	},
	addWorkingGroup: function(e) {
		alert("Adding working group.");
	    e.preventDefault();
	    var formData = {};
	    $('#wgCreateForm div').children( 'input' ).each( function( i, el ) {
	    	var value = $( el ).val();
	    	var key = el.id;
	        if( value != '' ){
	            formData[ key ] = value;	            
	        }
	        console.log("Creating new working group with [" + key + "] : [" + value + "]");
	    });
	    console.log("Form data is: " + formData);
	    this.collection.create(formData);
	}
});