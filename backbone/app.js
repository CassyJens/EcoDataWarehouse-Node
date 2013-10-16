$(function(){

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

	var myWg = new Wg({});
	var wgView = new WgView({model: myWg});
	wgView.render();

	var myFg = new Fg({});
	var fgView = new FgView({model: myFg});
	fgView.render();

	var myUser = new User({});
	var userView = new UserView({model: myUser});
	userView.render();

	// Create a new view and render
	// var myWg = new Wg({});
	// var wgView = new WgView({el: $('#wgs'),model: myWg});
	// wgView.render();
	// console.log("rendered");

	// Create and fetch a collection and interact with REST API
	// create, set and save(), destroy
	// var WgsCollection = Backbone.Collection.extend({
	//   model: Wg,
	//   url: '/wgs'
	// });

	// var wgCollection = new WorkingGroups();
	// wgCollection.create({ name: 'My new working group'});
	// wgCollection.fetch({ success: function(){
	// 	wgCollection.models.forEach(function(model){
	// 		model.set({name: 'New Name'});
	// 		model.save();
	// 		model.destroy();
	// 	});
	// }});

	function uploadComplete(evt) {
		/* This event is raised when the server send back a response */
		alert(evt.target.responseText);
		document.getElementById('files-to-upload').value='';
		$('#file-upload-status').show();
	}

	$('#upload-files-form').submit(function(event){
		return false;
	});

	$('#upload-files-btn').click(function() {

  		var fileInput = document.getElementById("files-to-upload");
  		var file, files = fileInput.files;
  		var workingGroup = $("#file-working-group").val();
  		var fileGroup = $("#file-file-group").val();

  		console.log('Working Group is: [' + workingGroup + "]");
  		console.log('File Group is: [' + fileGroup + "]");
  		console.log('Number of files: [' + files.length + "]");

  		for(var i = 0; i < files.length; i++){

  			file = files[i];

  			var fd = new FormData();
  			fd.append("theFile", file);
  			fd.append("theWG", workingGroup);
  			fd.append("theFG", fileGroup);

  	  		var xhr = new XMLHttpRequest();
  			xhr.addEventListener("load", uploadComplete, false);
	  		xhr.open("POST", "/files");
	  		xhr.send(fd);
  		}
	});

});