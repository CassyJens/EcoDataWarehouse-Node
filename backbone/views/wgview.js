var WgView = Backbone.View.extend({
	
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
	    $( '#wgCreateForm' ).children( 'input' ).each( function( i, el ) {
	        if( $( el ).val() != '' ){
	            formData[ el.id ] = $( el ).val();	            
	        }
	    });
	    new WorkingGroups().create(formData);
	}	

});
