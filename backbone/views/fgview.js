var FgView = Backbone.View.extend({
	
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
	    new FileGroups().create(formData);
	}	

});