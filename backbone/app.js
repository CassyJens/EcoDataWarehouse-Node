var MainApp = {};

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

	MainApp.myWg = new Wg({});
	MainApp.wgPutView = new WgPutView({model: MainApp.myWg});
	MainApp.wgPutView.render();

	MainApp.myFg = new Fg({});
	MainApp.fgPutView = new FgPutView({model: MainApp.myFg});
	MainApp.fgPutView.render();

	MainApp.myUser = new User({});
	MainApp.userView = new UserView({model: MainApp.myUser});
	MainApp.userView.render();

/* END PUT FUNCTIONALITY */

/* SELECT FUNCTIONALITY */

	var mySuccessTest = function() {console.log("success setting select view");};
	var myFailTest = function() {console.log("failure setting select view");};

	MainApp.wgSelectView;
	MainApp.myWgs = new WorkingGroups({});
	var initiateWgSelectView = function() {
		console.log("length of wgs collection: [" + MainApp.myWgs.length + "]");
		MainApp.wgSelectView = new WgSelectView({collection: MainApp.myWgs, success: mySuccessTest, 
							error: myFailTest});
		MainApp.wgSelectView.render();
	
	};
	MainApp.myWgs.fetch({success : initiateWgSelectView});

	MainApp.fgSelectView;
	MainApp.myFgs = new FileGroups({});
	var initiateFgSelectView = function() {
		console.log("length of fgs collection: [" + MainApp.myFgs.length + "]");
		MainApp.fgSelectView = new FgSelectView({collection: MainApp.myFgs, success: mySuccessTest, 
							error: myFailTest});
		MainApp.fgSelectView.render();
	
	};
	MainApp.myFgs.fetch({success : initiateFgSelectView});	

/* END SELECT FUNCTIONALITY */

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

/* FILE FUNCTIONALITY */

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

/* END FILE FUNCTIONALITY */	

});