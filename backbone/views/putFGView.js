/*
* Models a PUT form to create a 
* new file group. 
*/
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
	    formData['wg'] = $('select#prototypefg').val();	    
	    $( '#fgCreateForm' ).children( 'input' ).each( function( i, el ) {
	        if( $( el ).val() != '' ){
	        	console.log("el.id " + el.id);
	            formData[ el.id ] = $( el ).val();            
	        }
	    });
<<<<<<< HEAD
	    app.myFgs.create(formData, {success: function() {
=======
	    MainApp.myFgs.create(formData, {success: function() {
>>>>>>> 3aff4a17e672105911bdd80a91007482c18a8b8f
	    	var sName = $('#fgCreateForm')[0].elements.name.value;
		    $('#fgCreateForm')[0].reset();
		    $('#fgCreateSuccess p').html("<b> Success! </b> File Group <b>" + sName + "</b> successfully created.");
		    $('#fgCreateSuccess').show();										        
		}});
<<<<<<< HEAD
		app.fgSelectView.render(); // should I do this or count on the change event??		
=======
		MainApp.fgSelectView.render(); // should I do this or count on the change event??		
>>>>>>> 3aff4a17e672105911bdd80a91007482c18a8b8f
	}	

});