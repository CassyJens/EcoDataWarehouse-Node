var WgPutView = Backbone.View.extend({
	
	el: '#create-working-group',

	intitialize: function() {
		this.render();
	},

	render: function () {
		return this;
	},

	events: {
	    'click #addWG':'addWG'
	},

	addWG: function( e ) {
	    e.preventDefault();
	    var formData = {};
	    $('#wgCreateForm').children( 'input' ).each( function( i, el ) {
	        if( $( el ).val() != '' ){
	            formData[ el.id ] = $( el ).val();	            
	        }
	    });
	    new WorkingGroups().create(formData, {success: function() {
	    	var sName = $('#wgCreateForm')[0].elements.name.value;
		    $('#wgCreateForm')[0].reset();
		    $('#wgCreateSuccess p').html("<b> Success! </b> Working Group <b>" + sName + "</b> successfully created.");
		    $('#wgCreateSuccess').show();									        
		}});
	}	

});
