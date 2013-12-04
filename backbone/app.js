var app = app || {};

$(function(){

/* GENERAL STYLE */	

	$("input[name='file']").change(function() {
		$("#upload-options").show();
	});	

	$(".upload-option").click(function() {
		toggleVisibility(this);
	});

	/* Toggles classes collapse and expand */
	var toggleVisibility = function(div) {
		if($(div).hasClass("collapse")){
			$(div).removeClass("collapse");
			$(div).addClass("expand");
		}
		else {
			$(div).removeClass("expand");
			$(div).addClass("collapse");
		} 
	};

	/* Toggles visibility of data-hide twitter bootstrap alerts */
    $("[data-hide]").on("click", function(){
        $("." + $(this).attr("data-hide")).hide();
    });	

/* END GENERAL STYLE */

/* PUT FUNCTIONALITY */

/*	app.wgPutView = new WgPutView({model: app.WorkingGroup});
	app.wgPutView.render();

	app.myFg = new Fg({});
	app.fgPutView = new FgPutView({model: app.myFg});
	app.fgPutView.render();

	app.myUser = new User({});
	app.userView = new UserView({model: app.myUser});
	app.userView.render();
*/


/* END PUT FUNCTIONALITY */

/* SELECT FUNCTIONALITY */

	new app.WorkingGroupListView();

/* END SELECT FUNCTIONALITY */

/* FILE FUNCTIONALITY */

	// Event raised when the server sends back a response from file upload
	function uploadComplete(evt) {
		document.getElementById('files-to-upload').value='';
		$('#file-upload-status').show();
		console.log("The ID of the saved file: [" + evt.target.responseText + "]");
	}

	$('#upload-files-form').submit(function(event){
		return false;
	});

	$('#upload-files-btn').click(function() {
  		var fileInput = document.getElementById("files-to-upload");
  		var file, files = fileInput.files;
  		var fileGroup = $('select#prototypefg').val();
  		console.log('Number of files: [' + files.length + ']');
  		console.log('Working Groups are: [' + fileGroup + ']');
  		for(var i = 0; i < files.length; i++){
  			var fd = new FormData();
  			file = files[i];
  			fd.append("theFile", file);
  			fd.append("theFGs", fileGroup);
  	  		var xhr = new XMLHttpRequest();
  			xhr.addEventListener("load", uploadComplete, false);
	  		xhr.open("POST", "/files");
	  		xhr.send(fd);
  		}
	});

/* END FILE FUNCTIONALITY */

	

});