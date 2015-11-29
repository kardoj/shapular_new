SHAPULAR.resetLevel = function(name){
	console.log("reset");
	
	// Overlay to deactivate other links
	$("body").append("<div id='confirm-overlay'></div>");
	
	// Display confirmation
	$("body").append("<div id='confirmation'></div>");
	$("#confirmation").append("<div class='confirm_header'>Reset current level?</div>");
	$("#confirmation").append("<span id='confirm-accept-link'>Accept</span>");
	$("#confirmation").append("<span id='confirm-cancel-link'>Cancel</span>");
	
	// Event listeners
	$("#confirm-accept-link").on("click", function(){
		console.log("resetting current level");
		SHAPULAR.randomizeParts();
		$("#confirmation").remove();
		$("#confirm-overlay").remove();
	});
	$("#confirm-cancel-link").on("click", function(){
		console.log("reset cancelled");
		$("#confirmation").remove();
		$("#confirm-overlay").remove();
	});
}