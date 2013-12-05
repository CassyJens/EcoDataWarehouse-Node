var app = app || {};

$(function(){

	// TODO -- Eliminate unused code and wrap in namespace

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

	// TODO put file upload and download functionality into namespace 

	// This event is raised when the server send back a response from file upload
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

	new app.WorkingGroupListView();	
	new app.FileGroupListView();
});