var FgPutView = Backbone.View.extend({
	
	el: '#create-file-group',

	intitialize: function() {
		this.render();
	},

	render: function () {
		return this;
	},

	events: {
	    'click #addFG':'addFG'
	},

	addFG: function( e ) {
	    e.preventDefault();
	    var formData = {};
	    $( '#fgCreateForm' ).children( 'input' ).each( function( i, el ) {
	        if( $( el ).val() != '' ){
	            formData[ el.id ] = $( el ).val();	            
	        }
	    });
	    new FileGroups().create(formData, {success: function() {
	    	var sName = $('#fgCreateForm')[0].elements.name.value;
		    $('#fgCreateForm')[0].reset();
		    $('#fgCreateSuccess p').html("<b> Success! </b> File Group <b>" + sName + "</b> successfully created.");
		    $('#fgCreateSuccess').show();										        
		}});
	}	

});