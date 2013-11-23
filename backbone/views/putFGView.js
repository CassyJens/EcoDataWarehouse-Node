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
	    MainApp.myFgs.create(formData, {success: function() {
	    	var sName = $('#fgCreateForm')[0].elements.name.value;
		    $('#fgCreateForm')[0].reset();
		    $('#fgCreateSuccess p').html("<b> Success! </b> File Group <b>" + sName + "</b> successfully created.");
		    $('#fgCreateSuccess').show();										        
		}});
		MainApp.fgSelectView.render(); // should I do this or count on the change event??		
	}	

});