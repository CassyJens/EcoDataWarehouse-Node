$(function(){
	
	// Set tab active/inactive on click
	$( ".tab" ).click(function() {
		
		var divID;
		
		$( "li.tab" ).each(function() {
			$(this).removeClass("active");
			divID = $(this).text();
			$('#' + divID).hide();
		});

		divID = $(this).text();
  		$(this).addClass("active");
  		$('#' + divID).show();
	});

	$( ".pill" ).click(function(){
		
		var divID = $(this.parentElement).attr("id");

		$( "#" + divID + " li.pill" ).each(function() {
			$(this).removeClass("active");
			divID = $(this).text();
			$('#' + divID).hide();
		});

		divID = $(this).text();
  		$(this).addClass("active");

	});

	var myWg = new Wg({});
	var wgView = new WgView({el: $('#wgs'),model: myWg});
	wgView.render();
	console.log("rendered");
});