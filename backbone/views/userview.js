var UserView = Backbone.View.extend({
	
	el: '#create-user',

	intitialize: function() {
		this.render();
	},

	render: function () {
		return this;
	},

	events: {
	    'click #addUser':'addUser'
	},

	addUser: function( e ) {
	    e.preventDefault();
	    var formData = {};
	    $( '#userCreateForm' ).children( 'input' ).each( function( i, el ) {
	        if( $( el ).val() != '' ){
	            formData[ el.id ] = $( el ).val();	            
	        }
	    });
	    new Users().create(formData);
	}	

});
