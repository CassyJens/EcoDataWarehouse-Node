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

	/* Toggles visibility of data-hide twitter bootstrap alerts */
    $("[data-hide]").on("click", function(){
        $("." + $(this).attr("data-hide")).hide();
    });	

	var myWg = new Wg({});
	var wgPutView = new WgPutView({model: myWg});
	wgPutView.render();

	var myFg = new Fg({});
	var fgPutView = new FgPutView({model: myFg});
	fgPutView.render();

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
		document.getElementById('files-to-upload').value='';
		$('#file-upload-status').show();
		console.log("The ID of the saved file: [" + evt.target.responseText + "]");
		
		// PUT Working Group (has a list of FG ids)
		// PUT File Group (has a list of file ids)

	}

	$('#upload-files-form').submit(function(event){
		return false;
	});

	$('#upload-files-btn').click(function() {

  		var fileInput = document.getElementById("files-to-upload");
  		var file, files = fileInput.files;
  		var workingGroups = $('select#prototypewg').val();

  		console.log('Number of files: [' + files.length + ']');
  		console.log('Working Groups are: [' + workingGroups + ']');

  		for(var i = 0; i < files.length; i++){

  			file = files[i];

  			var fd = new FormData();
  			fd.append("theFile", file);
  			fd.append("theWGs", workingGroups);

  	  		var xhr = new XMLHttpRequest();
  			xhr.addEventListener("load", uploadComplete, false);
	  		xhr.open("POST", "/files");
	  		xhr.send(fd);
  		}
	});

});