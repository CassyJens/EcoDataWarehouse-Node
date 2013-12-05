var app = app || {};

/**
 *	Renders a dynamic collection of working groups.
 */
app.WorkingGroupListView = Backbone.View.extend({
	
	el: '#working-groups',
	
	// Add listeners, set collection, render
	initialize: function(){
		this.collection = new app.WorkingGroups();
		this.collection.fetch({reset: true});
		this.listenTo( this.collection, 'add', this.renderWorkingGroup );
		this.listenTo( this.collection, 'reset', this.render );
		this.render();
	},
	
	// Add each object to the HTML div
	render: function() {
		this.collection.each(function(item){
			this.renderWorkingGroup(item);
		}, this);
	},
	
	// Add a single object to the HTML div
	renderWorkingGroup: function(item) {
		var workingGroupView = new app.WorkingGroupView({
			model: item
		});
		this.$el.append(workingGroupView.render().el);
	},
	
	// Perform an task based on a user action
	events: {
	    'click #add-working-group':'addWorkingGroup'
	},
	
	// Update the collection when a new item is created
	addWorkingGroup: function(e) {    
	    e.preventDefault();
	    var formData = {};
	    $('#wgCreateForm div').children('input').each( function(i, el) {
	    	var value = $(el).val();
	    	var key = el.id;
	        if(value != ''){
	            formData[ key ] = value;	            
	        }
	        console.log("Creating new working group with [" + key + "] : [" + value + "]");
        	$(el).val('');
	    });

	    console.log("Form data is: " + formData);
	    this.collection.create(formData);
	}

});