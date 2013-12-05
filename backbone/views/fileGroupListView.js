var app = app || {};

app.FileGroupListView = Backbone.View.extend({
	el: '#file-groups',
	
	// Add listeners, set collection, render
	initialize: function(){
		this.collection = new app.FileGroups();
		this.collection.fetch({reset: true});
		this.listenTo( this.collection, 'add', this.renderFileGroup );
		this.listenTo( this.collection, 'reset', this.render );
		this.render();
	},
	
	// Add each object to the HTML div
	render: function() {
		this.collection.each(function(item){
			this.renderFileGroup(item);
		}, this);
	},
	
	// Add a single object to the HTML div
	renderFileGroup: function(item) {
		var fileGroupView = new app.FileGroupView({
			model: item
		});
		this.$el.append(fileGroupView.render().el);
	},
	
	// Perform an task based on a user action
	events: {
	    'click #add-file-group':'addFileGroup'
	},
	
	// Update the collection when a new item is created
	addFileGroup: function(e) {    
	    e.preventDefault();
	    var formData = {};
	    $('#fgCreateForm div').children('input').each( function(i, el) {
	    	var value = $(el).val();
	    	var key = el.id;
	        if(value != ''){
	            formData[ key ] = value;	            
	        }
	        console.log("Creating new file group with [" + key + "] : [" + value + "]");
        	$(el).val('');
	    });

	    console.log("Form data is: " + formData);
	    this.collection.create(formData);
	}	
})