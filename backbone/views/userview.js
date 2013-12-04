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
<<<<<<< HEAD
	    
	    e.preventDefault();
	    
	    var formData = {};
	    $('#userCreateForm').children('input').each( function(i, el) {
	        if( $(el).val() != '' ){
	            formData[el.id] = $(el).val();	            
	        }
	    });
	    
=======
	    e.preventDefault();
	    var formData = {};
	    $( '#userCreateForm' ).children( 'input' ).each( function( i, el ) {
	        if( $( el ).val() != '' ){
	            formData[ el.id ] = $( el ).val();	            
	        }
	    });
>>>>>>> 3aff4a17e672105911bdd80a91007482c18a8b8f
	    new Users().create(formData, {success: function() {
	    	var sFirst = $('#userCreateForm')[0].elements.firstname.value;
	    	var sLast = $('#userCreateForm')[0].elements.lastname.value;
	    	var sEmail = $('#userCreateForm')[0].elements.email.value;
	    	var sPW = $('#userCreateForm')[0].elements.pw.value;

		    $('#userCreateForm')[0].reset();
		    $('#userCreateSuccess p').html("<b> Success! </b> New User <b>" 
		    	+ sFirst + ' ' + sLast 
		    	+ "</b> successfully created."
		    	+ "<br /> <br />"
		    	+ "Email: " + sEmail
		    	+ "<br />"
		    	+ "Password: " + sPW);
		    $('#userCreateSuccess').show();	
		}});
	}	

});
